import { Component, OnInit } from '@angular/core';
import { SalesService } from '../services/sales.service';
import { SalesHistoryResponse, SalesItem } from 'src/app/core/models/Sales.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-sales-history',
  templateUrl: './sales-history.component.html',
  styleUrls: ['./sales-history.component.scss'],
  providers: [MessageService]
})
export class SalesHistoryComponent implements OnInit {
  salesHistory!: SalesItem[]
  SalesMan: String = "";
  SalesId: string = "";
  StartDate: Date = new Date();
  EndDate: Date = new Date();
  Page: number = 1
  PageSize: number = 10
  numberOfPage:number[]=[];
  IsSortingAscending!: boolean
  Take!: number
  Skip!: number
  OrderByDirection!: string

  salesHome!: FormGroup
  slaesId: string = "";
  addedDate!: Date
  salesId!: string
  x!:string;

  constructor(private salesService: SalesService,private formBuilder: FormBuilder,private messageService:MessageService) { }
  ngOnInit(): void {
    this.initializeSalesForm();
    this.getSalesHistory();
  }

  
  getSalesHistory() {
    const queryURL = `?SalesMan=${this.SalesMan}&SalesId${this.SalesId}&StartDate${this.StartDate}&EndDate${this.EndDate}&Page${this.Page}&PageSize${this.PageSize}&IsSortingAscending${this.IsSortingAscending}&Take${this.Take}&Skip${this.Skip}&OrderByDirection${this.OrderByDirection}`;
    this.salesService.getSalesDayBy(queryURL).subscribe({
      next: (response: SalesHistoryResponse) => {
        this.numberOfPage=[];
        this.salesHistory = response.data.items;
        // debugger
        const x=Math.ceil(response.data.count/this.PageSize)
        for(let i=1;i<=x;i++){
          this.numberOfPage.push(i);
        }
        // this.numberOfPage =Math.floor(response.data.count/this.Page);
      },
      error: (err) => {
        console.error(err)
      }
    })
  }
  initializeSalesForm(): void {
    this.salesHome = this.formBuilder.group({
      canvas: [null, [Validators.required, Validators.pattern("^[0-9]*$")]],
      secondCall: [null, [Validators.required, Validators.pattern("^[0-9]*$")]],
      sell: [null, [Validators.required, Validators.pattern("^[0-9]*$")]],
      follow: [null, [Validators.required, Validators.pattern("^[0-9]*$")]],
      register: [null, [Validators.required, Validators.pattern("^[0-9]*$")]],
      deposit: [null, [Validators.required, Validators.pattern("^[0-9]*$")]]
    });
  }

  update() {
    if (this.salesHome.valid) {
      const salesHomeData = this.salesHome.value;
      
        salesHomeData['salesId'] = this.x;
        salesHomeData['date'] = this.addedDate;
        this.salesService.updateSalesDay(this.x, salesHomeData ).subscribe({
          next: (res) => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Updated Successfully' });
            this.getSalesHistory();
          },error:(err)=>{
            this.messageService.add({ severity: 'error', summary: 'error', detail: 'Error' });
          }
        })
    }
  }
  getSalesById(salesId: string) {
    this.x=salesId;
    this.salesService.getSalesDayById(salesId).subscribe({
      next: (data) => {
        this.addedDate = new Date(data.data.date);
        this.salesId = data.data.salesId;
        this.salesHome.patchValue({
          canvas: data.data.canvas,
          secondCall: data.data.secondCall,
          sell: data.data.sell,
          follow: data.data.follow,
          register: data.data.register,
          deposit: data.data.deposit,
        })
      }
    })
  }
  returnPages(pageReturn:number){
    this.Page=pageReturn;
    this.getSalesHistory()
  }
}
