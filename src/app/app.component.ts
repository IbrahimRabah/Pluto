import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthenticationService } from './core/authentication/services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'dashboard';
  isLogin!: boolean;
  constructor(private authenticationService: AuthenticationService) { }
  ngOnInit(): void {
    const userToken = this.authenticationService.getToken();
    const isExpired = this.authenticationService.isTokenExpired(userToken);
    // this.authenticationService.isAuthenticatedUser();
    if (!isExpired){
       this.authenticationService.isAuthenticatedUser();
       this.authenticationService.isAuthenticated$.subscribe({
        next: (response) => { this.isLogin = response;},
      })
    }
    else
    {
      localStorage.clear();
      this.isLogin = false;
    }
  }
  ngOnDestroy(): void {
    this.authenticationService.logout();
  }
}
