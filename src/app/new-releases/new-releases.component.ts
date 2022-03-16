import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-new-releases',
  templateUrl: './new-releases.component.html',
  styleUrls: ['./new-releases.component.css']
})
export class NewReleasesComponent implements OnInit, OnDestroy {

  releases: Array<any> = [];
  new_Releases_Subcription: Subscription | undefined;

  constructor(private data: MusicDataService) { }

  ngOnInit(): void {
    this.new_Releases_Subcription = this.data.getNewReleases().subscribe(newSongs => this.releases = newSongs.albums.items)
  }

  ngOnDestroy(): void {
    this.new_Releases_Subcription?.unsubscribe();
  }
}
