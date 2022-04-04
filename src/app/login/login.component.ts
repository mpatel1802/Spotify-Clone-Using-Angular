import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import User from '../User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authS: AuthService, private router: Router) { }

  user: User = { userName: "", password: "", _id: "" };
  warning: string = "";
  loading: boolean = false;

  ngOnInit(): void {
  }

  onSubmit(f: NgForm): void {
    if (this.user.password != "" && this.user.userName != "") {
      this.loading = true;
      this.authS.login(this.user).subscribe({
        next: (info) => {
          this.loading = false;
          localStorage.setItem('access_token', info.token);
          this.router.navigate(['/newReleases']);
        },
        error: (err) => {
          this.loading = false;
          this.warning = err.error.message;
        }
      })
    }
  }
}
