import { Component } from '@angular/core';
import { MemberResponse } from 'src/app/core/models/Sales.model';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-clients-section-details',
  templateUrl: './clients-section-details.component.html',
  styleUrls: ['./clients-section-details.component.scss']
})
export class ClientsSectionDetailsComponent {
getSalesById(arg0: any) {
throw new Error('Method not implemented.');
}
  allClients!:MemberResponse[];
  Page: number = 1;
  PageSize: number = 10;
  numberOfPage:number[]=[];
  totalCount:number=0;
  constructor(private admin:AdminService){}
  ngOnInit(): void {
    this.getAllClients();
  }
  getAllClients():void {
    const queryURL = `Page=${this.Page}&PageSize=${this.PageSize}`;
    this.admin.getAllClients(queryURL).subscribe({
      next:(response:any)=>{this.allClients = response.data.items;console.log(this.allClients);;
        this.totalCount=Math.ceil(response.data.count);
      },
      error:(error)=>{console.log(error);}
    })
  }
  returnPages(pageReturn:number){
    this.Page=pageReturn;
    this.getAllClients()
  }
  nextPage() {
    this.Page = ++ this.Page ;
    this.getAllClients();
   }

 previousPage() {
    this.Page = -- this.Page ;
    this.getAllClients()
  }
}
