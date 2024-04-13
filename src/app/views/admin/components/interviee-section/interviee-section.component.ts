import { Component } from '@angular/core';
import { MemberResponse } from 'src/app/core/models/Sales.model';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-interviee-section',
  templateUrl: './interviee-section.component.html',
  styleUrls: ['./interviee-section.component.scss']
})
export class IntervieeSectionComponent {
  getSalesById(arg0: any) {
    throw new Error('Method not implemented.');
    }
      allInterviewees!:MemberResponse[];
      Page: number = 1;
      PageSize: number = 10;
      numberOfPage:number[]=[];
      totalCount:number=0;
      constructor(private admin:AdminService){}
      ngOnInit(): void {
        this.getAllInterviewees();
      }
      getAllInterviewees():void {
        const queryURL = `Page=${this.Page}&PageSize=${this.PageSize}`;
        this.admin.getAllInterviewees(queryURL).subscribe({
          next:(response:any)=>{this.allInterviewees = response.data.items;console.log(this.allInterviewees);;
            this.totalCount=Math.ceil(response.data.count);
          },
          error:(error)=>{console.log(error);}
        })
      }
      returnPages(pageReturn:number){
        this.Page=pageReturn;
        this.getAllInterviewees()
      }
      nextPage() {
        this.Page = ++ this.Page ;
        this.getAllInterviewees();
       }

     previousPage() {
        this.Page = -- this.Page ;
        this.getAllInterviewees()

      }
}
