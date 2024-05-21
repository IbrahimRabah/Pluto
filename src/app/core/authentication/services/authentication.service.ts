import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environment';
import { jwtDecode } from 'jwt-decode';
import { LoginResponse, PasswordChange, UserLogin, UserRegister } from '../../models/user';
import { UserInfo } from '../../models/managerInfo';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  baseUrl = environment.baseUrl;
  currentUrl = "Account/";
  public isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private isAdminSubject = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient, private router: Router) { }
  get isAuthenticated$(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }
  get isAdmin$(): Observable<boolean> {
    return this.isAdminSubject.asObservable();
  }
  register(registerObj: UserRegister): Observable<UserRegister> {
    const url = `${this.baseUrl + this.currentUrl}Register`
    return this.http.post<UserRegister>(url, registerObj);
  }
  login(loginObj: UserLogin): Observable<LoginResponse> {
    const url = `${this.baseUrl + this.currentUrl}Login`;
    return this.http.post(url, loginObj).pipe(
      tap((response: any) => {
        if (response.isSuccess)
          this.isAuthenticatedSubject.next(true);
      })
    );
  }
  logout() {
    localStorage.clear();
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(["/auth/login"])
  }
  isAuthenticatedUser() {
    const token = localStorage.getItem('userData');
    this.isAuthenticatedSubject.next(!!token);
  }

  getToken() {
    const userData = localStorage.getItem('userData');
    const token = userData ? JSON.parse(userData).token : '';
    return token;
  }
  getUserRole() {
    const userData = localStorage.getItem('userData');
    const role = userData ? JSON.parse(userData).role : '';
    return role;
  }
  isTokenExpired(token: string): boolean {
    if (!token) {
      return true;
    }
    const decodedToken: any = jwtDecode(token);
    if (!decodedToken || !decodedToken.exp) {
      return true;
    }
    const expirationTime = decodedToken.exp;
    const now = new Date().getTime() / 1000;
    return expirationTime < now;
  }
  getUserId(): string {
    let token = this.getToken();
    let userId;
    if (token) {
      let decodedToken: any = jwtDecode(token);
      userId = decodedToken.userId;
    }
    return userId;
  }
  getUserInfo():Observable<UserInfo>
  {
    let userId = this.getUserId();
    return this.http.get<UserInfo>(`${this.baseUrl+'Account/GetUserInfo?userId='+userId}`);
  }
  updateUserInfo(userId:string,data:UserInfo):Observable<any>
  {
    return this.http.put<any>(`${this.baseUrl+'Account/UpdateUserInfo?userId='+userId}`,data);
  }
  updateUserPassword(userId:string,data:PasswordChange):Observable<any>
  {
    return this.http.put<PasswordChange>(`${this.baseUrl+'Account/ChangeUserPassword?userId='+userId}`,data);
  }
}
