import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../../services/client.service';

@Component({
  selector: 'app-client-history',
  templateUrl: './client-history.component.html',
  styleUrls: ['./client-history.component.scss']
})
export class ClientHistoryComponent implements OnInit {
  constructor(private clientService: ClientService) { }
  TeamLeaderId: string = "";
  ClientNationalId: string = "";
  ClientName: string = "";
  SalesId: string = "";
  StartDate: Date = new Date();
  EndDate: Date = new Date();
  Page: number = 1
  PageSize: number = 10
  IsSortingAscending!: boolean
  Take!: number
  Skip!: number
  OrderByDirection!: string
  ngOnInit(): void {
    this.getClientHistory();
  }

  getClientHistory() {
    const queryString = `?TeamLeaderId=${this.TeamLeaderId}&ClientNationalId=${this.ClientNationalId}&ClientName=${this.ClientName}&SalesId=${this.SalesId}&StartDate=${this.StartDate.toISOString()}&EndDate=${this.EndDate.toISOString()}&Page=${this.Page}&PageSize=${this.PageSize}&IsSortingAscending=${this.IsSortingAscending}&Take=${this.Take}&Skip=${this.Skip}&OrderByDirection=${this.OrderByDirection}`;

    this.clientService.getAllClients(queryString).subscribe({
      next: (response) => {
        console.log(response);
      }
    })
  }

}
