import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PopupDetails } from 'src/app/models/popup/PopupDetails';
import { environment } from 'src/environment/environment';
import { AESencryptorService } from '../../encryptor/aesencryptor.service';
import { PopupType } from 'src/app/models/popup/PopupType';
import { PopupDeviceData } from 'src/app/models/popup/PopupDeviceData';
import { DeviceService } from 'src/app/services/deviceService/device.service';
import { DashboardService } from 'src/app/services/dso/dashboard.service';
@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent {
  @Input() popupDetails!: PopupDetails
  @Output() deviceDeleted = new EventEmitter<void>();
  @Output() closePopup = new EventEmitter<void>();
  @Output() deviceStatusChanged = new EventEmitter<PopupDeviceData>();
  @Output() dsoVisibilityChanged = new EventEmitter<PopupDeviceData>();
  @Output() dsoManagingChanged = new EventEmitter<PopupDeviceData>();
  @Output() prosummerDeleted=new EventEmitter<void>();

  baseUrl = environment.apiUrl
  confirmButtonEnabled = true;

  constructor(private http: HttpClient, private toastr: ToastrService, private deviceService: DeviceService, private dsoDashboardService:DashboardService) {
  }

  confirm() {
    if(this.confirmButtonEnabled) {
      switch(this.popupDetails.popupType) {
        case PopupType.deleteDevice:
          this.deleteDevice()
          break;
        case PopupType.changeStatus:
          this.changeDeviceStatus()
          break;
        case PopupType.changeDsoVisibility:
          this.changeDsoVisibility()
          break;
        case PopupType.changeDsoManaging:
          this.changeDsoManaging()
          break;
      case PopupType.deleteProsummer:
        this.deleteProsummer()
        break;
      }

      this.confirmButtonEnabled = false;
    }
  }
  
  deleteDevice() {
    this.deviceService.deleteDevice(this.popupDetails.device.id)
      .subscribe(_ => {
        
      }, error => {
        this.toastr.error(`Error occured while trying to delete ${this.popupDetails.device.name}. Please try again.`, "Error")
      }, () => {
        this.toastr.success(`You deleted ${this.popupDetails.device.name} successfully.`, "Success")
        this.deviceDeleted.emit()
        this.closePopup.emit();    
      });
  }

  changeDeviceStatus() {
    const device = this.popupDetails.device;
    const status = device.status ? false : true
    
    this.deviceService.changeDeviceStatus(device)
      .subscribe(response => {
      }, error => {
        this.toastr.error(`Error occured while trying to turn ${status ? "on" : "off"} ${device.name}. Please try again.`, "Error")
      }, () => {
        this.toastr.success(`You turned ${status ? "on" : "off"} ${device.name} successfully.`, "Success")
        const data = new PopupDeviceData();
        device.status = status
        data.device = device;
        this.deviceStatusChanged.emit(data);
        this.closePopup.emit(); 
      });
  }

  changeDsoVisibility() {
    const device = this.popupDetails.device;
    const visibility = device.isVisible ? false : true

    this.deviceService.changeDsoVisibility(device)
      .subscribe(response => {  
      }, error => {
        this.toastr.error(`Error occured while trying to ${device.isVisible ? "forbid" : "allow"} visibility of ${device.name} - ${device.manufacturer}. Please try again.`, "Error")
      }, () => {
        this.toastr.success(`You ${device.isVisible ? "forbid" : "allowed"} visibility of ${device.name} - ${device.manufacturer} successfully.`, "Success")
        const data = new PopupDeviceData();
        device.isVisible = visibility
        data.device = device;
        this.dsoVisibilityChanged.emit(data);
        this.closePopup.emit(); 
      });
    }

  changeDsoManaging() {
    const device = this.popupDetails.device;
    const accesability = device.isAccesable ? false : true

    this.deviceService.changeDsoManaging(device)
      .subscribe(response => {  
      }, error => {
        this.toastr.error(`Error occured while trying to ${device.isAccesable ? "forbid" : "allow"} managing of ${device.name} - ${device.manufacturer}. Please try again.`, "Error")
      }, () => {
        this.toastr.success(`You ${device.isAccesable ? "forbid" : "allowed"} managing of ${device.name} - ${device.manufacturer} successfully.`, "Success")
        const data = new PopupDeviceData();
        device.isAccesable = accesability
        data.device = device;
        this.dsoManagingChanged.emit(data);
        this.closePopup.emit(); 
      });
  }
   deleteProsummer() {

    this.dsoDashboardService.deleteProsummer(this.popupDetails.prosumer.id).subscribe(
      () => {
       // this.prosummers = this.prosummers?.filter(prosummer => prosummer.id != crypId)
        this.toastr.success("Prosumer has been removed.","Success")
      }
      ,() => this.toastr.error("Something went wrong with server request for deleting prosumer.","Error") 
      ,()=>{
        this.prosummerDeleted.emit();
        this.closePopup.emit();
      }
    )
  }
  
}
