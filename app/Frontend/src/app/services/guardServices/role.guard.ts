import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { RoleEnum } from 'src/app/models/RoleEnum';
import { AESencryptorService } from 'src/app/utils/encryptor/aesencryptor.service';
import { RoleRedirect } from 'src/app/utils/global/IGlobal';
import { AuthService } from '../authService/auth.service';

export class RoleGuard {
  static forRoles(...roles: number[]) {

    const roleTemp: String[] = []
    roles.forEach(role => {
      roleTemp.push(RoleEnum[role])
    })

    @Injectable({
      providedIn: 'root'
    })
    class RoleCheck implements CanActivate {

      constructor(
        private router: Router
      ) {}

      canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        if(!sessionStorage.getItem("role")) {
          this.router.navigate([''])
          return false
        }

        const userRole = AESencryptorService.decriptyString(sessionStorage.getItem("role")!)
        if(!roleTemp.includes(userRole)) {
          var userConvertedRole: number
          if(userRole == RoleEnum[RoleEnum.Admin]) {
            userConvertedRole = RoleEnum.Admin
          }else if(userRole == RoleEnum[RoleEnum.Prosummer]) {
            userConvertedRole = RoleEnum.Prosummer
          } else {
            this.router.navigate(['login'])
            return false
          }
          this.router.navigate([RoleRedirect.redirectTo(userConvertedRole!, "home")])
          return false
        }
        return true
      }


    }
    return RoleCheck
  }
  
  static rolesRederectTo(page: string, ...roles: number[]) {

    const roleTemp: String[] = []
    roles.forEach(role => {
      roleTemp.push(RoleEnum[role])
    })
    const roleTo: RoleEnum[] = []
    roles.forEach(role => {
      roleTo.push(role)
    })

    @Injectable({
      providedIn: 'root'
    })
    class RoleCheck implements CanActivate {

      

      constructor(
        private router: Router
      ) {}

      canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        if(!sessionStorage.getItem("role")) {
          this.router.navigate(['login'])
          return false
        }
        
        const userRole = AESencryptorService.decriptyString(sessionStorage.getItem("role")!)
        if(roleTemp.includes(userRole)) {
          var userConvertedRole: number
          if(userRole == RoleEnum[RoleEnum.Admin]) {
            userConvertedRole = RoleEnum.Admin
          }else if(userRole == RoleEnum[RoleEnum.Prosummer]) {
            userConvertedRole = RoleEnum.Prosummer
          } else {
            this.router.navigate(['login'])
          }
          this.router.navigate([RoleRedirect.redirectTo(userConvertedRole!, page) != null ? RoleRedirect.redirectTo(userConvertedRole!, page) : "login"])
          return true
        } else {
          this.router.navigate(['login'])
          return false
        }
      }
    }
    return RoleCheck
  }

  static wichRoleIsUser() {
    if(sessionStorage.getItem("role")){
      const role = AESencryptorService.decriptyString(sessionStorage.getItem("role")!)
      const isProssumer: boolean = role == RoleEnum[RoleEnum.Prosummer] ? true : false
      const isAdmin: boolean = role == RoleEnum[RoleEnum.Admin] ? true : false
      return { isAdmin, isProssumer}
    }
    return {isAdmin: false, isProssumer: false}
  }
  
}
