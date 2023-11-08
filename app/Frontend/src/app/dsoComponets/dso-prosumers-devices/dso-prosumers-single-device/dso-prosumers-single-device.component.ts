import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DeviceDetail } from 'src/app/models/Device';
import { PopupDetails } from 'src/app/models/popup/PopupDetails';
import { PopupDeviceData } from 'src/app/models/popup/PopupDeviceData';
import { DeviceService } from 'src/app/services/deviceService/device.service';

@Component({
  selector: 'app-dso-prosumers-single-device',
  templateUrl: './dso-prosumers-single-device.component.html',
  styleUrls: ['./dso-prosumers-single-device.component.css']
})
export class DsoProsumersSingleDeviceComponent {
  
  @Input() device:any;
  @Output() deviceChangeStatusPopup = new EventEmitter<any>();
  deviceAccess: any = true;

  popupDetails!: PopupDetails;

  constructor(private deviceService : DeviceService) {
  }

  onDeviceStatusChange(event: any, deviceData: PopupDeviceData): void {
    this.device.status = deviceData.device.status;
  }


  showChangeStatusPopup(event: Event) {
    event.preventDefault();
    const popupDeviceData = new PopupDeviceData()
    popupDeviceData.device = this.device;
    popupDeviceData.target = event.target as HTMLInputElement;
    this.deviceChangeStatusPopup.emit(popupDeviceData);
  }

  getDeviceType(): string {
    if(this.device.type == 'Proizvodjac') {
      return "Producer"
    } else {
      return "Consumer"
    }
  }
}
