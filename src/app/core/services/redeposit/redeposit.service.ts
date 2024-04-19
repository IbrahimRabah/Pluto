import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root'
})
export class RedepositService {
  baseUrl = environment.baseUrl;
  currentUrl = "Redeposit";
  constructor(private httpClient: HttpClient) { }

  reDeposit(body: any) {
    return this.httpClient.post(`${this.baseUrl + this.currentUrl}`, body);
  }

  updateReDeposit(redepositId: any, body: any) {
    return this.httpClient.put(`${this.baseUrl + this.currentUrl}/${redepositId}`, body);
  }

}
