import { Component } from '@angular/core';
import { Subject, debounceTime } from 'rxjs';
import { MemberResponse } from 'src/app/core/models/Sales.model';
import { AdminService } from 'src/app/views/admin/services/admin.service';
import { HrService } from '../../services/hr.service';
import { Interviewee } from 'src/app/core/models/interviewee';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Employee } from 'src/app/core/models/hr';
import { ManagerInfo } from 'src/app/core/models/managerInfo';
import { ManagerService } from 'src/app/core/services/manager.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [MessageService, ConfirmationService, BrowserAnimationsModule]

})
export class HomeComponent {
  allInterviewees!: Interviewee[];
  allTeamLeaders!: Employee[];
  intervieweeId!: string;
  teamLeaderId!: string;
  Page: number = 1;
  PageSize: number = 10;
  numberOfPage: number[] = [];
  totalCount: number = 0;
  managerData!:ManagerInfo;
  displayTeamLeaderModal!: boolean;
  private searchSubject = new Subject<string>();
  constructor(private admin: AdminService, private hr: HrService,private manager: ManagerService ,private messageService: MessageService,private confirmationService:ConfirmationService) {
    this.searchSubject.pipe(debounceTime(500)).subscribe(value => {
      this.filter(value);
    });
  }
  ngOnInit(): void {
    this.getAllInterviewees();
    this.getManagerInfo();
  }
  getAllInterviewees(intervieweeName?: string): void {
    let queryURL;
    if (intervieweeName) {
      queryURL = `Page=${this.Page}&PageSize=${this.PageSize}&TeamLeaderName=${intervieweeName}`;
    }
    else {
      queryURL = `Page=${this.Page}&PageSize=${this.PageSize}`;
    }
    this.hr.getAllInterviewee(queryURL).subscribe({
      next: (response: any) => {
        this.allInterviewees = response.data.items;
        this.totalCount = Math.ceil(response.data.count);
      }
    })
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
  assignToTeamLeader() {
    const queryURL = `${this.intervieweeId}/superior/${this.teamLeaderId}`;
    this.hr.assignIntervieweeToLeader(queryURL).subscribe({
      next: () => {
        this.getAllInterviewees();
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Hr Changed successfully' });
        this.getAllInterviewees();
      },
      error: (error) => {
        console.log(error)
      }
    })
    this.displayTeamLeaderModal = false;
  }
  getManagerInfo():void
  {
    this.manager.getManagerInfo().subscribe({
      next:(response)=>{
        this.managerData = response;
      }
    })
  }
  showTeamLeaderModal(id: string) {
    this.intervieweeId = id;
    this.displayTeamLeaderModal = true;
    this.getAllTeamLeaders();
  }
  filter(event: any) {
    this.getAllInterviewees(event);
  }
  onInputChange(event: any) {
    this.searchSubject.next(event.target.value);
  }
  returnPages(pageReturn: number) {
    this.Page = pageReturn;
    this.getAllInterviewees()
  }
  nextPage() {
    this.Page = ++this.Page;
    this.getAllInterviewees();
  }

  previousPage() {
    this.Page = --this.Page;
    this.getAllInterviewees()
  }
  deleteSpecificInterviewee(interviewee: any) {
    let intervieweeName = interviewee.name;
    let intervieweeId = interviewee.id;
    let msg = `Are you sure you want to delete ${intervieweeName} ?`
    this.Confirmation(msg, intervieweeId);
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
        this.admin.deleteIntervieweeById(id).subscribe({
          next: () => { this.getAllInterviewees() }
        })
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' });
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
      }
    });
  }
}
