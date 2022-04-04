/********************************************************************************* 
* WEB422 – Assignment 06 
* I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part of this 
* assignment has been copied manually or electronically from any other source (including web sites) or 
* distributed to other students. 
*
* Name: MANN PATEL Student ID: 134633205 Date: 04/04/2022 
* 
* Vercel Deployment Link: https://spotify-clone-using-angular.vercel.app/
* Netlify Deployment Link: https://spotify-assignment.netlify.app/
********************************************************************************/

import { Component, OnInit } from '@angular/core';
import { Event, NavigationStart, Router } from '@angular/router';
import { AuthService } from './auth.service';
import User from './User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private router: Router, private authS: AuthService) { };
  title = 'web422-a6';
  searchString: string = "";
  token: any;

  ngOnInit(): void {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.token = this.authS.readToken();
      }
    });
  }

  handleSearch() : void {
    this.router.navigate(['/search'], { queryParams: { q: this.searchString } });
    this.searchString = "";
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
