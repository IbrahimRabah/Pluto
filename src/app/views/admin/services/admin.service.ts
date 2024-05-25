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
  deleteTeamLeader(leaderId:string):Observable<any>
  {
    const currentUrl = this.baseUrl + `TeamLeader/${leaderId}`;
    return this.http.delete(currentUrl);
  }
  deleteSellerById(sellerId:string):Observable<any>
  {
    const currentUrl = this.baseUrl + `Sales/${sellerId}`;
    return this.http.delete(currentUrl);
  }
  deleteIntervieweeById(intervieweeId:string):Observable<any>
  {
    const currentUrl = this.baseUrl + `Interviewee/${intervieweeId}`;
    return this.http.delete(currentUrl);
  }
  deleteClientById(clientId:string):Observable<any>
  {
    const currentUrl = this.baseUrl + `Client/${clientId}`;
    return this.http.delete(currentUrl);
  }
  deleteRetentionById(retentionId:string):Observable<any>
  {
    const currentUrl = this.baseUrl + `Retention/${retentionId}`;
    return this.http.delete(currentUrl);
  }
  deleteHrById(hrId:string):Observable<any>
  {
    const currentUrl = this.baseUrl + `Hr/${hrId}`;
    return this.http.delete(currentUrl);
  }
  changeClientTeamleader(clientId:string,newTeamleaderId:string):Observable<any>
  {
    let currentUrl = this.baseUrl +`Client/${clientId}/TeamLeader/${newTeamleaderId}`
    return this.http.put(currentUrl,{})
  }
  changeClientRetention(clientId:string,newRetentionId:string):Observable<any>
  {
    let currentUrl = this.baseUrl +`Client/${clientId}/Retention/${newRetentionId}`
    return this.http.put(currentUrl,{})
  }
  changeSellerTeamleader(salesId:string,newTeamleaderId:string):Observable<any>
  {
    let currentUrl = this.baseUrl +`sales/${salesId}/TeamLeader/${newTeamleaderId}`
    return this.http.put(currentUrl,{})
  }
  changeAllHr(CurrentHr:string,NewHr:string):Observable<any>
  {
    let currentUrl = this.baseUrl +`Interviewee/Bulk/CurrentHr/${CurrentHr}/NewHr/${NewHr}`
    return this.http.put(currentUrl,{})
  }

  changeAllInterviewee(CurrentSuperior:string,NewSuperior:string):Observable<any>
  {
    let currentUrl = this.baseUrl +`Interviewee/Bulk/CurrentSuperior/${CurrentSuperior}/NewSuperior/${NewSuperior}`
    return this.http.put(currentUrl,{})
  }
  
  changeTeamLeadSuperior(Interviewee:string,Superior:string){
    //Interviewee/q/Superior/q'
    let currentUrl = this.baseUrl +`Interviewee/${Interviewee}/Superior/${Superior}`
    return this.http.put(currentUrl,{})
  }

};
