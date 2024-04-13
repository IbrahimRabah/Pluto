import { Component } from '@angular/core';
import { MemberResponse } from 'src/app/core/models/Sales.model';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-retention-section',
  templateUrl: './retention-section.component.html',
  styleUrls: ['./retention-section.component.scss']
})
export class RetentionSectionComponent {
  getSalesById(arg0: any) {
    throw new Error('Method not implemented.');
    }
      allRetentions!:MemberResponse[];
      Page: number = 1;
      PageSize: number = 10;
      numberOfPage:number[]=[];
      totalCount:number=0;
      constructor(private admin:AdminService){}
      ngOnInit(): void {
        this.getAllRetentions();
      }
      getAllRetentions():void {
        const queryURL = `Page=${this.Page}&PageSize=${this.PageSize}`;
        this.admin.getAllRetentions(queryURL).subscribe({
          next:(response:any)=>{this.allRetentions = response.data.items;console.log(this.allRetentions);;
            this.totalCount=Math.ceil(response.data.count);
          },
          error:(error)=>{console.log(error);}
        })
      }
      returnPages(pageReturn:number){
        this.Page=pageReturn;
        this.getAllRetentions()
      }
      nextPage() {
        this.Page = ++ this.Page ;
        this.getAllRetentions();
       }

     previousPage() {
        this.Page = -- this.Page ;
        this.getAllRetentions()

      }
}
