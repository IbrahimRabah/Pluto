import { Component, OnInit } from '@angular/core';
import { SalesDayService } from '../services/sales.service';
import { MemberResponse, SalesItem } from 'src/app/core/models/Sales.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { SalesService } from 'src/app/core/services/sales/sales.service';
import { ActivatedRoute } from '@angular/router';

interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}
@Component({
  selector: 'app-sales-history',
  templateUrl: './sales-history.component.html',
  styleUrls: ['./sales-history.component.scss'],
  providers: [MessageService]
})
export class SalesHistoryComponent implements OnInit {
  salesHistory!: SalesItem[]
  PageEvent!: PageEvent[];
  SalesMan: String = "";
  SalesId: string = "";
  StartDate: Date = new Date(new Date().setDate(new Date().getDate() - 60));
  EndDate: Date = new Date(new Date().setDate(new Date().getDate()));
  Page: number = 1
  PageSize: number = 10
  numberOfPage: number[] = [];
  IsSortingAscending!: boolean
  Take!: number
  Skip!: number
  OrderByDirection!: string
  salesHome!: FormGroup
  slaesId: string = "";
  addedDate!: Date
  salesId!: string
  x!: string;
  totalCount: number = 0;
  salesList: any;
  constructor(private salesService: SalesDayService, private salesManService: SalesService
    , private formBuilder: FormBuilder, private messageService: MessageService,
    private activatedRoute: ActivatedRoute) { }
  ngOnInit(): void {
    this.initializeSalesForm();
    this.getSalesHistory();
    this.getSales();
    this.routerData();
  }

  routerData() {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.SalesId = String(params.get('id')) ||'';
      if (this.SalesId !== "null") {

        this.getSalesHistory();
      }
    })
  }

  getSales() {
    this.salesManService.getAllSales().subscribe({
      next: (ress) => {
        this.salesList = ress.data
      }
    })
  }
  getSalesHistory() {
    const queryURL = `?SalesMan=${this.SalesMan}&SalesId=${this.SalesId}&StartDate=${this.StartDate.toISOString()}&EndDate=${this.EndDate.toISOString()}&Page=${this.Page}&PageSize=${this.PageSize}&IsSortingAscending=${this.IsSortingAscending}&Take=${this.Take}&Skip=${this.Skip}&OrderByDirection=${this.OrderByDirection}`;
    this.salesService.getSalesDayBy(queryURL).subscribe({
      next: (response: MemberResponse) => {
        this.salesHistory = response.data.items;
        this.totalCount = Math.ceil(response.data.count)
        console.log("total", this.totalCount)
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
      this.salesService.updateSalesDay(this.x, salesHomeData).subscribe({
        next: (res) => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Updated Successfully' });
          this.getSalesHistory();
        }, error: (err) => {
          this.messageService.add({ severity: 'error', summary: 'error', detail: 'Error' });
        }
      })
    }
  }
  getSalesById(salesId: string) {
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
  returnPages(pageReturn: number) {
    this.Page = pageReturn;
    this.getSalesHistory()
  }
  next() {
    this.Page = ++this.Page;
    this.getSalesHistory()
  }

  prev() {
    this.Page = --this.Page;
    this.getSalesHistory()

  }
  changeClander() {
    this.getSalesHistory()
  }
}
