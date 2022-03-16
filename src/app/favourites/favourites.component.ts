import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit, OnDestroy {

  constructor(private data: MusicDataService) { }

  favourites: Array<any> = [];
  favourites_Subscription: Subscription | undefined;
  remove_Fav_Subscription: Subscription | undefined;

  ngOnInit(): void {
    this.favourites_Subscription = this.data.getFavourites().subscribe(tracksData => {
      this.favourites = tracksData.tracks;
    });
  }

  removeFromFavourites(id: any) {
    this.remove_Fav_Subscription = this.data.removeFromFavourites(id).subscribe(tracksData => {
      this.favourites = tracksData.tracks;
    });
  }
  
  ngOnDestroy(): void {
    this.favourites_Subscription?.unsubscribe();
    this.remove_Fav_Subscription?.unsubscribe();
  }

}
