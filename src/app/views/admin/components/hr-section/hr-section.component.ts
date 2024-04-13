import { Component } from '@angular/core';
import { MemberResponse } from 'src/app/core/models/Sales.model';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-hr-section',
  templateUrl: './hr-section.component.html',
  styleUrls: ['./hr-section.component.scss']
})
export class HrSectionComponent {
  getSalesById(arg0: any) {
    throw new Error('Method not implemented.');
    }
      allHrs!:MemberResponse[];
      Page: number = 1;
      PageSize: number = 10;
      numberOfPage:number[]=[];
      totalCount:number=0;
      constructor(private admin:AdminService){}
      ngOnInit(): void {
        this.getAllHrs();
      }
      getAllHrs():void {
        const queryURL = `Page=${this.Page}&PageSize=${this.PageSize}`;
        this.admin.getAllHrs(queryURL).subscribe({
          next:(response:any)=>{this.allHrs = response.data.items;console.log(this.allHrs);;
            this.totalCount=Math.ceil(response.data.count);
          },
          error:(error)=>{console.log(error);}
        })
      }
      returnPages(pageReturn:number){
        this.Page=pageReturn;
        this.getAllHrs()
      }
      nextPage() {
        this.Page = ++ this.Page ;
        this.getAllHrs();
       }

     previousPage() {
        this.Page = -- this.Page ;
        this.getAllHrs()
      }

}
