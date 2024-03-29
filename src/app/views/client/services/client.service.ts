import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  baseUrl = environment.baseUrl;
  currentUrl = "Client";
  constructor(private httpClient: HttpClient) { }

  getAllClients(queryURL: string): Observable<any> {
    return this.httpClient.get(`${this.baseUrl + this.currentUrl + queryURL}`)
  }
  addClient(body: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl + this.currentUrl}`, body)
  }
  updateClient(clientId: string, body: any): Observable<any> {
    return this.httpClient.put(`${this.baseUrl + this.currentUrl}?id=${clientId}`, body)
  }

  getClientById(clientId: string) {
    return this.httpClient.get(`${this.baseUrl + this.currentUrl}/${clientId}`)
  }

  deleteClient(clientId: string) {
    return this.httpClient.delete(`${this.baseUrl + this.currentUrl}/${clientId}`)
  }
  assignClientToRetention(clientId: string, retentionId: string) {
    return this.httpClient.put(`${this.baseUrl + this.currentUrl + '/' + clientId + '/Retention/' + retentionId}`, {})
  }
}
