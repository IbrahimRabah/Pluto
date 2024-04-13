import { Component } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { AdminService } from '../../services/admin.service';
import { MemberResponse } from 'src/app/core/models/Sales.model';
import { Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'app-sales-section-details',
  templateUrl: './sales-section-details.component.html',
  styleUrls: ['./sales-section-details.component.scss']
})
export class SalesSectionDetailsComponent {
getSalesById(arg0: any) {
throw new Error('Method not implemented.');
}
  allSellers!:MemberResponse[];
  Page: number = 1;
  PageSize: number = 10;
  numberOfPage:number[]=[];
  totalCount:number=0;
  private searchSubject = new Subject<string>();
  constructor(private admin:AdminService){
    this.searchSubject.pipe(debounceTime(500)).subscribe(value => {
      this.filter(value);
    });
  }
  ngOnInit(): void {
    this.getAllSellers();
  }
  getAllSellers(SalesName?:string):void {
    let queryURL;
    if(SalesName){
     queryURL = `Page=${this.Page}&PageSize=${this.PageSize}&SalesName=${SalesName}`;
    }
    else
    {
      queryURL = `Page=${this.Page}&PageSize=${this.PageSize}`;
    }
    this.admin.getAllSellers(queryURL).subscribe({
      next:(response:any)=>{this.allSellers = response.data.items;console.log(this.allSellers);;
        this.totalCount=Math.ceil(response.data.count);
      },
      error:(error)=>{console.log(error);}
    })
  }
  filter(event:any){
    console.log(event)
    this.getAllSellers(event);
  }
  onInputChange(event: any) {
    this.searchSubject.next(event.target.value);
  }
  returnPages(pageReturn:number){
    this.Page=pageReturn;
    this.getAllSellers()
  }
  nextPage() {
    this.Page = ++ this.Page ;
    this.getAllSellers();
   }

 previousPage() {
    this.Page = -- this.Page ;
    this.getAllSellers()

  }
}
