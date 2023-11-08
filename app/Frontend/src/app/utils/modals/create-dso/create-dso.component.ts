import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProsummerRegisterParams } from 'src/app/models/RegisterParams';
import { DashboardService } from 'src/app/services/dso/dashboard.service';
import { ValidationService } from 'src/app/services/validation/validation.service';
import { Global } from 'src/app/utils/global/IGlobal';
import * as L from 'leaflet';

@Component({
  selector: 'app-create-dso',
  templateUrl: './create-dso.component.html',
  styleUrls: ['./create-dso.component.css']
})
export class CreateDsoComponent {
  @Input() data!: any
  @Input() close!: Function
  map!: L.Map;
  marker!: L.Marker;
  address: string = '';
  city: string = '';
  county: string = '';
  street: string = '';
  lat: number = -1;
  lng: number = -1;
  glob = Global.modalHeader = "Create Dso"
  
constructor(
    private formBuilder: FormBuilder,
    private dsoService: DashboardService,
    private toastr: ToastrService,
    private cdref: ChangeDetectorRef,
    
  ) {}

  createDso= this.formBuilder.group({
    firstName: '',
    lastName: '',
    email: ['', [Validators.required, Validators.email]],
    password: ''
  })


  submit() {
    const params = {
        firstName: this.capitalize(this.createDso.value.firstName!),
        lastName: this.capitalize(this.createDso.value.lastName!),
        email: this.createDso.value.email!,
        password: this.createDso.value.password!,
        jmbg: '',
        brLk: '',
        admin: true,
        adminPass: 'ziza123'
    }

    if (ValidationService.isEmptyString(params.firstName)) {
      this.toastr.error("Please enter first name", "Error")
      return
    }

    if (ValidationService.isEmptyString(params.lastName)) {
      this.toastr.error("Please enter last name", "Error")
      return
    }

    if (ValidationService.isEmailFormatIncorrect(params.email)) {
      this.toastr.error("Wrong email format", "Error")
      return
    }

    if (ValidationService.isEmptyString(params.password)) {
      this.toastr.error("Please enter password", "Error")
      return
    }

    this.dsoService.verifyEmail(params.email).subscribe(result=>{
      if(!result){
        this.toastr.error('You have entered an incorrect email', 'Error');
        return;
      }
    })


    this.dsoService.registerDispatcher(params).subscribe(response => {
      //this.close();
      this.toastr.success("Success dispatcher registration","Success")
      this.dsoService.sendEmail(params.email);
    }, (error) => this.toastr.error("Something went wrong with server request"))
  }

  capitalize(str: string) {
    return str.charAt(0).toLocaleUpperCase() + str.substring(1);
  }
}
