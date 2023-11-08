import { Component, Input } from '@angular/core';
import { DeviceDetail } from 'src/app/models/Device';
import { ProsummerExtended } from 'src/app/models/Prosummer';
import { DeviceService } from 'src/app/services/deviceService/device.service';
import { Global } from 'src/app/utils/global/IGlobal';


@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent {
  @Input() data!: DeviceDetail[]

  deviceAccess: any = true;
  visibleDevicesNumber = 0;
  accesableDevicesNumber = 0;

  glob = Global.modalHeader = "Prosummer Devices"
 
  constructor(private deviceService : DeviceService) {
  }

  ngOnInit() {
    this.visibleDevicesCount();
    this.accesableDevicesCount();
  }
  
  visibleDevicesCount()
  {
    for(const device of this.data)
      if(device.isVisible)
        this.visibleDevicesNumber++;
  }

  accesableDevicesCount()
  {
    for(const device of this.data)
      if(device.isAccesable)
        this.accesableDevicesNumber++;
  }

  onDeviceStatusChange(event: any, device: DeviceDetail) {

    this.deviceService.changeDeviceStatus(device).subscribe(
      res => {
        console.log('Device status changed:', res);
        device.status = !device.status;
      },
      error => {
        console.log('Error changing device status:', error);
        event.target.checked = device.status;
      }
    );
  }
 
/*
  onClick(device: any)
  {
    this.selectedDevice = device;
  }*/
}
