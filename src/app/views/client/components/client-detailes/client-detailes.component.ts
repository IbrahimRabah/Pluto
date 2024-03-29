import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from '../../services/client.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { SalesService } from 'src/app/core/services/sales/sales.service';
import { DepositService } from '../../services/deposit.service';

@Component({
  selector: 'app-client-detailes',
  templateUrl: './client-detailes.component.html',
  styleUrls: ['./client-detailes.component.scss'],
  providers: [MessageService]
})
export class ClientDetailesComponent implements OnInit {

  clientData: any
  clientLots: any
  clientDeposit: any
  updateForm!: FormGroup;
  clientId: any;
  salesList!: any;
  retentionId: any;
  displayModal!: boolean


  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private clientService: ClientService,
    private messageService: MessageService,
    private salesService: SalesService,
    private depositService: DepositService
  ) { }

  ngOnInit() {
    this.initRout();
    this.getSales();
    this.getClientData();
    this.initializeClientForm();
    this.getDepositForClient();
  }

  initRout() {
    this.activatedRoute.params.subscribe(params => {
      this.clientId = params['id'];
      if (this.clientId) {
        console.log(`The ID from the route is: ${this.clientId}`);
      }
    });
  }

  initializeClientForm() {
    this.updateForm = this.formBuilder.group({
      name: [''],
      nationalId: [''],
      phoneNumber: [''],
      email: [''],
      accountId: [''],
      platform: [''],
      company: [''],
      status: [0],
      statusName: [''],
      teamLeaderName: [''],
      salesName: [''],
      retentionName: [''],
      teamLeaderId: [''],
      salesId: [''],
      retentionId: ['']
    });
  }
  showModal(): void {
    this.displayModal = true;
  }

  assignToRetension() {
    this.clientService.assignClientToRetention(this.clientId, this.retentionId).subscribe({
      next: (data) => {
        console.log(data);
      }
    })
    this.displayModal = false;

  }
  getSales() {
    this.salesService.getAllSales().subscribe({
      next: (ress) => {
        this.salesList = ress.data
      }
    })
  }

  getClientData() {
    this.clientService.getClientById(this.clientId).subscribe({
      next: (res: any) => {
        this.updateForm.patchValue(res.data);

      }
    })
  }

  getDepositForClient() {
    this.depositService.getDepositById(this.clientId).subscribe({
      next: (res) => {
        this.clientDeposit = res.data;
      }
    })
  }

  getClientLotForClient() {

  }

  updateItemDetails(): void {
    if (this.updateForm.valid) {
      this.clientService.updateClient(this.clientId, this.updateForm.value).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Updated Successfully' });
        }
      })
    }
  }
}
