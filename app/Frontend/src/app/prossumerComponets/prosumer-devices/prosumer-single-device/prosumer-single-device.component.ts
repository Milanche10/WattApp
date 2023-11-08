
import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { DeviceDetail } from 'src/app/models/Device';
import { PopupDetails } from 'src/app/models/popup/PopupDetails';
import { PopupDeviceData } from 'src/app/models/popup/PopupDeviceData';
import { DeviceService } from 'src/app/services/deviceService/device.service';

import { environment } from 'src/environment/environment';


@Component({
  selector: 'app-prosumer-single-device',
  templateUrl: './prosumer-single-device.component.html',
  styleUrls: ['./prosumer-single-device.component.css']
})
export class ProsumerSingleDeviceComponent implements OnInit {
  @Input() device!: DeviceDetail;
  @Output() deviceDeletePopup = new EventEmitter<PopupDetails>();
  @Output() deviceDetailsClick = new EventEmitter<any>();
  @Output() deviceChangeStatusPopup = new EventEmitter<any>();
  baseUrl = environment.apiUrl;
  popupDetails!: PopupDetails;
  showMenu = false;
  currentEnergy: number = 0;

  constructor(private deviceService: DeviceService) {
  }

  ngOnInit(): void {
    if(this.device.status) {
      this.loadCurrentEnergy()
    }
  }

  loadCurrentEnergy() {
    this.deviceService.getCurrentEnergyByDevice(this.device.id, this.device.type)
      .subscribe(response => {
        this.currentEnergy = response
      })
  }

  showDeleteDevicePopupDetails() {
    this.deviceDeletePopup.emit()
  }

  showChangeStatusPopup(event: Event) {
    event.preventDefault();
    const popupDeviceData = new PopupDeviceData()
    popupDeviceData.device = this.device;
    popupDeviceData.target = event.target as HTMLInputElement;
    this.deviceChangeStatusPopup.emit(popupDeviceData);
  }

  getDeviceStatusText(): string {
    if(this.device.status) {
      return "on"
    } else {
      return "off"
    }
  }

  getDeviceChangeStatusText(): string {
    if(!this.device.status) {
      return "on"
    } else {
      return "off"
    }
  }

  getDeviceAddress(): string {
    const address = []
    if(this.device!.address) {
      address.push(this.device!.address)
    }
    if(this.device!.city) {
      address.push(this.device!.city)
    }
    if(this.device!.county) {
      address.push(this.device!.county)
    }

    return address.join(" | ")
  }

  toggleMenu(event: Event): void {
    event.stopPropagation();
    this.showMenu = !this.showMenu;
  }

  @HostListener('document:click')
  onClick(): void {
    this.showMenu = false;
  }

  getDeviceIconPath(): string {
    const deviceName = (<string>this.device.name).toLowerCase().trim().replace(" ", "_")
    return `../../../../assets/icons/devices/${deviceName}.png`
  }
}
