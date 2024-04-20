import { Component, ElementRef, ViewChild } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { MemberResponse } from 'src/app/core/models/Sales.model';
import { Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'app-leader-section-details',
  templateUrl: './leader-section-details.component.html',
  styleUrls: ['./leader-section-details.component.scss']
})
export class LeaderSectionDetailsComponent {
  allTeamLeadersSellers!: MemberResponse[];
  allTeamLeadersInterviewees!:MemberResponse[];
  allTeamLeaders!: MemberResponse[];
  teamLeaderId!: string;
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
    this.getAllTeamLeaders();
  }
  getAllTeamLeaders(TeamLeaderName?: string): void {
    let queryURL;
    if (TeamLeaderName) {
      queryURL = `Page=${this.Page}&PageSize=${this.PageSize}&TeamLeaderName=${TeamLeaderName}`;
    }
    else {
      queryURL = `Page=${this.Page}&PageSize=${this.PageSize}`;
    }
    this.admin.getAllTeamLeaders(queryURL).subscribe({
      next: (response: any) => {
        this.allTeamLeaders = response.data.items; console.log(this.allTeamLeaders);;
        this.totalCount = Math.ceil(response.data.count);
      },
      error: (error) => { console.log(error); }
    })
  }
  filter(event: any) {
    this.getAllTeamLeaders(event);
  }
  onInputChange(event: any) {
    this.searchSubject.next(event.target.value);
  }
  returnPages(pageReturn: number) {
    this.Page = pageReturn;
    this.getAllTeamLeaders()
  }
  nextPage() {
    this.Page = ++this.Page;
    this.getAllTeamLeaders();
  }

  previousPage() {
    this.Page = --this.Page;
    this.getAllTeamLeaders()
  }
  getSalesById(id: string) {
    this.teamLeaderId = id;
    this.getAllTeamLeadersSellers();
  }
  getIntervieweesByLeaderId(id: string) {
    this.teamLeaderId = id;
    this.getAllTeamLeadersInterviewees();
  }
  getAllTeamLeadersSellers() {
    const queryURL = `Page=${this.Page}&PageSize=${this.PageSize}&TeamLeaderId=${this.teamLeaderId}`;
    this.admin.getAllSellers(queryURL).subscribe({
      next: (response: any) => {
        this.allTeamLeadersSellers = response.data.items; console.log(this.allTeamLeadersSellers);;
        this.totalCount = Math.ceil(response.data.count);
      },
      error: (error) => { console.log(error); }
    })
  }
  getAllTeamLeadersInterviewees() {
    const queryURL = `Page=${this.Page}&PageSize=${this.PageSize}&SuperiorId=${this.teamLeaderId}`;
    this.admin.getAllInterviewees(queryURL).subscribe({
      next: (response: any) => {
        this.allTeamLeadersInterviewees = response.data.items; console.log(this.allTeamLeadersInterviewees);;
        this.totalCount = Math.ceil(response.data.count);
      },
      error: (error) => { console.log(error); }
    })
  }
}
