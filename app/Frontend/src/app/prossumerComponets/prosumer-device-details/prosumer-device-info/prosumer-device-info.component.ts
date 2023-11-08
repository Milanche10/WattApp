import { Component, Input } from '@angular/core';
import { DeviceDetail } from 'src/app/models/Device';
import { PopupDetails } from 'src/app/models/popup/PopupDetails';
import { PopupDeviceData } from 'src/app/models/popup/PopupDeviceData';
import { PopupType } from 'src/app/models/popup/PopupType';

@Component({
  selector: 'app-prosumer-device-info',
  templateUrl: './prosumer-device-info.component.html',
  styleUrls: ['./prosumer-device-info.component.css']
})
export class ProsumerDeviceInfoComponent {
  @Input() device!: DeviceDetail;
  dsoPrivilegesPopupVisible: boolean = false;
  deviceTypeStr!: String; 
  popupDetails: PopupDetails = new PopupDetails();

  ngOnInit(): void {
    this.deviceTypeStr = this.device.type == "Potrosac" ? "consumption" : "production"
  }
  
  getDeviceStatus() {
    if(this.device.status) {
      return "on"
    } else {
      return "off"
    }
  }

  getDeviceType() {
    if(this.device.type == "Potrosac") {
      return "consumer"
    } else {
      return "producer"
    }
  }

  showDsoVisibilityPopup(event: Event): void {
    event.preventDefault();
    this.dsoPrivilegesPopupVisible = true;
    this.popupDetails.device = this.device;
    this.popupDetails.popupType = PopupType.changeDsoVisibility
    this.popupDetails.header = `${this.device.name} · ${this.device.manufacturer}`
    const visibilityText = this.device.isVisible ? "forbid" : "allow"
    this.popupDetails.text = `If you ${visibilityText} visibility, DSO (Distribution System Operator) ${this.device.isVisible ? "won't" : "will"} see current production/consumption of this device.`
    this.popupDetails.confirmText = `Are you sure you want to ${visibilityText} visibility of this device?`
    this.popupDetails.confirm = visibilityText.charAt(0).toUpperCase() + visibilityText.substring(1)
    this.popupDetails.cancel = "Cancel"
  }

  showDsoManagingPopup(event: Event): void {
    event.preventDefault();
    this.dsoPrivilegesPopupVisible = true;
    this.popupDetails.device = this.device;
    this.popupDetails.popupType = PopupType.changeDsoManaging
    this.popupDetails.header = `${this.device.name} · ${this.device.manufacturer}`
    const managingText = this.device.isAccesable ? "forbid" : "allow"
    this.popupDetails.text = `If you ${managingText} managing, DSO (Distribution System Operator) ${this.device.isAccesable ? "won't" : "will"} be able to change state of this device.`
    this.popupDetails.confirmText = `Are you sure you want to ${managingText} managing of this device?`
    this.popupDetails.confirm = managingText.charAt(0).toUpperCase() + managingText.substring(1)
    this.popupDetails.cancel = "Cancel"
  }

  changeDsoVisibilityLocaly(deviceData: PopupDeviceData): void {
    this.device.isVisible = deviceData.device.isVisible;
  }

  changeDsoManagingLocaly(deviceData: PopupDeviceData): void {
    this.device.isAccesable = deviceData.device.isAccesable;
  }
}
