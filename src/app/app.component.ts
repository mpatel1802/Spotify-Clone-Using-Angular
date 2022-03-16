/********************************************************************************* 
* WEB422 – Assignment 05 
* I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part of this 
* assignment has been copied manually or electronically from any other source (including web sites) or 
* distributed to other students. 
*
* Name: MANN PATEL Student ID: 134633205 Date: 15/03/2022 
* 
* Vercel Deployment Link: https://spotify-clone-using-angular.vercel.app/newReleases
********************************************************************************/

import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private router: Router) { };
  title = 'web422-a5';
  searchString: string = "";

  handleSearch() : void {
    this.router.navigate(['/search'], { queryParams: { q: this.searchString } });
    this.searchString = "";
  }
}
