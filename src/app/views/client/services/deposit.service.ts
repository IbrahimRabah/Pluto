import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root'
})
export class DepositService {

  baseUrl = environment.baseUrl;
  currentUrl = "Deposit";
  constructor(private httpClient: HttpClient) { }

  getDepositById(clientId: string): Observable<any> {
    return this.httpClient.get(`${this.baseUrl + this.currentUrl}/${clientId}`)
  }
  addDeposit(body: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl + this.currentUrl}`, body)
  }
  updateDeposit(clientId: string, body: any): Observable<any> {
    return this.httpClient.put(`${this.baseUrl + this.currentUrl}/${clientId}`, body)
  }

  deActivateClient(clientId: string) {
    return this.httpClient.get(`${this.baseUrl + this.currentUrl}/${clientId}`)
  }

  deleteClient(clientId: string) {
    return this.httpClient.delete(`${this.baseUrl + this.currentUrl}/${clientId}`)
  }
}
