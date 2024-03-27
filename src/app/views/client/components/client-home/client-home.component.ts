import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { SalesService } from 'src/app/core/services/sales/sales.service';
import { ClientService } from '../../services/client.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-client-home',
  templateUrl: './client-home.component.html',
  styleUrls: ['./client-home.component.scss']
})
export class ClientHomeComponent {
  formClient!: FormGroup;
  salesList!: any[];
  clientId!: string;

  constructor(private fb: FormBuilder,
    private salesService: SalesService,
    private clientService: ClientService,
    private activatedRoute: ActivatedRoute

  ) { }
  ngOnInit() {
    this.initializeForm();
    this.getSalesList();
  }

  private initializeForm() {
    this.formClient = this.fb.group({
      name: ['', Validators.required],
      nationalId: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      accountId: ['', Validators.required],
      platform: ['', Validators.required],
      company: ['', Validators.required],
      deposit: [0, Validators.required],
      salesId: [null, Validators.required] // Dropdown
    });
  }

  routerData() {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.clientId = String(params.get('id'));
      if (this.clientId !== "null") {
        this.getCLientById(this.clientId);
      }
    })
  }

  onSubmit() {
    if (this.formClient.valid) {
      debugger
      const clientData = this.formClient.value;
      if (this.clientId === "null" || this.clientId === undefined) {
        this.clientService.addClient(clientData).subscribe({
          next: (res) => {
            console.log("Done =======>", res);
          }
        });
      }
      else {
        this.clientService.updateClient(this.clientId, clientData).subscribe({
          next: (res) => {
            console.log(res);
          }
        })
      }
    }
  }

  getCLientById(clientId: string) {
    this.clientService.getClientById(clientId).subscribe({
      next: (res) => {
        //patch value here 
      }
    })
  }

  getSalesList() {
    this.salesService.getAllSales().subscribe({
      next: (response) => {
        this.salesList = response.data;
      }
    })
  }
}
