import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DsoAdminDashboardComponent } from 'src/app/dsoComponets/dso-admin-dashboard/dso-admin-dashboard.component';
import { ProsummerRegisterParams } from 'src/app/models/RegisterParams';
import { DashboardService } from 'src/app/services/dso/dashboard.service';
import { ValidationService } from 'src/app/services/validation/validation.service';
import { Global } from 'src/app/utils/global/IGlobal';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
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
  glob = Global.modalHeader = "Create New Prosummer"


  createProsummer = this.formBuilder.group({
    firstName: '',
    lastName: '',
    estate: '',
    email: ['', [Validators.required, Validators.email]],
  })


  constructor(
    private formBuilder: FormBuilder,
    private dsoService: DashboardService,
    private toastr: ToastrService,
    private cdref: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.initMap();
  }

  initMap() {
    this.map = L.map('map-prosumer').setView([44.01667, 20.911423], 17);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
      maxZoom: 18
    }).addTo(this.map);

    // When map is clicked on, marker appears and address is entered in input
    this.map.on('click', (event: L.LeafletMouseEvent) => {
      const { lat, lng } = event.latlng;
      this.addMarker(lat, lng);
      this.readAddressFromMap(lat, lng);
    });
  }

  readAddressFromMap(lat: number, lng: number) {
    const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`;

    fetch(url)
      .then(response => response.json())
      .then((data: any) => {
        if (data && data.address) {
          const address = data.address
          // console.log(address);
          this.address = ''
          if(address.house_number) {
            this.address += address.house_number + " "
          }
          if(address.road) {
            this.address += address.road + " "
          }
          if(address.city_district) {
            this.address += address.city_district + " "
          }

          this.street = address.road;
          this.county = address.county;
          this.city = address.city_district;
          this.lat = lat
          this.lng = lng;
        }
      })
      .catch((error: any) => {
        console.error('Reverse geocoding error:', error);
      });
  }

  geocodeAddress(): void {
    const encodedAddress = encodeURIComponent(this.address);
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodedAddress}`;

    fetch(url)
      .then(response => response.json())
      .then((data: any) => {
        if (data && data.length > 0) {
          const result = data[0];
          const lat = parseFloat(result.lat);
          const lng = parseFloat(result.lon);
          this.addMarker(lat, lng);
          this.readAddressFromMap(lat, lng);
        }
      })
      .catch((error: any) => {
        console.error('Forward geocoding error:', error);
      });
  }

  addMarker(lat: number, lng: number) {
    if (this.marker) {
      this.map.removeLayer(this.marker);
    }

    this.marker = L.marker([lat, lng]).addTo(this.map);
    this.map.setView([lat, lng], 17);
  }


  submit() {
    const params: ProsummerRegisterParams = {
      firstName: this.capitalize(this.createProsummer.value.firstName!),
      lastName: this.capitalize(this.createProsummer.value.lastName!),
      email: this.createProsummer.value.email!,
      address: this.street,
      city: this.city,
      county: this.county,
      lat: this.lat,
      lon: this.lng,
      type: this.createProsummer.value.estate!
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

    if (ValidationService.isEmptyString(params.type)) {
      this.toastr.error("Please choose estate", "Error")
      return
    }

    if (ValidationService.isEmptyString(params.address)
    || ValidationService.isEmptyString(params.city)
    || ValidationService.isEmptyString(params.county)
    || params.lat == -1 || params.lon == -1) {
      this.toastr.error("Please enter address", "Error")
      return
    }

    this.dsoService.verifyEmail(params.email).subscribe(result=>{
      console.log("Email verifikacije "+ result)
      if(!result){
        this.toastr.error('You have entered an incorrect email', 'Error');
        return;
      }
    })


    this.dsoService.registerProsummer(params).subscribe(response => {
      Global.DsoDashboardNumberOfPages = Array(Math.ceil(response.numberOfPages / Global.maxProsummersPerPage)).fill(1).map((x,i)=>i+1);
      //this.close();
      this.toastr.success("Success prosummer registration","Success")
      this.dsoService.sendEmail(params.email);

    }, (error) => this.toastr.error("Something went wrong with server request"))
  }

  capitalize(str: string) {
    return str.charAt(0).toLocaleUpperCase() + str.substring(1);
  }
}
