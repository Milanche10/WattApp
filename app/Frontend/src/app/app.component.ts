import { Component, OnInit } from '@angular/core';
import { User } from './models/User';
import { DashboardService } from './services/dso/dashboard.service';
import { RoleGuard } from './services/guardServices/role.guard';
import { UserService } from './services/user/user.service';
import { AESencryptorService } from './utils/encryptor/aesencryptor.service';
import { Global } from './utils/global/IGlobal';
import { ProsummerRegisterParams, RegisterParams } from './models/RegisterParams';
import { AuthService } from './services/authService/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Envio';
  private glob = Global

  createProsummerTest = {
    firstName: 'test',
    lastName: 'test',
    estate: 'house',
    email: 'test@gmail.com',
    address: 'Radoje Domanovica br.1',
    city: 'Kragujevac',
    county: 'Pomoravski okrug',
    lat: 44.019974,
    lon: 20.909614,
  }
  createProsummerDemo = {
    firstName: 'demo',
    lastName: 'demo',
    estate: 'house',
    email: 'demo@gmail.com',
    address: 'Radoje Domanovica br.2',
    city: 'Kragujevac',
    county: 'Pomoravski okrug',
    lat: 44.0198,
    lon: 20.9095,
  }

  constructor (
    private userService: UserService,
    private dsoDashboardService: DashboardService,
    private authService: AuthService
    ) {

  }
  ngOnInit(): void {
    this.registerTestProsummers();
    this.registerTestAdmin();
    this.glob.isAdmin = RoleGuard.wichRoleIsUser().isAdmin
    this.glob.isProssumer = RoleGuard.wichRoleIsUser().isProssumer
    if(sessionStorage.getItem("user"))
    {
      this.userService.getUserBy(
        AESencryptorService.decriptyString(
          sessionStorage.getItem("user")!)
        ).subscribe(
          (response: User) => {
            this.glob.user = response;
          }
        )
    }
    setInterval(() => {
      this.dsoDashboardService.movePredictionToRecords();
    }, 60 * 1000);
  }

  registerTestProsummers() : void{
    const params: ProsummerRegisterParams = {
      firstName: this.createProsummerTest.firstName!,
      lastName: this.createProsummerTest.lastName!,
      email: this.createProsummerTest.email!,
      address: this.createProsummerTest.address!,
      city: this.createProsummerTest.city!,
      county: this.createProsummerTest.county!,
      lat: this.createProsummerTest.lat!,
      lon: this.createProsummerTest.lon!,
      type: this.createProsummerTest.estate!
    }
    const params2: ProsummerRegisterParams = {
      firstName: this.createProsummerDemo.firstName!,
      lastName: this.createProsummerDemo.lastName!,
      email: this.createProsummerDemo.email!,
      address: this.createProsummerDemo.address!,
      city: this.createProsummerDemo.city!,
      county: this.createProsummerDemo.county!,
      lat: this.createProsummerDemo.lat!,
      lon: this.createProsummerDemo.lon!,
      type: this.createProsummerDemo.estate!
    }
    // console.log(params);
    /*
    this.dsoDashboardService.doesUserExists(params.email).subscribe(result=>{
      if(result == false){
        this.dsoDashboardService.initRegisterProsummer(params).subscribe(response => {
        });
      }
    })
    this.dsoDashboardService.doesUserExists(params2.email).subscribe(result=>{
      if(result == false){
        this.dsoDashboardService.initRegisterProsummer(params2).subscribe(response => {
        });
      }
    })
    */
  }
  registerTestAdmin() : void{
    const paramsAdmin: RegisterParams = {
      firstName: "admin",
      lastName: "admin",
      email: "admin@gmail.com",
      password: "admin",
      admin: true,
      jbmg: "",
      brlk: "",
      adminPass: "ziza123"
    }
    this.dsoDashboardService.doesUserExists(paramsAdmin.email).subscribe(result=>{
      if(result == false){
        this.authService.initRegister(paramsAdmin).subscribe(response=>{
        });
      }
    })

  }
}
