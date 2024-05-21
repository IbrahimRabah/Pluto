import { Component } from '@angular/core';
import { MemberResponse } from 'src/app/core/models/Sales.model';
import { AdminService } from '../../services/admin.service';
import { Subject, debounceTime } from 'rxjs';
import { Employee } from 'src/app/core/models/hr';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToggleButtonChangeEvent } from 'primeng/togglebutton';
import { AuthenticationService } from 'src/app/core/authentication/services/authentication.service';
import { HrService } from 'src/app/views/hr/services/hr.service';
import { ManagerInfo } from 'src/app/core/models/managerInfo';
import { ManagerService } from 'src/app/core/services/manager.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-interviee-section',
  templateUrl: './interviee-section.component.html',
  styleUrls: ['./interviee-section.component.scss'],
  providers: [MessageService, ConfirmationService, BrowserAnimationsModule]

})
export class IntervieeSectionComponent {
  allTeamLeaders: any;
  displayTeamLeaderModal!: boolean;
  teamLeaderId: any;
  toggleInterviewees(event: ToggleButtonChangeEvent) {
    if (event.checked) {
      this.getAllManagerInterviewees()
    } else {
      this.getAllInterviewees();
    }
  }
  getSalesById(arg0: any) {
    throw new Error('Method not implemented.');
  }
  allInterviewees!: MemberResponse[];
  managerData!: ManagerInfo;
  Page: number = 1;
  PageSize: number = 10;
  numberOfPage: number[] = [];
  totalCount: number = 0;
  displayHrModal!: boolean;
  allHrs!: Employee[];
  intervieweeId!: string;
  hrId!: string;
  userId!: string;
  private searchSubject = new Subject<string>();
  constructor(private hr: HrService, private admin: AdminService, private messageService: MessageService, private auth: AuthenticationService , private manager:ManagerService,private confirmationService: ConfirmationService) {
    this.searchSubject.pipe(debounceTime(500)).subscribe(value => {
      this.filter(value);
    });
  }
  ngOnInit(): void {
    this.getAllInterviewees();
    this.getUserId();
    this.getManagerInfo()
  }
  getAllInterviewees(intervieweeName?: string): void {
    let queryURL;
    if (intervieweeName) {
      queryURL = `Page=${this.Page}&PageSize=${this.PageSize}&Name=${intervieweeName}`;
    }
    else {
      queryURL = `Page=${this.Page}&PageSize=${this.PageSize}`;
    }
    this.admin.getAllInterviewees(queryURL).subscribe({
      next: (response: any) => {
        this.allInterviewees = response.data.items;
        this.totalCount = Math.ceil(response.data.count);
      }
    })
  }
  getAllHrs(HrName?: string): void {
    let queryURL;
    if (HrName) {
      queryURL = `Page=${this.Page}&PageSize=${this.PageSize}&Name=${HrName}`;
    }
    else {
      queryURL = `Page=${this.Page}&PageSize=${this.PageSize}`;
    }
    this.admin.getAllHrs(queryURL).subscribe({
      next: (response: any) => {
        this.allHrs = response.data.items;
        this.totalCount = Math.ceil(response.data.count);
      },
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
  showHrModal(id: string) {
    this.intervieweeId = id;
    this.displayHrModal = true;
    this.getAllHrs();
  }
  getUserId() {
    this.userId = this.auth.getUserId();
  }
  changeHr() {
    const queryURL = `${this.intervieweeId}/Hr/${this.hrId}`;
    this.admin.changeIntervieweeHr(queryURL).subscribe({
      next: () => {
        this.getAllInterviewees();
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Hr Changed successfully' });
      }
    })
    this.displayHrModal = false;
  }
  getAllManagerInterviewees() {
    const queryURL = `Page=${this.Page}&PageSize=${this.PageSize}&SuperiorId=${this.userId}`;
    this.admin.getAllInterviewees(queryURL).subscribe({
      next: (response: any) => {
        this.allInterviewees = response.data.items;
        this.totalCount = Math.ceil(response.data.count);
      }
    })
  }

  showTeamLeaderModal(id: string) {
    this.intervieweeId = id;
    this.displayTeamLeaderModal = true;
    this.getAllTeamLeaders();
  }

  assignToTeamLeader() {
    const queryURL = `${this.intervieweeId}/superior/${this.teamLeaderId}`;
    this.hr.assignIntervieweeToLeader(queryURL).subscribe({
      next: () => {
        this.getAllInterviewees();
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Hr Changed successfully' });
        this.getAllInterviewees();
      }
    })
    this.displayTeamLeaderModal = false;
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
