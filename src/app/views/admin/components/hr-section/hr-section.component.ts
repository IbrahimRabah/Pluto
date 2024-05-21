import { Component } from '@angular/core';
import { MemberResponse } from 'src/app/core/models/Sales.model';
import { AdminService } from '../../services/admin.service';
import { Subject, debounceTime } from 'rxjs';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-hr-section',
  templateUrl: './hr-section.component.html',
  styleUrls: ['./hr-section.component.scss'],
  providers: [MessageService, ConfirmationService, BrowserAnimationsModule]

})
export class HrSectionComponent {
  getSalesById(arg0: any) {
    throw new Error('Method not implemented.');
  }
  allHrs!: MemberResponse[];
  Page: number = 1;
  PageSize: number = 10;
  numberOfPage: number[] = [];
  totalCount: number = 0;
  private searchSubject = new Subject<string>();
  constructor(private admin: AdminService, private confirmationService: ConfirmationService, private messageService: MessageService) {
    this.searchSubject.pipe(debounceTime(500)).subscribe(value => {
      this.filter(value);
    });
  }
  ngOnInit(): void {
    this.getAllHrs();
  }
  getAllHrs(hrName?: string): void {
    let queryURL;
    if (hrName) {
      queryURL = `Page=${this.Page}&PageSize=${this.PageSize}&HrName=${hrName}`;
    }
    else {
      queryURL = `Page=${this.Page}&PageSize=${this.PageSize}`;
    }
    this.admin.getAllHrs(queryURL).subscribe({
      next: (response: any) => {
        this.allHrs = response.data.items;
        this.totalCount = Math.ceil(response.data.count);
      }
    })
  }
  filter(event: any) {
    this.getAllHrs(event);
  }
  onInputChange(event: any) {
    this.searchSubject.next(event.target.value);
  }
  returnPages(pageReturn: number) {
    this.Page = pageReturn;
    this.getAllHrs()
  }
  nextPage() {
    this.Page = ++this.Page;
    this.getAllHrs();
  }

  previousPage() {
    this.Page = --this.Page;
    this.getAllHrs()
  }
  deleteSpecificHr(hr: any) {
    let hrName = hr.name;
    let hrId = hr.id;
    let msg = `Are you sure you want to delete ${hrName} ?`
    this.Confirmation(msg, hrId, 'seller');
  }
  Confirmation(msg: any, id: string, Role: string) {
    this.confirmationService.confirm({
      message: msg,
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: "p-button-danger p-button-text",
      rejectButtonStyleClass: "p-button-text p-button-text",
      acceptIcon: "none",
      rejectIcon: "none",
      accept: () => {
        this.admin.deleteHrById(id).subscribe({
          next: () => { this.getAllHrs() }
        })
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' });
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
      }
    });
  }
}
