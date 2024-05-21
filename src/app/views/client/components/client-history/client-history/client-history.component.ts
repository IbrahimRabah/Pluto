import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../../services/client.service';
import { DepositService } from 'src/app/core/services/deposit/deposit.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SalesService } from 'src/app/core/services/sales/sales.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject, debounceTime } from 'rxjs';
import { AuthenticationService } from 'src/app/core/authentication/services/authentication.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminService } from 'src/app/views/admin/services/admin.service';

@Component({
  selector: 'app-client-history',
  templateUrl: './client-history.component.html',
  styleUrls: ['./client-history.component.scss'],
  providers: [MessageService, ConfirmationService, BrowserAnimationsModule]

})
export class ClientHistoryComponent implements OnInit {
  updateForm!: FormGroup;
  displayUpdateModal!: boolean;
  TeamLeaderId: string = "";
  ClientNationalId: string = "";
  ClientName: string = "";
  SalesId: string = "";
  StartDate: Date = new Date(new Date().setDate(new Date().getDate() - 60));
  EndDate: Date = new Date();
  Page: number = 1;
  PageSize: number = 10;
  IsSortingAscending!: boolean;
  Take!: number;
  Skip!: number;
  OrderByDirection!: string
  items: any;
  displayModal: boolean = false;
  selectedNumber!: number;
  clientId!: string
  salesList!: any;
  totalCount!: number;
  lastPage !: number;
  private searchSubject = new Subject<string>();
  userRole: any;
  constructor(private salesService: SalesService,
    private messageService: MessageService,
    private clientService: ClientService,
    private formBuilder: FormBuilder,
    private depositService: DepositService,private admin:AdminService, private auth: AuthenticationService,private confirmationService: ConfirmationService) {
    this.searchSubject.pipe(debounceTime(500)).subscribe(value => {
      this.filter(value);
    });
  }
  ngOnInit(): void {
    this.getUserRole();
    this.getClientHistory();
    this.initializeClientForm();
    if (this.userRole !== 'Retention') {
      this.getSales();
    }
  }

  getSales() {
    this.salesService.getAllSales().subscribe({
      next: (ress) => {
        this.salesList = ress.data
      }
    })
  }
  getClientHistory(clientName?: string) {
    let queryString;
    if (clientName) {
      queryString = `?TeamLeaderId=${this.TeamLeaderId}&ClientNationalId=${this.ClientNationalId}&ClientName=${clientName}&SalesId=${this.SalesId}&StartDate=${this.StartDate.toISOString()}&EndDate=${this.EndDate.toISOString()}&Page=${this.Page}&PageSize=${this.PageSize}&IsSortingAscending=${this.IsSortingAscending}&Take=${this.Take}&Skip=${this.Skip}&OrderByDirection=${this.OrderByDirection}`;
    }
    else {
      queryString = `?TeamLeaderId=${this.TeamLeaderId}&ClientNationalId=${this.ClientNationalId}&ClientName=${this.ClientName}&SalesId=${this.SalesId}&StartDate=${this.StartDate.toISOString()}&EndDate=${this.EndDate.toISOString()}&Page=${this.Page}&PageSize=${this.PageSize}&IsSortingAscending=${this.IsSortingAscending}&Take=${this.Take}&Skip=${this.Skip}&OrderByDirection=${this.OrderByDirection}`;
    }

    this.clientService.getAllClients(queryString).subscribe({
      next: (response) => {
        this.items = response.data.items
        this.totalCount = response.data.count

        this.lastPage = Math.ceil(this.totalCount / this.PageSize)

      }
    })
  }

  filter(event: any) {
    this.getClientHistory(event);
  }
  onInputChange(event: any) {
    this.searchSubject.next(event.target.value);
  }

  showModal(rowData: any): void {
    this.displayModal = true;
    this.selectedNumber = 0;
    this.clientId = rowData.id;
  }

  delteClient(clientId: string) {
    this.clientService.deleteClient(clientId).subscribe({
      next: () => {
        this.messageService.add({ severity: 'error', summary: 'Deleted', detail: 'Client Deleted successfully' });
        this.getClientHistory();
      }
    })
  }
  initializeClientForm() {
    this.updateForm = this.formBuilder.group({
      name: ['', Validators.required],
      nationalId: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      accountId: ['', Validators.required],
      platform: ['', Validators.required],
      company: ['', Validators.required],
      salesId: ['', Validators.required],
    });
  }
  showUpdateModal(item: any): void {
    this.updateForm.patchValue(item); // Simplified to patch all values directly if field names match
    this.clientId = item.id;
    this.displayUpdateModal = true;
  }

  updateItemDetails(): void {
    if (this.updateForm.valid) {
      this.clientService.updateClient(this.clientId, this.updateForm.value).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Updated Successfully' });
          this.getClientHistory();
        }
      })
      this.displayUpdateModal = false;
    } else {
    }
  }
  next() {
    this.Page = ++this.Page;
    this.getClientHistory()
  }

  prev() {
    this.Page = --this.Page;
    this.getClientHistory()

  }
  changeClander() {
    this.getClientHistory()
  }

  getUserRole() {
    this.userRole = this.auth.getUserRole()
  }
  deleteSpecificClient(client:any)
  {
    let clientName = client.name;
    let clientId = client.id;
    let msg = `Are you sure you want to delete ${clientName} ?`
    this.Confirmation(msg,clientId);
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
        this.admin.deleteClientById(id).subscribe({
           next:()=>{this.getClientHistory()}
          })
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' });
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
      }
    });
  }
}
