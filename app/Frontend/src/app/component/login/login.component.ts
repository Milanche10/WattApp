import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/authService/auth.service';
import { LoginParams } from 'src/app/models/LoginParams';
import { ToastrService } from 'ngx-toastr';
import { ValidationService } from 'src/app/services/validation/validation.service';
import { NavBarService } from 'src/app/services/navBarService/nav-bar.service';

import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { FactoryTarget } from '@angular/compiler';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[MatProgressSpinner]
})
export class LoginComponent {

  showSpinner=false;

  loginForm = this.formBuilder.group({
    email: '',
    password: ''
  })

  constructor (
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private navService: NavBarService,
    private spinner: MatProgressSpinner
  ) {
    this.navService.hide()
  }

  submit() {
    this.showSpinner=true;

    const params: LoginParams = {
      email: this.loginForm.value.email!,
      password: this.loginForm.value.password!
    }

    if (ValidationService.isEmptyString(params.email)) {
      this.showSpinner=false;
      this.toastr.error("Please enter email", "Error")
      return
    }

    if (ValidationService.isEmailFormatIncorrect(params.email)) {
      this.showSpinner=false;
      this.toastr.error("Wrong email format", "Error")
      return
    }

    if (ValidationService.isEmptyString(params.password)) {
      this.toastr.error("Pleaste enter password", "Error")
      return
    }

    this.authService.login(params).subscribe(response => {
      this.navService.show()
    }, errorResponse => {
      this.toastr.error("Wrong username or password", "Error")
    }).add(()=>{this.showSpinner=false;});
  }


}
