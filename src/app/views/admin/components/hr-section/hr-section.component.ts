import { Component } from '@angular/core';
import { MemberResponse } from 'src/app/core/models/Sales.model';
import { AdminService } from '../../services/admin.service';
import { Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'app-hr-section',
  templateUrl: './hr-section.component.html',
  styleUrls: ['./hr-section.component.scss']
})
export class HrSectionComponent {
  getSalesById(arg0: any) {
    throw new Error('Method not implemented.');
  }
  allHrs!: MemberResponse[];
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
    this.getAllHrs();
  }
  getAllHrs(hrName?: string): void {
    let queryURL;
    if (hrName) {
      queryURL = `Page=${this.Page}&PageSize=${this.PageSize}&HrName=${hrName}`;
    }
    else {
      queryURL = `Page=${this.Page}&PageSize=${this.PageSize}`;
    }
    this.admin.getAllHrs(queryURL).subscribe({
      next: (response: any) => {
        this.allHrs = response.data.items;
        this.totalCount = Math.ceil(response.data.count);
      }
    })
  }
  filter(event: any) {
    this.getAllHrs(event);
  }
  onInputChange(event: any) {
    this.searchSubject.next(event.target.value);
  }
  returnPages(pageReturn: number) {
    this.Page = pageReturn;
    this.getAllHrs()
  }
  nextPage() {
    this.Page = ++this.Page;
    this.getAllHrs();
  }

  previousPage() {
    this.Page = --this.Page;
    this.getAllHrs()
  }

}
