import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment';
@Injectable({
  providedIn: 'root'
})
export class SalesDayService {
  baseUrl = environment.baseUrl;
  currentUrl = "SalesDay";
  constructor(private httpClient: HttpClient) { }

  getSalesDayBy(queryURL: string): Observable<any> {

    return this.httpClient.get(`${this.baseUrl + this.currentUrl}${queryURL}`);
  }
  addSalesDay(salesDay: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl + this.currentUrl}`, salesDay);
  }

  getSalesDayById(salesDayId: string): Observable<any> {
    return this.httpClient.get(`${this.baseUrl + this.currentUrl}/${salesDayId}`);
  }
  updateSalesDay(salesDayId: string, salesDay: any): Observable<any> {
    return this.httpClient.put(`${this.baseUrl + this.currentUrl}/${salesDayId}`, salesDay);
  }

  changeAllTeamLeaders(oldTeamLeader: string, newTeamLeader: string) {
    return this.httpClient.put(`${this.baseUrl  + '/Bulk/CurrentTeamLeader/   ' + oldTeamLeader + '/NewTeamLeader/' + newTeamLeader}`, {})
  }
 
}
