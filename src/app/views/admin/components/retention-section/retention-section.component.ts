import { Component } from '@angular/core';
import { MemberResponse } from 'src/app/core/models/Sales.model';
import { AdminService } from '../../services/admin.service';
import { Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'app-retention-section',
  templateUrl: './retention-section.component.html',
  styleUrls: ['./retention-section.component.scss']
})
export class RetentionSectionComponent {
  getSalesById(arg0: any) {
    throw new Error('Method not implemented.');
  }
  allRetentions!: MemberResponse[];
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
    this.getAllRetentions();
  }
  getAllRetentions(retentionName?: string): void {
    let queryURL;
    if (retentionName) {
      queryURL = `Page=${this.Page}&PageSize=${this.PageSize}&RetentionName=${retentionName}`;
    }
    else {
      queryURL = `Page=${this.Page}&PageSize=${this.PageSize}`;
    }
    this.admin.getAllRetentions(queryURL).subscribe({
      next: (response: any) => {
        this.allRetentions = response.data.items; console.log(this.allRetentions);;
        this.totalCount = Math.ceil(response.data.count);
      },
      error: (error) => { console.log(error); }
    })
  }
  filter(event: any) {
    this.getAllRetentions(event);
  }
  onInputChange(event: any) {
    this.searchSubject.next(event.target.value);
  }
  returnPages(pageReturn: number) {
    this.Page = pageReturn;
    this.getAllRetentions()
  }
  nextPage() {
    this.Page = ++this.Page;
    this.getAllRetentions();
  }

  previousPage() {
    this.Page = --this.Page;
    this.getAllRetentions()

  }
}
