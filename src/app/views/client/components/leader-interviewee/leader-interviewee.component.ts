import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subject, debounceTime } from 'rxjs';
import { Employee } from 'src/app/core/models/hr';
import { Interviewee } from 'src/app/core/models/interviewee';
import { AdminService } from 'src/app/views/admin/services/admin.service';
import { HrService } from 'src/app/views/hr/services/hr.service';

@Component({
  selector: 'app-leader-interviewee',
  templateUrl: './leader-interviewee.component.html',
  styleUrls: ['./leader-interviewee.component.scss']
})
export class LeaderIntervieweeComponent {
  allInterviewees!: Interviewee[];
  Page: number = 1;
  PageSize: number = 10;
  numberOfPage: number[] = [];
  totalCount: number = 0;
  private searchSubject = new Subject<string>();
  constructor(private admin: AdminService, private hr:HrService, private messageService:MessageService) {
    this.searchSubject.pipe(debounceTime(500)).subscribe(value => {
      this.filter(value);
    });
   }
  ngOnInit(): void {
    this.getAllInterviewees();
  }
  getAllInterviewees(intervieweeName?:string ): void {
    let queryURL;
    if(intervieweeName)
      {
         queryURL = `Page=${this.Page}&PageSize=${this.PageSize}&TeamLeaderName=${intervieweeName}`;
      }
      else
      {
        queryURL = `Page=${this.Page}&PageSize=${this.PageSize}`;
      }
    this.hr.getAllInterviewee(queryURL).subscribe({
      next: (response: any) => {
        this.allInterviewees = response.data.items; console.log(this.allInterviewees);;
        this.totalCount = Math.ceil(response.data.count);
      },
      error: (error) => { console.log(error); }
    })
  }
  filter(event:any){
    this.getAllInterviewees(event);
  }
  onInputChange(event: any) {
    this.searchSubject.next(event.target.value);
  }
  returnPages(pageReturn: number) {
    this.Page = pageReturn;
    this.getAllInterviewees()
  }
  nextPage() {
    this.Page = ++this.Page;
    this.getAllInterviewees();
  }

  previousPage() {
    this.Page = --this.Page;
    this.getAllInterviewees()
  }

}
