import { Component } from '@angular/core';
import { MemberResponse } from 'src/app/core/models/Sales.model';
import { AdminService } from '../../services/admin.service';
import { Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'app-clients-section-details',
  templateUrl: './clients-section-details.component.html',
  styleUrls: ['./clients-section-details.component.scss']
})
export class ClientsSectionDetailsComponent {
  getSalesById(arg0: any) {
    throw new Error('Method not implemented.');
  }
  allClients!: MemberResponse[];
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
    this.getAllClients();
  }
  getAllClients(clientName?: string): void {
    let queryURL;
    if (clientName) {
      queryURL = `Page=${this.Page}&PageSize=${this.PageSize}&ClientName=${clientName}`;

    } else {
      queryURL = `Page=${this.Page}&PageSize=${this.PageSize}`;
    }
    this.admin.getAllClients(queryURL).subscribe({
      next: (response: any) => {
        this.allClients = response.data.items;
        this.totalCount = Math.ceil(response.data.count);
      }
    })
  }
  filter(event: any) {
    this.getAllClients(event);
  }
  onInputChange(event: any) {
    this.searchSubject.next(event.target.value);
  }
  returnPages(pageReturn: number) {
    this.Page = pageReturn;
    this.getAllClients()
  }
  nextPage() {
    this.Page = ++this.Page;
    this.getAllClients();
  }

  previousPage() {
    this.Page = --this.Page;
    this.getAllClients()
  }
}
