import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DeviceDetail } from 'src/app/models/Device';
import { DeviceDetailDTO } from 'src/app/models/DeviceDetailDTO';
import { ProsummerDTO } from 'src/app/models/ProsummerDTO';
import { PopupDetails } from 'src/app/models/popup/PopupDetails';
import { PopupDeviceData } from 'src/app/models/popup/PopupDeviceData';
import { PopupType } from 'src/app/models/popup/PopupType';
import { Global } from 'src/app/utils/global/IGlobal';

@Component({
  selector: 'app-dso-prosumers-devices',
  templateUrl: './dso-prosumers-devices.component.html',
  styleUrls: ['./dso-prosumers-devices.component.css']
})
export class DsoProsumersDevicesComponent {
@Input("devices") devices!: DeviceDetail[];
@Input("prosumerName") prosumerName?: ProsummerDTO;
@Output() closed = new EventEmitter<void>();

  deviceAccess: any = true;
  visibleDevicesNumber = 0;
  accesableDevicesNumber = 0;

  popupDetails: PopupDetails = new PopupDetails();
  popupVisible = false

  glob = Global.modalHeader = "Prosummer Devices"


  ngOnInit() {
    this.visibleDevicesCount();
    this.accesableDevicesCount();
  }
  
  getProsumersName(): string
  {
    return this.prosumerName?.firstName + " " + this.prosumerName?.lastName;
  }

  visibleDevicesCount()
  {
    for(const device of this.devices)
      if(device.isVisible)
        this.visibleDevicesNumber++;
  }

  accesableDevicesCount()
  {
    for(const device of this.devices)
      if(device.isAccesable)
        this.accesableDevicesNumber++;
  }

  showChangeStatusPopup(data: PopupDeviceData) {
    this.popupVisible = true;
    const device = data.device
    this.popupDetails.device = device;
    this.popupDetails.popupType = PopupType.changeStatus
    const changeStatusText = device.status ? "off" : "on"
    this.popupDetails.header = `${device.name}`
    this.popupDetails.text = "";
    this.popupDetails.confirmText = `Are you sure you want to turn ${changeStatusText} this device?`
    this.popupDetails.confirm = `Turn ${changeStatusText}`
    this.popupDetails.cancel = "Cancel"
  }

  closePopup(): void {
    this.closed.emit();
  }
}
