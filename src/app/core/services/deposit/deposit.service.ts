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

  addDepositForClient(body: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl + this.currentUrl}`, body)
  }
}
