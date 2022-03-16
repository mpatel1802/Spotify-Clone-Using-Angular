import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit, OnDestroy {

  constructor(private snackBar: MatSnackBar, private route: ActivatedRoute, private data: MusicDataService) { }

  album: any = [];
  params_Subscription: Subscription | undefined;
  album_Subscription: Subscription | undefined;

  ngOnInit(): void {

    this.params_Subscription = this.route.params.subscribe((params: Params) => {
      let idParameter = params["id"];
      this.album_Subscription = this.data.getAlbumById(idParameter).subscribe(albumData => {
        this.album = albumData;
      });
    });
  }

  addToFavourites(trackID: any): void {
    if (this.data.addToFavourites(trackID)) {
      this.snackBar.open("Adding to Favourites...", "Done", { duration: 1500 });
    }
  }

  ngOnDestroy(): void {
    this.params_Subscription?.unsubscribe();
    this.album_Subscription?.unsubscribe();
  }

}
