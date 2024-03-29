import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientLotService {

  baseUrl = environment.baseUrl;
  currentUrl = "ClientLot";

  constructor(private httpClient: HttpClient) { }


  getClientLostByClient(clientId: string): Observable<any> {
    return this.httpClient.get(`${this.baseUrl + this.currentUrl}/${clientId}`)

  }
  addClientLot(body: any) {
    return this.httpClient.post(`${this.baseUrl + this.currentUrl}`, body)

  }

  updateClientLot(clientId: any, body: any) {
    return this.httpClient.put(`${this.baseUrl + this.currentUrl}/${clientId}`, body)

  }

  deleteClientLot(clientId: any) {
    return this.httpClient.get(`${this.baseUrl + this.currentUrl}/${clientId}`)

  }
}
