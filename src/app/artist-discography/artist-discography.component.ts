import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-artist-discography',
  templateUrl: './artist-discography.component.html',
  styleUrls: ['./artist-discography.component.css']
})
export class ArtistDiscographyComponent implements OnInit, OnDestroy {

  constructor(private data: MusicDataService, private route: ActivatedRoute) { }

  albums: any = [];
  artist: any = [];
  artist_Discography_Subscription: Subscription | undefined;
  params_Subscription: Subscription | undefined;
  albums_Subscription: Subscription | undefined;

  ngOnInit(): void {

    this.params_Subscription = this.route.params.subscribe((params: Params) => {
      let idParameter = params["id"];

      this.artist_Discography_Subscription = this.data.getArtistById(idParameter).subscribe((artistData: any) => {
        this.artist = artistData;
      });
      this.albums_Subscription = this.data.getAlbumsByArtistId(idParameter).subscribe((albumData: any) => {
        this.albums = albumData.items.filter((curValue: any, index: any, self: any) => self.findIndex((t: any) => t.name.toUpperCase() === curValue.name.toUpperCase()) === index);
      });

    });
  }

  ngOnDestroy(): void {
    this.params_Subscription?.unsubscribe();
    this.artist_Discography_Subscription?.unsubscribe();
    this.albums_Subscription?.unsubscribe();
  }
}
