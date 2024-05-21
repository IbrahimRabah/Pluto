import { Component } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject, debounceTime } from 'rxjs';
import { AuthenticationService } from 'src/app/core/authentication/services/authentication.service';
import { Employee } from 'src/app/core/models/hr';
import { Interviewee } from 'src/app/core/models/interviewee';
import { AdminService } from 'src/app/views/admin/services/admin.service';
import { HrService } from 'src/app/views/hr/services/hr.service';

@Component({
  selector: 'app-leader-interviewee',
  templateUrl: './leader-interviewee.component.html',
  styleUrls: ['./leader-interviewee.component.scss'],
  providers: [MessageService, ConfirmationService, BrowserAnimationsModule]

})
export class LeaderIntervieweeComponent {
  allInterviewees!: Interviewee[];
  Page: number = 1;
  PageSize: number = 10;
  numberOfPage: number[] = [];
  totalCount: number = 0;
  private searchSubject = new Subject<string>();
  constructor(private admin: AdminService, private hr: HrService, private messageService:MessageService,private confirmationService: ConfirmationService) {
    this.searchSubject.pipe(debounceTime(500)).subscribe(value => {
      this.filter(value);
    });
  }
  ngOnInit(): void {
    this.getAllInterviewees();
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
      },
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
