import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  baseUrl = environment.baseUrl;
  currentUrl = "Sales";
  constructor(private httpClient: HttpClient) { }

  getAllSales(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl + this.currentUrl}/SelectList`)
  }
  changeAllTeamLeaders(oldTeamLeader: string, newTeamLeader: string) {
    return this.httpClient.put(`${this.baseUrl + this.currentUrl + '/Bulk/CurrentTeamLeader/' + oldTeamLeader + '/NewTeamLeader/' + newTeamLeader}`, {})
  }

}
