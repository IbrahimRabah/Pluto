import { Component } from '@angular/core';
import { MemberResponse } from 'src/app/core/models/Sales.model';
import { AdminService } from '../../services/admin.service';
import { Subject, debounceTime } from 'rxjs';

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
  private searchSubject = new Subject<string>();
  constructor(private admin: AdminService) {
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
      queryURL = `Page=${this.Page}&PageSize=${this.PageSize}&IntervieweeName=${intervieweeName}`;
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
}
