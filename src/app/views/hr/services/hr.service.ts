import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Interviewee } from 'src/app/core/models/interviewee';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root'
})
export class HrService {
  baseUrl = environment.baseUrl;
  constructor(private http:HttpClient) { }
  addNewInterviewee(interviewee:Interviewee):Observable<Interviewee>
  {
    return this.http.post<Interviewee>(`${this.baseUrl}Interviewee`,interviewee);
  }
  getAllInterviewee(queryURL:string):Observable<Interviewee[]>
  {
    return this.http.get<Interviewee[]>(`${this.baseUrl}Interviewee?`+queryURL);
  }
  assignIntervieweeToLeader(query:string):Observable<any>
  {
    return this.http.put<any>(`${this.baseUrl}Interviewee/${query}`,{})
  }
}
