import { Component } from '@angular/core';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { AdminService } from '../../services/admin.service';
import { MemberResponse } from 'src/app/core/models/Sales.model';
import { Subject, debounceTime } from 'rxjs';
import { ToggleButtonChangeEvent } from 'primeng/togglebutton';
import { AuthenticationService } from 'src/app/core/authentication/services/authentication.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ManagerInfo } from 'src/app/core/models/managerInfo';
import { ManagerService } from 'src/app/core/services/manager.service';

@Component({
  selector: 'app-sales-section-details',
  templateUrl: './sales-section-details.component.html',
  styleUrls: ['./sales-section-details.component.scss'],
  providers: [MessageService, ConfirmationService, BrowserAnimationsModule]

})
export class SalesSectionDetailsComponent {
  getSalesById(arg0: any) {
    throw new Error('Method not implemented.');
  }
  allSellers!: MemberResponse[];
  managerData!: ManagerInfo;
  managerId: string = '';
  sellerId:string = '';
  Page: number = 1;
  PageSize: number = 10;
  numberOfPage: number[] = [];
  allTeamLeaders!: any[];
  totalCount: number = 0;
  newTeamleaderId!:string;
  displayTeamLeaderModal!: boolean;
  private searchSubject = new Subject<string>();
  constructor(private admin: AdminService,private manager:ManagerService, private auth: AuthenticationService,private confirmationService: ConfirmationService, private messageService: MessageService) {
    this.searchSubject.pipe(debounceTime(500)).subscribe(value => {
      this.filter(value);
    });
  }
  ngOnInit(): void {
    this.getAllSellers();
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
  getAllSellers(SalesName?: string): void {
    let queryURL = `Page=${this.Page}&PageSize=${this.PageSize}`;
    if (SalesName) {
      queryURL += `&SalesName=${SalesName}`;
    }
    if (this.managerId !== undefined && this.managerId !== '') {
      queryURL += `&TeamLeaderId=${this.managerId}`;
    }
    this.admin.getAllSellers(queryURL).subscribe({
      next: (response: any) => {
        this.allSellers = response.data.items;
        this.totalCount = Math.ceil(response.data.count);
      }
    })
  }
  filter(event: any) {
    this.getAllSellers(event);
  }
  onInputChange(event: any) {
    this.searchSubject.next(event.target.value);
  }
  returnPages(pageReturn: number) {
    this.Page = pageReturn;
    this.getAllSellers()
  }
  nextPage() {
    this.Page = ++this.Page;
    this.getAllSellers();
  }

  previousPage() {
    this.Page = --this.Page;
    this.getAllSellers()
  }
  toggleInterviewees(event: ToggleButtonChangeEvent) {
    if (event.checked) {
      this.getUserId();
    } else {
      this.managerId = '';
    }
    this.getAllSellers();
  }
  getUserId() {
    this.managerId = this.auth.getUserId();
  }
  deleteSpecificSeller(seller:any)
  {
    let sellerName = seller.name;
    let sellerId = seller.id;
    let msg = `Are you sure you want to delete ${sellerName} ?`;
    let header = 'Delete Confirmation'
    let action = 'delete'
    this.Confirmation(header,msg,sellerId,action);
  }
  showTeamLeaderModal(id: string) {
    this.sellerId = id;
    this.displayTeamLeaderModal = true;
    this.getAllTeamLeaders();
  }
  assignToTeamLeader() {
    let msg = "Are you sure you want to change the seller's teamleader ?"
    let sellerId = this.sellerId;
    let role = 'leader';
    let header = "Change Leader Confirmation"
    let action = 'changeLeader'
    this.Confirmation(header,msg,sellerId,action);
    this.displayTeamLeaderModal = false;
  }
  getAllTeamLeaders(): void {
    let queryURL = `Page=${this.Page}&PageSize=${this.PageSize}`;
    this.admin.getAllTeamLeaders(queryURL).subscribe({
      next: (response: any) => {
        this.allTeamLeaders = response.data.items;
      }
    })
  }
  Confirmation(header:string,msg: any,id:string,action:string) {
    this.confirmationService.confirm({
      message: msg,
      header: header,
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: "p-button-danger p-button-text",
      rejectButtonStyleClass: "p-button-text p-button-text",
      acceptIcon: "none",
      rejectIcon: "none",
      accept: () => {
        switch(action)
        {
          case 'delete':
            this.admin.deleteSellerById(id).subscribe({
            next:()=>{this.getAllSellers()}
           })
          break;
          case 'changeLeader':
            this.admin.changeSellerTeamleader(this.sellerId,this.newTeamleaderId).subscribe({
              next:()=>{this.getAllSellers();}
            })
           break;
        }

        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Done.' });
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
      }
    });
  }
}
