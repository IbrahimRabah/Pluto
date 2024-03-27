import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root'
})
export class TeamLeaderService {
  baseUrl = environment.baseUrl;
  currentUrl = "TeamLeader";
  constructor(private httpClient: HttpClient) { }

  getAllTeamLeaders(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}${this.currentUrl}/SelectList`);
  }
}
