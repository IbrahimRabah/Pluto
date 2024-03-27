import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/authentication/services/authentication.service';
import { SideBarService } from '../../services/side-bar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  isLogedIn: any;
  isAdmin: any;
  productsQuantity: any;
  constructor(private auth:AuthenticationService, private sidebarService: SideBarService){}
  ngOnInit(): void {
    this.auth.isAuthenticatedUser();
    this.auth.isAuthenticated$.subscribe((res)=>{
      this.isLogedIn = res;
    })
  }
  logout(){
    this.auth.logout()
  }
  
  onIconClick() {
    this.sidebarService.toggleSidebar();
}

}
