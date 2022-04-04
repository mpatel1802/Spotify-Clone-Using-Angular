import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
  
export class GuardAuthService implements CanActivate {

  constructor(private authS: AuthService, private router: Router) { }

  canActivate(): boolean {

    if (!this.authS.isAuthenticated()) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
