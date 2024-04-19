import { Component } from '@angular/core';
import { MemberResponse } from 'src/app/core/models/Sales.model';
import { AdminService } from '../../services/admin.service';
import { Subject, debounceTime } from 'rxjs';
import { Hr } from 'src/app/core/models/hr';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-interviee-section',
  templateUrl: './interviee-section.component.html',
  styleUrls: ['./interviee-section.component.scss']
})
export class IntervieeSectionComponent {
  getSalesById(arg0: any) {
    throw new Error('Method not implemented.');
  }
  allInterviewees!: MemberResponse[];
  Page: number = 1;
  PageSize: number = 10;
  numberOfPage: number[] = [];
  totalCount: number = 0;
  displayHrModal!: boolean;
  allHrs!:Hr[];
  intervieweeId!:string;
  hrId!:string;
  private searchSubject = new Subject<string>();
  constructor(private admin: AdminService,private messageService:MessageService) {
    this.searchSubject.pipe(debounceTime(500)).subscribe(value => {
      this.filter(value);
    });
  }
  ngOnInit(): void {
    this.getAllInterviewees();
  }
  getAllInterviewees(intervieweeName?: string): void {
    let queryURL;
    if (intervieweeName) {
      queryURL = `Page=${this.Page}&PageSize=${this.PageSize}&Name=${intervieweeName}`;
    }
    else {
      queryURL = `Page=${this.Page}&PageSize=${this.PageSize}`;
    }
    this.admin.getAllInterviewees(queryURL).subscribe({
      next: (response: any) => {
        this.allInterviewees = response.data.items; console.log(this.allInterviewees);;
        this.totalCount = Math.ceil(response.data.count);
      },
      error: (error) => { console.log(error); }
    })
  }
  getAllHrs(HrName?: string): void {
    let queryURL;
    if (HrName) {
      queryURL = `Page=${this.Page}&PageSize=${this.PageSize}&Name=${HrName}`;
    }
    else {
      queryURL = `Page=${this.Page}&PageSize=${this.PageSize}`;
    }
    this.admin.getAllHrs(queryURL).subscribe({
      next: (response: any) => {
        this.allHrs = response.data.items; console.log(this.allHrs);;
        this.totalCount = Math.ceil(response.data.count);
      },
      error: (error) => { console.log(error); }
    })
  }
  filter(event: any) {
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
  showHrModal(id:string) {
    this.intervieweeId = id;
    this.displayHrModal = true;
    this.getAllHrs();
  }
  changeHr()
  {
    const queryURL = `${this.intervieweeId}/superior/${this.hrId}`;
    this.admin.changeIntervieweeHr(queryURL).subscribe({
      next:()=>{
        this.getAllInterviewees();
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Hr Changed successfully' });
      },
      error:(error)=>{
        console.log(error)
      }
    })
    this.displayHrModal = false;
  }
}
