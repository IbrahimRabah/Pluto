import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MemberResponse } from 'src/app/core/models/Sales.model';
import { statisticsResponse } from 'src/app/core/models/statistics';
import { environment } from 'src/environment';
@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }
  getAdminStatistics():Observable<statisticsResponse>{
    return this.http.get<statisticsResponse>(`${this.baseUrl + 'Dashboard/admin/statistics'}`);
  }
  getManagerStatistics():Observable<statisticsResponse>{
    return this.http.get<statisticsResponse>(`${this.baseUrl + 'Dashboard/manager/statistics'}`);
  }
  getAllTeamLeaders(query: string ):Observable<MemberResponse[]>{
    return this.http.get<MemberResponse[]>(`${this.baseUrl +'TeamLeader?'+query}`);
  }
  getAllSellers(query:string):Observable<MemberResponse>
  {
    return this.http.get<MemberResponse>(`${this.baseUrl +'Sales?'+query}`);
  }
  getAllClients(query: string ):Observable<MemberResponse[]>{
    return this.http.get<MemberResponse[]>(`${this.baseUrl +'Client?'+query}`);
  }
  getAllRetentions(query:string):Observable<any>
  {
    return this.http.get<any>(`${this.baseUrl +'Retention?'+query}`);
  }
  getAllHrs(query: string ):Observable<any[]>{
    return this.http.get<any[]>(`${this.baseUrl +'Hr?'+query}`);
  }
  getAllInterviewees(query:string):Observable<any>
  {
    return this.http.get<any>(`${this.baseUrl +'Interviewee?'+query}`);
  }
  changeIntervieweeHr(query:string):Observable<any>
  {
    return this.http.put<any>(`${this.baseUrl}Interviewee/${query}`,{})
  }


};
