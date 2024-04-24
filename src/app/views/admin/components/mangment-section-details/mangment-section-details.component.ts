import { Component, OnInit } from '@angular/core';
import { ManagerInfo } from 'src/app/core/models/managerInfo';
import { ManagerService } from 'src/app/core/services/manager.service';

@Component({
  selector: 'app-mangment-section-details',
  templateUrl: './mangment-section-details.component.html',
  styleUrls: ['./mangment-section-details.component.scss']
})
export class MangmentSectionDetailsComponent implements OnInit{
  managerData!:ManagerInfo;
  constructor(private manager:ManagerService){}
  ngOnInit(): void {
    this.getManagerInfo();
  }
  getManagerInfo():void
  {
    this.manager.getManagerInfo().subscribe({
      next:(response)=>{
        this.managerData = response;
      }
    })
  }
}
