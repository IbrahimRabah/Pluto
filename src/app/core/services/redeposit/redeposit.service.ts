import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root'
})
export class RedepositService {
  baseUrl = environment.baseUrl;
  currentUrl = "Deposit";
  constructor(private httpClient: HttpClient) { }

  reDeposit(body: any) {
    this.httpClient.post(`${this.baseUrl + this.currentUrl}`, body);
  }

  updateReDeposit(redepositId: any, body: any) {
    this.httpClient.put(`${this.baseUrl + this.currentUrl}/${redepositId}`, body);
  }

}
