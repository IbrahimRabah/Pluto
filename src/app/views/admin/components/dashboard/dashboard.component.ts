import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/authentication/services/authentication.service';
import { AdminService } from '../../services/admin.service';
import { statisticsResponse } from 'src/app/core/models/statistics';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  isCollapsed = false;
  statistics!: statisticsResponse;
  showItem: boolean = false;
  items!: any[];
  constructor(private router: Router, private auth: AuthenticationService, private admin: AdminService) { }
  ngOnInit(): void {
    this.getAdminStatistics();
  }
  initializeItems() {
    this.items = [
      { name: 'Admin', num: 1, icon: 'fa-solid fa-user-gear' },
      { name: 'Manger', num: 1, icon: 'fa-solid fa-user-tie' },
      { name: 'Team Leaders', num: this.statistics.data.totalTeamLeaders, icon: 'fa-solid fa-user-group' },
      { name: 'Sellers', num: this.statistics.data.totalSalesMen, icon: 'fa-solid fa-users' },
      { name: 'Hr', num: this.statistics.data.totalHRs, icon: 'fa-regular fa-user' },
      { name: 'Clients', num: this.statistics.data.totalClients, icon: 'fa-solid fa-people-group' },
      { name: 'Retention', num: this.statistics.data.totalRetentions, icon: 'fa-solid fa-person-rays' },
      { name: 'Interviewee', num: this.statistics.data.totalInterviewees, icon: 'fa-solid fa-user-tie' }
    ];
  }
  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed
    this.showItem = !this.showItem
  }
  logout() {
    this.auth.logout();
    this.router.navigate(['/auth/login']);
  }
  getAdminStatistics(): void {
    this.admin.getAdminStatistics().subscribe({
      next: (response) => {
        this.statistics = response;
        this.initializeItems()

      }
    })
  }
}
