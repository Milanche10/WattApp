import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment/environment';
import { RegisterParams } from 'src/app/models/RegisterParams';
import { Observable, ReplaySubject } from 'rxjs';
import { Token } from 'src/app/models/Token';
import { LoginParams } from 'src/app/models/LoginParams';
import { ValidateToken } from 'src/app/models/ValidateToken';
import { AESencryptorService } from 'src/app/utils/encryptor/aesencryptor.service';
import { Role } from 'src/app/models/Role';
import { RoleEnum } from 'src/app/models/RoleEnum';
import { map } from 'rxjs/operators';
import { ValidationService } from '../validation/validation.service';
import { NavBarService } from '../navBarService/nav-bar.service';
import { Global, RoleRedirect } from 'src/app/utils/global/IGlobal';
import { Router } from '@angular/router';
import { UserService } from '../user/user.service';
import { User } from 'src/app/models/User';
import { DashboardService } from '../dso/dashboard.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl: string
  private currentUserSource = new ReplaySubject<any>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(
    private httpClient: HttpClient,
    private navService: NavBarService,
    private router: Router,
    private userService: UserService,
    private dsoDashboardService: DashboardService,
    private toastr: ToastrService
  ) {
    this.baseUrl = environment.apiUrl
  }

  register(params: RegisterParams) {
    return this.httpClient.post<Token>(this.baseUrl+"/auth/registration", params).pipe(map(responseUser=>{
      if (!ValidationService.isEmptyString(responseUser.token)) {
        sessionStorage.setItem("user", responseUser.user)
        sessionStorage.setItem("token", responseUser.token)
        var userId = AESencryptorService.decriptyString(responseUser.user)
        this.getUserRole(parseInt(userId)).subscribe(response => {
          sessionStorage.setItem("role", AESencryptorService.encriptyString(RoleEnum[response.role]))
          const role = response.role
          this.navService.show()
          Global.isAdmin = role == RoleEnum.Admin
          Global.isProssumer = role == RoleEnum.Prosummer
          this.currentUserSource.next(responseUser.user)
          this.userService.getUserBy(
            AESencryptorService.decriptyString(
              sessionStorage.getItem("user")!)
            ).subscribe(
              (response: User) => {
                Global.user = response;
              }
            )
          this.router.navigate([RoleRedirect.redirectToHome(role) != null ? RoleRedirect.redirectToHome(role) : ''])
        })
      }
    }))
  }
  initRegister(params: RegisterParams) {
    return this.httpClient.post<Token>(this.baseUrl+"/auth/registration", params);
  }
  login(params: LoginParams) {
    return this.httpClient.post<Token>(this.baseUrl+"/auth/login", params).pipe(map(responseUser=>{
      if (!ValidationService.isEmptyString(responseUser.token)) {
        sessionStorage.setItem("user", responseUser.user)
        sessionStorage.setItem("token", responseUser.token)
        var userId = AESencryptorService.decriptyString(responseUser.user)
        this.getUserRole(parseInt(userId)).subscribe(response => {
          sessionStorage.setItem("role", AESencryptorService.encriptyString(RoleEnum[response.role]))
          const role = response.role
          Global.isAdmin = role == RoleEnum.Admin
          Global.isProssumer = role == RoleEnum.Prosummer
          if(role == 0 && response.isBlock == 1 ) {
            this.toastr.error("This user is blocked","BLOCKED")
            sessionStorage.removeItem("token")
            sessionStorage.removeItem("user")
            sessionStorage.removeItem("role")
            this.currentUserSource.unsubscribe()
            Global.isAdmin=false
            Global.isProssumer=false
            this.navService.hide()
            Global.user = undefined
            this.router.navigate(['login'])
            return
          }
          this.userService.getUserBy(
            AESencryptorService.decriptyString(
              sessionStorage.getItem("user")!)
            ).subscribe(
              (response: User) => {
                Global.user = response;
              }
            )
            this.navService.show()
          this.currentUserSource.next(responseUser.user)
          if(role == 0 && response.isFirstTimeLogged == 0) {
            this.navService.hide()
            this.router.navigate([RoleRedirect.redirectTo(role,"new-User")])
            return
          }
          this.router.navigate([RoleRedirect.redirectToHome(role) != null ? RoleRedirect.redirectToHome(role) : ''])
        })
      }
    })
    )
  }

  isTokenValid(): Observable<ValidateToken> {
    const token: string = sessionStorage.getItem("token")!
    const user: string = sessionStorage.getItem("user")!
    return this.httpClient.post<ValidateToken>(this.baseUrl+"/auth/isTokenValid", {token:token, user: user})
  }

  getAuthStatus(): boolean {
    return sessionStorage.getItem("token") ? true : false;
  }

  getUserRole(userid: number):Observable<Role> {
    const id = AESencryptorService.encriptyNumber(userid);
    return this.httpClient.post<Role>(this.baseUrl+"/auth/userRole",{userId: id})
  }
}
