import { Component } from '@angular/core';
import { Subject, debounceTime } from 'rxjs';
import { AdminService } from '../../admin/services/admin.service';
import { MemberResponse } from 'src/app/core/models/Sales.model';
import { AuthenticationService } from 'src/app/core/authentication/services/authentication.service';

@Component({
  selector: 'app-sales-list',
  templateUrl: './sales-list.component.html',
  styleUrls: ['./sales-list.component.scss']
})
export class SalesListComponent {
  allSellers!: MemberResponse[];
  Page: number = 1;
  PageSize: number = 10;
  numberOfPage: number[] = [];
  totalCount: number = 0;
  TeamLeaderId!: string;
  private searchSubject = new Subject<string>();
  constructor(private admin: AdminService, private auth: AuthenticationService) {
    this.searchSubject.pipe(debounceTime(500)).subscribe(value => {
      this.filter(value);
    });
  }
  ngOnInit(): void {
    this.getTeamLeadId();
    this.getAllSellers();
  }
  getTeamLeadId() {
    this.TeamLeaderId = this.auth.getUserId();
  }
  getAllSellers(SalesName?: string): void {
    let queryURL;
    if (SalesName) {
      queryURL = `Page=${this.Page}&PageSize=${this.PageSize}&SalesName=${SalesName}&TeamLeaderId=${this.TeamLeaderId}`;
    }

    else {
      queryURL = `Page=${this.Page}&PageSize=${this.PageSize}&TeamLeaderId=${this.TeamLeaderId}`;
    }
    this.admin.getAllSellers(queryURL).subscribe({
      next: (response: any) => {
        this.allSellers = response.data.items; console.log(this.allSellers);;
        this.totalCount = Math.ceil(response.data.count);
      },
      error: (error) => { console.log(error); }
    })
  }
  filter(event: any) {
    console.log(event)
    this.getAllSellers(event);
  }
  onInputChange(event: any) {
    this.searchSubject.next(event.target.value);
  }
  returnPages(pageReturn: number) {
    this.Page = pageReturn;
    this.getAllSellers()
  }
  nextPage() {
    this.Page = ++this.Page;
    this.getAllSellers();
  }

  previousPage() {
    this.Page = --this.Page;
    this.getAllSellers()

  }

}
