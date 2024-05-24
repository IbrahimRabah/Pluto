import { Component } from '@angular/core';
import { MemberResponse } from 'src/app/core/models/Sales.model';
import { AdminService } from '../../services/admin.service';
import { Subject, debounceTime } from 'rxjs';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ManagerInfo } from 'src/app/core/models/managerInfo';
import { ManagerService } from 'src/app/core/services/manager.service';

@Component({
  selector: 'app-clients-section-details',
  templateUrl: './clients-section-details.component.html',
  styleUrls: ['./clients-section-details.component.scss'],
  providers: [MessageService, ConfirmationService, BrowserAnimationsModule]

})
export class ClientsSectionDetailsComponent {
  getSalesById(arg0: any) {
    throw new Error('Method not implemented.');
  }
  allClients!: MemberResponse[];
  allRetentions!: any[];
  allTeamLeaders!: any[];
  managerData!: ManagerInfo;
  retentionInfo!:any;
  newTeamleaderId!:string;
  newRetentionId!:string;
  Page: number = 1;
  PageSize: number = 10;
  numberOfPage: number[] = [];
  totalCount: number = 0;
  clientId!: string;
  preventMoving:boolean = false;
  preventMovingMsg:string = '';

  displayTeamLeaderModal!: boolean;
  displayRetentionModal!: boolean;
  private searchSubject = new Subject<string>();
  constructor(private admin: AdminService, private confirmationService: ConfirmationService, private messageService: MessageService,private manager:ManagerService) {
    this.searchSubject.pipe(debounceTime(500)).subscribe(value => {
      this.filter(value);
    });
  }
  ngOnInit(): void {
    this.getAllClients();
    this.getManagerInfo()
  }
  getAllClients(clientName?: string): void {
    let queryURL;
    if (clientName) {
      queryURL = `Page=${this.Page}&PageSize=${this.PageSize}&ClientName=${clientName}`;

    } else {
      queryURL = `Page=${this.Page}&PageSize=${this.PageSize}`;
    }
    this.admin.getAllClients(queryURL).subscribe({
      next: (response: any) => {
        this.allClients = response.data.items;
        this.totalCount = Math.ceil(response.data.count);
      }
    })
  }
  filter(event: any) {
    this.getAllClients(event);
  }
  onInputChange(event: any) {
    this.searchSubject.next(event.target.value);
  }
  returnPages(pageReturn: number) {
    this.Page = pageReturn;
    this.getAllClients()
  }
  nextPage() {
    this.Page = ++this.Page;
    this.getAllClients();
  }

  previousPage() {
    this.Page = --this.Page;
    this.getAllClients();
  }
  deleteSpecificClient(client: any) {
    let clientName = client.name;
    let clientId = client.id;
    let msg = `Are you sure you want to delete ${clientName} ?`
    this.Confirmation(msg, clientId);
  }
  Confirmation(msg: any, id: string) {
    this.confirmationService.confirm({
      message: msg,
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: "p-button-danger p-button-text",
      rejectButtonStyleClass: "p-button-text p-button-text",
      acceptIcon: "none",
      rejectIcon: "none",
      accept: () => {
        this.admin.deleteClientById(id).subscribe({
          next: () => { this.getAllClients() }
        })
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' });
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
      }
    });
  }
  moveConfirmation(msg: any, id: string,role:string) {
    this.confirmationService.confirm({
      message: msg,
      header: 'Move Confirmation',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: "p-button-danger p-button-text",
      rejectButtonStyleClass: "p-button-text p-button-text",
      acceptIcon: "none",
      rejectIcon: "none",
      accept: () => {
        switch(role)
        {
          case 'leader':
            this.admin.changeClientTeamleader(id,this.newTeamleaderId).subscribe({
              next: () => {
                this.messageService.add({ severity: 'success', summary: 'Success', detail: 'TeamLeader Changed successfully' });
                this.getAllClients();
              }
            })
            break;
          case 'retention':
            this.admin.changeClientRetention(this.clientId,this.newRetentionId).subscribe({
              next: () => {
                this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Retention Changed successfully' });
                this.getAllClients();
              }
            })
          break;
        }
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record Changed' });
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
      }
    });
  }
  getAllTeamLeaders(): void {
    let queryURL = `Page=${this.Page}&PageSize=${this.PageSize}`;
    this.admin.getAllTeamLeaders(queryURL).subscribe({
      next: (response: any) => {
        this.allTeamLeaders = response.data.items;
      }
    })
  }
  getManagerInfo():void
  {
    this.manager.getManagerInfo().subscribe({
      next:(response)=>{
        this.managerData = response;
      }
    })
  }
  getAllRetentions(): void {
    let queryURL = `Page=${this.Page}&PageSize=${this.PageSize}`;
    this.admin.getAllRetentions(queryURL).subscribe({
      next: (response: any) => {
        this.allRetentions = response.data.items;
      }
    })
  }
  showTeamLeaderModal(id: string) {
    this.clientId = id;
    this.displayTeamLeaderModal = true;
    this.getAllTeamLeaders();
  }
  showRetentionModal(retention: any) {
    this.retentionInfo = retention;
    this.clientId = retention.id;
    this.displayRetentionModal = true;
    this.getAllRetentions();
  }
  assignToTeamLeader() {
    let msg = "Are you sure you want to change the client's teamleader ?"
    let clientId = this.clientId;
    let role = 'leader';
    this.moveConfirmation(msg,clientId,role);
    this.displayTeamLeaderModal = false;
  }
  assignToRetention() {
  if(this.retentionInfo.status == 0)
    {
      let msg = "Are you sure you want to change the client's Retention ?"
      let clientId = this.clientId;
      let role = 'retention';
      this.moveConfirmation(msg,clientId,role);
      this.displayRetentionModal = false;
    }
    else
    {
      this.displayRetentionModal = false;
      let msg = `An inactive customer cannot be assigned to a sales manager"`;
      this.preventMovingMsg = msg;
      this.preventMoving = true;
    }
  }
}
