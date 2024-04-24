import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment';
import { ManagerInfo } from '../models/managerInfo';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {
  baseUrl = environment.baseUrl;
  constructor(private http:HttpClient) { }
  getManagerInfo():Observable<ManagerInfo>
  {
    return this.http.get<ManagerInfo>(`${this.baseUrl}Manager/Info`);
  }
}
