import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { SpotifyTokenService } from './spotify-token.service';

import { mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MusicDataService {

  constructor(private spotifyToken: SpotifyTokenService, private http: HttpClient) { }

  favouritesList: Array<any> = [];

  getNewReleases(): Observable<SpotifyApi.ListOfNewReleasesResponse> {
    return this.spotifyToken.getBearerToken().pipe(mergeMap(token => {
      return this.http.get<SpotifyApi.ListOfNewReleasesResponse>("https://api.spotify.com/v1/browse/new-releases",
        { headers: { "Authorization": `Bearer ${token}` } });
    }));
  }

  getArtistById(id: number): Observable<SpotifyApi.ArtistsAlbumsResponse> {
    return this.spotifyToken.getBearerToken().pipe(mergeMap(token => {
      return this.http.get<SpotifyApi.ArtistsAlbumsResponse>(`https://api.spotify.com/v1/artists/${id}`,
        { headers: { "Authorization": `Bearer ${token}` } });
    }));
  }

  getAlbumsByArtistId(id: number): Observable<SpotifyApi.ArtistsAlbumsResponse> {
    let includeGroups = "album,single";
    return this.spotifyToken.getBearerToken().pipe(mergeMap(token => {
      return this.http.get<SpotifyApi.ArtistsAlbumsResponse>(`https://api.spotify.com/v1/artists/${id}/albums?include_groups=${includeGroups}&limit=50`,
        { headers: { "Authorization": `Bearer ${token}` } });
    }));
  }

  getAlbumById(id: number): Observable<SpotifyApi.SingleAlbumResponse> {
    return this.spotifyToken.getBearerToken().pipe(mergeMap(token => {
      return this.http.get<SpotifyApi.SingleAlbumResponse>(`https://api.spotify.com/v1/albums/${id}`,
        { headers: { "Authorization": `Bearer ${token}` } });
    }));
  }

  searchArtists(searchString: string): Observable<SpotifyApi.ArtistSearchResponse> {
    return this.spotifyToken.getBearerToken().pipe(mergeMap(token => {
      return this.http.get<SpotifyApi.ArtistSearchResponse>(`https://api.spotify.com/v1/search?q=${searchString}&type=artist&limit=50`,
        { headers: { "Authorization": `Bearer ${token}` } });
    }));
  }

  addToFavourites(id: number): boolean {

    let success = false;
    if (id === null || id === undefined || this.favouritesList.length >= 50 || this.favouritesList.includes(id)) {
      success = false;
    } else {
      this.favouritesList.push(id);
      success = true;
    }
    return success;
  }

  removeFromFavourites(id: number): Observable<any> {
    this.favouritesList.splice(this.favouritesList.indexOf(id), 1);
    return this.getFavourites();
  }

  getFavourites(): Observable<any> {
    if (this.favouritesList.length > 0) {
      return this.spotifyToken.getBearerToken().pipe(mergeMap(token => {
        return this.http.get<any>(`https://api.spotify.com/v1/tracks?ids=${this.favouritesList.join(",")}`,
          { headers: { "Authorization": `Bearer ${token}` } });
      }));
    } else {
      return new Observable(o => { o.next([]) });
    }
  }

}