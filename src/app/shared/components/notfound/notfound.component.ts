import { Component } from '@angular/core'

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.scss']
})
export class NotfoundComponent {
  isCollapsed = false
  showItem: boolean = false
  items = [
    { name: 'Admin', num: 54, icon: 'fa-solid fa-comments' },
    { name: 'Manger', num: 2500, icon: 'fa-solid fa-user-tie' },
    { name: 'Team Leaders', num: 123.5, icon: 'fa-solid fa-user-group' },
    { name: 'Sellers', num: 1805, icon: 'fa-solid fa-users' },
    { name: 'Hr', num: 54, icon: 'fa-regular fa-user' },
    { name: 'Clients', num: 54, icon: 'fa-solid fa-people-group' },
    { name: 'Retention', num: 54, icon: 'fa-solid fa-person-rays' },
    { name: 'Interviewee', num: 54, icon: 'fa-solid fa-user-tie' }
  ]
  toggleSidebar () {
    this.isCollapsed = !this.isCollapsed
    this.showItem = !this.showItem
  }
}
