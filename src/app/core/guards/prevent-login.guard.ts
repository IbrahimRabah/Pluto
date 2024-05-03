import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../authentication/services/authentication.service';
@Injectable({
  providedIn: 'root'
})
export class preventLoginGuard implements CanActivate {
  constructor(private Auth:AuthenticationService,private route:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    if(this.Auth.isAuthenticatedSubject.getValue() !=null){
      return false;
    }
    else{
      this.route.navigate(['**']);
      return true;
    }
      return true;
  }  
}
