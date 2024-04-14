import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/authentication/services/authentication.service';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent implements OnInit{
  isCollapsed = false;
  showItem: boolean = false;
  userRole:string='';
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
  ngOnInit(): void {
  this.getUserRole()
  }
  toggleSidebar () {
    this.isCollapsed = !this.isCollapsed
    this.showItem = !this.showItem
  }
  logout(){
    this.auth.logout();
    this.router.navigate(['/auth/login']);
  }
  getUserRole(){
    this.userRole= this.auth.getUserRole()
  }
}
