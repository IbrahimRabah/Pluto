import { Component, OnInit, ViewChild } from '@angular/core';
import { SideBarService } from '../../services/side-bar.service';
import { Sidebar } from 'primeng/sidebar';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent implements OnInit {
  isSidebarVisible: boolean = true;

  constructor(private sidebarService: SideBarService) { }

  ngOnInit(): void {
    this.sidebarService.isSidebarVisible$.subscribe(isVisible => {
      this.isSidebarVisible = isVisible;
    });
  }
@ViewChild('sidebarRef') sidebarRef!: Sidebar;

closeCallback(e:any): void {
    this.sidebarRef.close(e);
}

}