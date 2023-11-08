
import { Component, ElementRef, EventEmitter, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ActivatedRoute, Route } from '@angular/router';
import { DeviceDetail } from 'src/app/models/Device';
import { environment } from 'src/environment/environment';
import { PopupDeviceData } from 'src/app/models/popup/PopupDeviceData';
import { PopupDetails } from 'src/app/models/popup/PopupDetails';
import { PopupType } from 'src/app/models/popup/PopupType';
import { DeviceService } from 'src/app/services/deviceService/device.service';
import { Record } from 'src/app/models/Record';

@Component({
  selector: 'app-prosumer-device-details',
  templateUrl: './prosumer-device-details.component.html',
  styleUrls: ['./prosumer-device-details.component.css']
})
export class ProsumerDeviceDetailsComponent {
  @ViewChild('navbarContainer') navbar?: ElementRef;
  device?: DeviceDetail;
  popupDetails: PopupDetails = new PopupDetails();
  popupVisible: boolean = false;

  energyTypeText?: string;
  deviceTypeText?: string;
  currentEnergy: number = 0;
  todayEnergy: number = 0;
  lastSevenDaysEnergy: number = 0;
  thisMonthEnergy: number = 0;

  constructor( 
    private route: ActivatedRoute,
    private deviceService: DeviceService) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.loadDevice(params["id"]);
    })
  }

  loadDevice(id: string): void {
    this.deviceService.getDeviceById(id)
      .subscribe(response => {
        this.device = response

        if(this.device.type == "Potrosac") {
          this.energyTypeText = "consumption"
          this.deviceTypeText = "consumer"
        } else {
          this.energyTypeText = "production"
          this.deviceTypeText = "producer"
        }
        
        if(this.device.status) {
          this.loadCurrentEnergy();
        }

        this.loadTodayEnergy();
        this.loadLastSevenDaysEnergy();
        this.loadThisMonthEnergy();
      })
  }
    
  loadCurrentEnergy() {
    this.deviceService.getCurrentEnergyByDevice(this.device!.id, this.device!.type)
      .subscribe(response => {
        this.currentEnergy = response;
      })
  }

  loadTodayEnergy(): void {
    this.deviceService.getTodayEnergyByDevice(this.device!.id, this.device!.type)
      .subscribe(response => {
        this.todayEnergy = response;
      })
  }

  loadLastSevenDaysEnergy(): void {
    this.deviceService.getLastSevenDaysEnergyByDevice(this.device!.id)
      .subscribe(response => {
        let energy = 0;
        const currentDate = new Date();
        const day = currentDate.getDate()
        if(response.length > 0) {
          if(this.device!.type.trim().toLowerCase() == 'potrosac') {
            for(let record of response[0].records) {
              if(Number(record.day) > day - 7) {
                energy += record.usage;
              }
            }
          } else {
            for(let record of response[0].records) {
              if(Number(record.day) > day - 7) {
                energy += record.produced;
              }
            }
          }
        }

        this.lastSevenDaysEnergy = energy;
      })
  }

  loadThisMonthEnergy(): void {
    this.deviceService.getThisMonthEnergyByDevice(this.device!.id)
      .subscribe(response => {
        const energyType = this.device!.type.trim().toLowerCase() == 'potrosac' ? 'usage' : 'produced'
        this.thisMonthEnergy = this.loadThisMonthEnergyFromRecord(response, energyType);
      })
  }

  private loadThisMonthEnergyFromRecord(records: Record[], energyType: 'produced' | 'usage'): number {
    let energy = 0;

    for(let record of records) {
      const month: number = <number>((record.date.split('/')[0]) as unknown)

      const currentDate: Date = new Date()
      if(month == currentDate.getMonth() + 1) {
        for(let r of record.records) {
          energy += r[energyType]
        }
      }
    }
    
    return energy
  }

  removeSelectedLink() {
    const navbarLinks = this.navbar!.nativeElement.querySelectorAll(".navbar-link");
    for(let link of navbarLinks) {
      link.classList.remove("navbar-link-selected")
    }
  }

  showChangeStatusPopup(event: Event) {
    event.preventDefault()
    this.popupVisible = true;
    this.popupDetails.device = this.device;
    this.popupDetails.popupType = PopupType.changeStatus
    const changeStatusText = this.device?.status ? "off" : "on"
    this.popupDetails.header = `${this.device?.name} ${this.device?.manufacturer}`
    this.popupDetails.text = "";
    this.popupDetails.confirmText = `Are you sure you want to turn ${changeStatusText} this device?`
    this.popupDetails.confirm = `Turn ${changeStatusText}`
    this.popupDetails.cancel = "Cancel"
  }

  showDeleteDevicePopup() {
    this.popupVisible = true;
    this.popupDetails.device = this.device;
    this.popupDetails.popupType = PopupType.deleteDevice
    this.popupDetails.header = `${this.device?.name} ${this.device?.manufacturer}`
    this.popupDetails.text = "If you delete the device, you will no longer be able to track its status or its energy consumption/production history."
    this.popupDetails.confirmText = "Are you sure you want to delete this device?"
    this.popupDetails.confirm = "Delete"
    this.popupDetails.cancel = "Cancel"
  }
 

  getDeviceIconPath(): string {
    const deviceName = (<string>this.device!.name)
      .toLowerCase()
      .trim()
      .replace(" ", "_")
    return `../../../../assets/icons/devices/${deviceName}.png`
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

  async navigateToHome() {
    // await new Promise(f => setTimeout(f, 2000))
    window.location.href = 'prosummer/home'
  }
}
