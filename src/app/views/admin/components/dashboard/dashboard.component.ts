import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/authentication/services/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent{
  isCollapsed = false;
  showItem: boolean = false;
  items = [
    { name: 'Admin', num: 54, icon: 'fa-solid fa-comments' },
    { name: 'Manger', num: 2500, icon: 'fa-solid fa-user-tie' },
    { name: 'Team Leaders', num: 123.5, icon: 'fa-solid fa-user-group' },
    { name: 'Sellers', num: 1805, icon: 'fa-solid fa-users' },
    { name: 'Hr', num: 54, icon: 'fa-regular fa-user' },
    { name: 'Clients', num: 54, icon: 'fa-solid fa-people-group' },
    { name: 'Retention', num: 54, icon: 'fa-solid fa-person-rays' },
    { name: 'Interviewee', num: 54, icon: 'fa-solid fa-user-tie' }
  ];
  constructor(private router:Router, private auth:AuthenticationService){}
  toggleSidebar () {
    this.isCollapsed = !this.isCollapsed
    this.showItem = !this.showItem
  }
  logout(){
    this.auth.logout();
    this.router.navigate(['/auth/login']);
  }
}
