import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../authentication/services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class authGuard implements CanActivate {
  constructor(private auth: AuthenticationService, private router: Router) { }
canActivate(
  next:ActivatedRouteSnapshot,
  state:RouterStateSnapshot
): boolean {
    const userToken = this.auth.getToken();
    const isExpired = this.auth.isTokenExpired(userToken);
    const roles = next.data['roles'] as Array<string>;
    const userRole = this.auth.getUserRole();
    let logged;
    this.auth.isAuthenticatedUser();
    this.auth.isAuthenticated$.subscribe((res)=>{
      logged = res
    })
    if (logged && !isExpired && userRole && roles.includes(userRole) ) {
      return true;
    }
    else{
      this.router.navigate(['/notfound']);
      return false
    }

  }

}
