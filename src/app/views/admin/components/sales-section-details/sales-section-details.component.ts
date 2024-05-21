import { Component } from '@angular/core';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { AdminService } from '../../services/admin.service';
import { MemberResponse } from 'src/app/core/models/Sales.model';
import { Subject, debounceTime } from 'rxjs';
import { ToggleButtonChangeEvent } from 'primeng/togglebutton';
import { AuthenticationService } from 'src/app/core/authentication/services/authentication.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
  managerId: string = '';
  Page: number = 1;
  PageSize: number = 10;
  numberOfPage: number[] = [];
  totalCount: number = 0;
  private searchSubject = new Subject<string>();
  constructor(private admin: AdminService, private auth: AuthenticationService,private confirmationService: ConfirmationService, private messageService: MessageService) {
    this.searchSubject.pipe(debounceTime(500)).subscribe(value => {
      this.filter(value);
    });
  }
  ngOnInit(): void {
    this.getAllSellers();
    // this.getUserId();
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
    let msg = `Are you sure you want to delete ${sellerName} ?`
    this.Confirmation(msg,sellerId);
  }
  Confirmation(msg: any,id:string) {
    this.confirmationService.confirm({
      message: msg,
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: "p-button-danger p-button-text",
      rejectButtonStyleClass: "p-button-text p-button-text",
      acceptIcon: "none",
      rejectIcon: "none",
      accept: () => {
        this.admin.deleteSellerById(id).subscribe({
           next:()=>{this.getAllSellers()}
          })
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' });
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
      }
    });
  }
}
