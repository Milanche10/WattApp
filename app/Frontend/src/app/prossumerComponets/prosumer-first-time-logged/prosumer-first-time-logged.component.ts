import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProsummerFirstTime } from 'src/app/models/Prosummer';
import { RoleEnum } from 'src/app/models/RoleEnum';
import { DashboardService } from 'src/app/services/dso/dashboard.service';
import { NavBarService } from 'src/app/services/navBarService/nav-bar.service';
import { UserService } from 'src/app/services/user/user.service';
import { ValidationService } from 'src/app/services/validation/validation.service';
import { Global, RoleRedirect } from 'src/app/utils/global/IGlobal';

@Component({
  selector: 'app-prosumer-first-time-logged',
  templateUrl: './prosumer-first-time-logged.component.html',
  styleUrls: ['./prosumer-first-time-logged.component.css']
})
export class ProsumerFirstTimeLoggedComponent {
  newUser = this.formBuilder.group({
    password: '',
    confirmPassword: '',
    jmbg: ['', [Validators.required, ValidationService.jmbgValidator()]],
    brlk: ['', [Validators.required, ValidationService.idNumberValidator()]]
  })

  password: string = "";
  conPass: string = "";

  global = Global;

  confirmedPass: boolean = false

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService,
    private navServie: NavBarService,
    private router: Router
  ) {
    this.navServie.hide()
  }

  submit() {
    const param: ProsummerFirstTime = {
      id: sessionStorage.getItem("user")!,
      password: this.password,
      brlk: this.newUser.value.brlk ? this.newUser.value.brlk.toString() : '',
      jbmg: this.newUser.value.jmbg ? this.newUser.value.jmbg.toString() : ''
    }

    if(ValidationService.isEmptyString(param.brlk)) {
      this.toastr.error("Please enter ID number","Error")
      return
    }

    if(ValidationService.isEmptyString(param.jbmg)) {
      this.toastr.error("Please confirm JMBG","Error")
      return
    }
    const jmbgValidation = ValidationService.jmbgValidator()(this.newUser.controls['jmbg']);
    if (jmbgValidation) {
      this.toastr.error('Invalid JMBG', 'Error');
      return;
    }

    const idNumberValidation = ValidationService.idNumberValidator()(this.newUser.controls['brlk']);
    if (idNumberValidation) {
      this.toastr.error('Invalid ID Number', 'Error');
      return;
    }

    this.userService.firstTimeProsummer(param).subscribe(response => {
      this.navServie.show()
      this.router.navigate([RoleRedirect.redirectTo(RoleEnum.Prosummer,"home")])
    })

  }

  setPassword(event: any) {
    this.password = event.target.value
  }

  setConPassowrd(event:any) {
    this.conPass = event.target.value
  }

  confirmPassword() {
    if(ValidationService.isEmptyString(this.password)) {
      this.toastr.error("Please enter password","Error")
      return
    }

    if(ValidationService.isEmptyString(this.conPass)) {
      this.toastr.error("Please confirm password","Error")
      return
    }

    if(this.password != this.conPass) {
      this.toastr.error("Password doesn't match","Error")
      return
    }

    this.confirmedPass = true
    this.newUser.get('password')?.disable()
    this.newUser.get('confirmPassword')?.disable()
  }
}
