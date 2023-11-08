import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { AuthService } from '../authService/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private jwtHelper = new JwtHelperService();

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  private tokenValidation(): boolean {
    var isAuthenticated = this.authService.getAuthStatus()
    if(!isAuthenticated) {
      this.router.navigate(['login']);
      return false
    }
    
    // this.authService.isTokenValid().forEach(response => {
    //     if(!response.isValid) {
    //       this.router.navigate(['login']);
    //     }
    //   })
  
    if(this.jwtHelper.isTokenExpired(sessionStorage.getItem("token"))) {
      this.router.navigate(['login']);
      return false
    }
    return isAuthenticated
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  
    return this.tokenValidation();

  }
  
}
