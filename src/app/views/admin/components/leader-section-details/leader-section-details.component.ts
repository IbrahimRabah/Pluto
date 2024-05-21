import { Component, ElementRef, ViewChild } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { MemberResponse } from 'src/app/core/models/Sales.model';
import { Subject, debounceTime } from 'rxjs';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-leader-section-details',
  templateUrl: './leader-section-details.component.html',
  styleUrls: ['./leader-section-details.component.scss'],
  providers: [MessageService, ConfirmationService, BrowserAnimationsModule]
})
export class LeaderSectionDetailsComponent {
  allTeamLeadersSellers!: MemberResponse[];
  allTeamLeadersInterviewees!: MemberResponse[];
  allTeamLeaders!: MemberResponse[];
  teamLeaderId!: string;
  Page: number = 1;
  PageSize: number = 10;
  numberOfPage: number[] = [];
  totalCount: number = 0;
  preventDelete:boolean = false;
  preventDeleteMsg:string = '';
  private searchSubject = new Subject<string>();
  constructor(private admin: AdminService, private confirmationService: ConfirmationService, private messageService: MessageService) {
    this.searchSubject.pipe(debounceTime(500)).subscribe(value => {
      this.filter(value);
    });
  }
  ngOnInit(): void {
    this.getAllTeamLeaders();
  }
  getAllTeamLeaders(TeamLeaderName?: string): void {
    let queryURL;
    if (TeamLeaderName) {
      queryURL = `Page=${this.Page}&PageSize=${this.PageSize}&TeamLeaderName=${TeamLeaderName}`;
    }
    else {
      queryURL = `Page=${this.Page}&PageSize=${this.PageSize}`;
    }
    this.admin.getAllTeamLeaders(queryURL).subscribe({
      next: (response: any) => {
        this.allTeamLeaders = response.data.items;
        this.totalCount = Math.ceil(response.data.count);
      }
    })
  }
  filter(event: any) {
    this.getAllTeamLeaders(event);
  }
  onInputChange(event: any) {
    this.searchSubject.next(event.target.value);
  }
  returnPages(pageReturn: number) {
    this.Page = pageReturn;
    this.getAllTeamLeaders()
  }
  nextPage() {
    this.Page = ++this.Page;
    this.getAllTeamLeaders();
  }

  previousPage() {
    this.Page = --this.Page;
    this.getAllTeamLeaders()
  }
  getSalesById(id: string) {
    this.teamLeaderId = id;
    this.getAllTeamLeadersSellers();
  }
  getIntervieweesByLeaderId(id: string) {
    this.teamLeaderId = id;
    this.getAllTeamLeadersInterviewees();
  }
  getAllTeamLeadersSellers() {
    const queryURL = `Page=${this.Page}&PageSize=${this.PageSize}&TeamLeaderId=${this.teamLeaderId}`;
    this.admin.getAllSellers(queryURL).subscribe({
      next: (response: any) => {
        this.allTeamLeadersSellers = response.data.items;
        this.totalCount = Math.ceil(response.data.count);
      }
    })
  }
  getAllTeamLeadersInterviewees() {
    const queryURL = `Page=${this.Page}&PageSize=${this.PageSize}&SuperiorId=${this.teamLeaderId}`;
    this.admin.getAllInterviewees(queryURL).subscribe({
      next: (response: any) => {
        this.allTeamLeadersInterviewees = response.data.items;
        this.totalCount = Math.ceil(response.data.count);
      }
    })
  }
  deleteLeader(leader:any)
  {
    let numberOfClients = leader.numberOfClients;
    let numberOfSales= leader.numberOfSales;
    let msg;
    if(numberOfClients > 0 || numberOfSales > 0)
      {
         msg = `This Leader contains ${numberOfClients}  Clients and ${numberOfSales} Sellers . If you want to delete ${leader.name}, pls delete or move them first.`;
         this.preventDeleteMsg = msg;
         this.preventDelete = true;
      }
    else
      {
         msg = `Are You Sure you Want to delete ${leader.name}?`;
         this.Confirmation(msg,leader.id,'leader');
      }
  }
  deleteSpecificSeller(seller:any)
  {
    let sellerName = seller.name;
    let sellerId = seller.id;
    let msg = `Are you sure you want to delete ${sellerName} ?`
    this.Confirmation(msg,sellerId,'seller');
  }
  deleteSpecificInterviewee(interviewee:any)
  {
    let intervieweeName = interviewee.name;
    let intervieweeId = interviewee.id;
    let msg = `Are you sure you want to delete ${intervieweeName} ?`
    this.Confirmation(msg,intervieweeId,'interviewee');
  }
  Confirmation(msg: any,id:string,Role:string) {
    this.confirmationService.confirm({
      message: msg,
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: "p-button-danger p-button-text",
      rejectButtonStyleClass: "p-button-text p-button-text",
      acceptIcon: "none",
      rejectIcon: "none",
      accept: () => {
        switch(Role)
        {
          case 'leader':
            this.admin.deleteTeamLeader(id).subscribe({
              next: () => {this.getAllTeamLeaders()}
            })
            break;
           case 'seller':
            this.admin.deleteSellerById(id).subscribe({
              next:()=>{this.getAllTeamLeadersSellers()}
            })
            break;
            case 'interviewee':
              this.admin.deleteIntervieweeById(id).subscribe({
                next:()=>{this.getAllTeamLeadersInterviewees()}
              })
              break;
        }
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' });
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
      }
    });
  }

}
