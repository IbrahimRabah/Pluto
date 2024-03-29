import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root'
})
export class RetentionService {


  baseUrl = environment.baseUrl;
  currentUrl = "Retention";
  constructor(private httpClient: HttpClient) { }

  getAllRetention(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl + this.currentUrl}/SelectList`)
  }

}
