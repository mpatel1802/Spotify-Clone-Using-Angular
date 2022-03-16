import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit, OnDestroy {

  constructor(private route: ActivatedRoute, private data: MusicDataService) { }

  results: any = [];
  searchQuery: any = "";
  params_Subscription: Subscription | undefined;
  search_Result_Subscription: Subscription | undefined;

  ngOnInit(): void {

    this.params_Subscription = this.route.queryParams.subscribe(params => {
      this.searchQuery = params["q"];
      this.search_Result_Subscription = this.data.searchArtists(this.searchQuery).subscribe(queryData => {
        this.results = queryData.artists.items.filter((imagePropData: any) => imagePropData.images.length > 0);
      });    
    });
  }

  ngOnDestroy(): void {
    this.params_Subscription?.unsubscribe();
    this.search_Result_Subscription?.unsubscribe();
  }

}
