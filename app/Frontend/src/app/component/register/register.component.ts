import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/authService/auth.service';
import { RegisterParams } from 'src/app/models/RegisterParams';
import { ToastrService } from 'ngx-toastr';
import { ValidationService } from 'src/app/services/validation/validation.service';
import { NavBarService } from 'src/app/services/navBarService/nav-bar.service';

import { MatProgressSpinner } from '@angular/material/progress-spinner';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers:[MatProgressSpinner]
})
export class RegisterComponent {

  showSpinner=false;

  isUserAdmin: boolean = false

  registerForm = this.formBuilder.group({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    admin: this.formBuilder.control(false, [Validators.requiredTrue]),
    jbmg: '',
    brlk: '',
    adminPass: ''
  })

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private navService: NavBarService
  ) {
    this.navService.hide()
  }

  submit() {
    this.showSpinner=true;
    const params: RegisterParams = Boolean(this.registerForm.value.admin!) ? 
    {
        firstName: this.registerForm.value.firstName!,
        lastName: this.registerForm.value.lastName!,
        email: this.registerForm.value.email!,
        password: this.registerForm.value.password!,
        admin: true,
        jbmg: "",
        brlk: "",
        adminPass: this.registerForm.value.adminPass!
    } :
    {
      firstName: this.registerForm.value.firstName!,
      lastName: this.registerForm.value.lastName!,
      email: this.registerForm.value.email!,
      password: this.registerForm.value.password!,
      admin: false,
      jbmg: this.registerForm.value.jbmg!,
      brlk: this.registerForm.value.brlk!,
      adminPass: ""
    }
    

    if (ValidationService.isEmptyString(params.email)) {
      this.showSpinner=false;
      this.toastr.error("Please enter email", "Error")
      return
    }

    if (ValidationService.isEmptyString(params.firstName)) {
      this.showSpinner=false;
      this.toastr.error("Please enter first name", "Error")
      return
    }

    if (ValidationService.isEmptyString(params.lastName)) {
      this.showSpinner=false;
      this.toastr.error("Please enter last name", "Error")
      return
    }

    if (ValidationService.isEmailFormatIncorrect(params.email)) {
      this.showSpinner=false;
      this.toastr.error("Wrong email format", "Error")
      return
    }

    if (ValidationService.isEmptyString(params.password)) {
      this.showSpinner=false;
      this.toastr.error("Pleaste enter password", "Error")
      return
    }

    if(params.admin) {
      if(ValidationService.isEmptyString(params.adminPass))
      {
        this.showSpinner=false;
        this.toastr.error("Pleaste enter Admin password", "Error")
        return
      }
    } else {
      if(ValidationService.isEmptyString(params.jbmg))
      {
        this.showSpinner=false;
        this.toastr.error("Pleaste enter JMBG", "Error")
        return
      }

      if(ValidationService.isEmptyString(params.brlk))
      {
        this.showSpinner=false;
        this.toastr.error("Pleaste enter BRLK", "Error")
        return
      }
    }

    this.authService.register(params).subscribe(response => {
      this.navService.show()
    }, errorResponse => {
      this.showSpinner=false;
      this.toastr.error("Something went wrong with server connection!", "Error")
    })
  }

  adminUser(event: any) {
    this.isUserAdmin = event.currentTarget.checked
  }
}
