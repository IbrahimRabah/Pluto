import { Component } from '@angular/core';
import { MemberResponse } from 'src/app/core/models/Sales.model';
import { AdminService } from '../../services/admin.service';
import { Subject, debounceTime } from 'rxjs';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-retention-section',
  templateUrl: './retention-section.component.html',
  styleUrls: ['./retention-section.component.scss'],
  providers: [MessageService, ConfirmationService, BrowserAnimationsModule]

})
export class RetentionSectionComponent {
  getSalesById(arg0: any) {
    throw new Error('Method not implemented.');
  }
  allRetentions!: MemberResponse[];
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
    this.getAllRetentions();
  }
  getAllRetentions(retentionName?: string): void {
    let queryURL;
    if (retentionName) {
      queryURL = `Page=${this.Page}&PageSize=${this.PageSize}&RetentionName=${retentionName}`;
    }
    else {
      queryURL = `Page=${this.Page}&PageSize=${this.PageSize}`;
    }
    this.admin.getAllRetentions(queryURL).subscribe({
      next: (response: any) => {
        this.allRetentions = response.data.items;
        this.totalCount = Math.ceil(response.data.count);
      }
    })
  }
  filter(event: any) {
    this.getAllRetentions(event);
  }
  onInputChange(event: any) {
    this.searchSubject.next(event.target.value);
  }
  returnPages(pageReturn: number) {
    this.Page = pageReturn;
    this.getAllRetentions()
  }
  nextPage() {
    this.Page = ++this.Page;
    this.getAllRetentions();
  }

  previousPage() {
    this.Page = --this.Page;
    this.getAllRetentions()
  }
  deleteSpecificRetention(retention: any) {
    let numberOfClients = retention.numberOfClients;
    let msg;
    if(numberOfClients > 0 )
      {
         msg = `This Leader contains ${numberOfClients}  Clients. If you want to delete ${retention.name}, pls delete or move them first.`;
         this.preventDeleteMsg = msg;
         this.preventDelete = true;
      }
    else
      {
         msg = `Are You Sure you Want to delete ${retention.name}?`;
         this.Confirmation(msg,retention.id);
      }
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
        this.admin.deleteRetentionById(id).subscribe({
          next: () => { this.getAllRetentions() }
        })
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' });
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
      }
    });
  }
}
