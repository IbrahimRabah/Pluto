import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthenticationService } from '../authentication/services/authentication.service';

@Injectable()
export class GlobalErrorInterceptor implements HttpInterceptor {
  constructor(private router:Router,private messageService:MessageService,private authenticationService:AuthenticationService) {}
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error:HttpErrorResponse)=>{
        if (error.status === 500 && this.isExpiredToken()){

          this.messageService.add({ severity: 'error', summary: 'error', detail: 'Server Error Please Login Again' });
          this.authenticationService.logout();
          this.router.navigate(['/auth/login']);
        }
         else if (error.status === 0)
          this.messageService.add({ severity: 'error', summary: 'error', detail:'Connection Error Please Try Again Later'});
         else if (error.status === 400)
          this.messageService.add({ severity: 'error', summary: 'error', detail:error.message})
         else if (error.status === 401){
          this.router.navigate(['/auth/login']);

        }  else
          this.messageService.add({ severity: 'error', summary: 'error', detail:'Something Went Wrong Please Try Again'});
         return throwError(error);
      })
    );
  }
  isExpiredToken():boolean{
    const userToken = this.authenticationService.getToken();
    const isExpired = this.authenticationService.isTokenExpired(userToken);
    return isExpired;
  }
}
