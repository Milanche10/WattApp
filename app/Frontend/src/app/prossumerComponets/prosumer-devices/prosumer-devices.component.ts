import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DeviceFilterPipe } from './DeviceFilter';
import { environment } from 'src/environment/environment';
import { Prosummer } from 'src/app/models/Prosummer';
import { PopupDetails } from 'src/app/models/popup/PopupDetails';
import { Device, DeviceDetail } from 'src/app/models/Device';
import { PopupType } from 'src/app/models/popup/PopupType';
import { PopupDeviceData } from 'src/app/models/popup/PopupDeviceData';
import { ProsumerService } from 'src/app/services/prosumer/prosumer-service.service';
import { AESencryptorService } from 'src/app/utils/encryptor/aesencryptor.service';
import { RealEstate } from 'src/app/models/RealEstate'
import { DeviceService } from 'src/app/services/deviceService/device.service';

@Component({
  selector: 'app-prosumer-devices',
  templateUrl: './prosumer-devices.component.html',
  styleUrls: ['./prosumer-devices.component.css']
})
export class ProsumerDevicesComponent implements OnInit {
  devices: DeviceDetail[] = [];
  filter_producer_consumer = "both";
  filter_turned_on_off = "both";
  addDeviceModalVisible = false;
  popupVisible = false;
  deviceDetails: any;
  baseUrl = environment.apiUrl;
  popupDetails: PopupDetails = new PopupDetails()

  apartments: RealEstate[] = [];
  cottages: RealEstate[] = [];
  houses: RealEstate[] = [];
  selectedLocation?: ILocation;

  apartmentOptions: ILocation[] = [];
  cottageOptions: ILocation[] = [];
  houseOptions: ILocation[] = []
  allLocationOptions: ILocation[] = [];

  showLocationOptions = false;
  
  filteredDevices: DeviceDetail[] = [];

  DeviceType = DeviceType
  selectedDeviceType: DeviceType = DeviceType.ALL;
  
  DeviceStatus = DeviceStatus
  selectedDeviceStatus: DeviceStatus = DeviceStatus.ALL

  constructor(
    private prosumerService: ProsumerService) {  
  }

  ngOnInit(): void {
    this.prosumerService.getProsumerByUserId(sessionStorage.getItem("user")!)
      .subscribe(response => {
        const prosumerId = Number(AESencryptorService.decriptyString(response.id));
        this.devices = response.devices
        this.fetchLocations(prosumerId)
      })
  }

  fetchDevices() {
    this.prosumerService.getProsumerByUserId(sessionStorage.getItem("user")!)
      .subscribe(response => {
        this.devices = response.devices
        this.getDevicesByLocation(this.selectedLocation!)
      })
  }

  fetchLocations(prosumerId: number) {
    this.prosumerService.getProsumerRealEstates(prosumerId)
      .subscribe(response => {

        for(let location of <[RealEstate]>response.result) {
          const obj: ILocation = {
            id: location.id,
            type: location.type,
            address: this.getLocationAddress(location),
            selected: false
          }
          const locationType: string = location.type.trim().toLowerCase()
          if(locationType == "apartman") {
            this.apartments.push(location)
            this.apartmentOptions.push(obj)
          } else if(locationType == "kuca") {
            this.houses.push(location)
            this.houseOptions.push(obj)
          } else if(locationType == "vikendica") {
            this.cottages.push(location)
            this.cottageOptions.push(obj)
          }

          this.allLocationOptions.push(obj)
        }

        this.selectedLocation = this.allLocationOptions[0];
        this.selectedLocation.selected = true;

        this.getDevicesByLocation(this.selectedLocation);
      })
  }

  showAddDeviceModal() {
    this.addDeviceModalVisible = true;
  }

  showDeletePopup(device: any) {
    this.popupVisible = true;
    this.popupDetails.device = device;
    this.popupDetails.popupType = PopupType.deleteDevice
    this.popupDetails.header = `${device.name} ${device.manufacturer}`
    this.popupDetails.text = "If you delete the device, you will no longer be able to track its status or its energy consumption/production history."
    this.popupDetails.confirmText = "Are you sure you want to delete this device?"
    this.popupDetails.confirm = "Delete"
    this.popupDetails.cancel = "Cancel"
  }

  showChangeStatusPopup(data: PopupDeviceData) {
    this.popupVisible = true;
    const device = data.device
    this.popupDetails.device = device;
    this.popupDetails.popupType = PopupType.changeStatus
    const changeStatusText = device.status ? "off" : "on"
    this.popupDetails.header = `${device.name} ${device.manufacturer}`
    this.popupDetails.text = "";
    this.popupDetails.confirmText = `Are you sure you want to turn ${changeStatusText} this device?`
    this.popupDetails.confirm = `Turn ${changeStatusText}`
    this.popupDetails.cancel = "Cancel"
  }

  changeDeviceStatusLocaly(data: PopupDeviceData) {
    for (let index = 0; index < this.devices.length; index++) {
      const device = this.devices[index];
      if(device.id == data.device.id) {
        device.status = data.device.status
      }
    }
  }

  getLocationAddress(location: RealEstate): string {
    const address = []
    if(location.addreseDto.street) {
      address.push(location.addreseDto.street)
    }
    if(location.addreseDto.city) {
      address.push(location.addreseDto.city)
    }
    if(location.addreseDto.county) {
      address.push(location.addreseDto.county)
    }

    return `${address.join(` · `)}`
  }

  toggleLocationOptions() {
    this.showLocationOptions = !this.showLocationOptions;
  }

  getSelectedLocationOptionText(): string {
    return this.selectedLocation ? this.selectedLocation.address : 'Choose location';
  }

  selectLocationOption(location: ILocation) {
    this.selectedLocation = location;
    this.showLocationOptions = false;
    this.allLocationOptions.forEach(item => {
      item.selected = item.id === this.selectedLocation?.id;
    });

    this.getDevicesByLocation(location)
  }

  getDevicesByLocation(location: ILocation) {
    this.filteredDevices = [];
  
    for(let device of this.devices) {
      if(device.realEstateId == location.id) {
        this.filteredDevices.push(device);
      }
    }
  }

  getNumberOfProducers(): number {
    return this.filteredDevices
      .filter(d => d.type == "Proizvodjac").length;
  }

  getNumberOfConsumers(): number {
    return this.filteredDevices
      .filter(d => d.type == "Potrosac").length;
  }

  changeDeviceType(deviceType: DeviceType) {
    this.selectedDeviceType = deviceType;
  }

  changeDeviceStatus(deviceStatus: DeviceStatus) {
    this.selectedDeviceStatus = deviceStatus;
  }
}

export interface ILocation {
  id: number,
  type: string,
  address: string,
  selected: boolean
}

export enum DeviceType {
  ALL, PRODUCER, CONSUMER
}

export enum DeviceStatus {
  ALL, OFF, ON
}
