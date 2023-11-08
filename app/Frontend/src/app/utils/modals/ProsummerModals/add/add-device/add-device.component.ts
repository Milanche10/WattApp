
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RealEstate } from 'src/app/models/RealEstate';
import { ILocation } from 'src/app/prossumerComponets/prosumer-devices/prosumer-devices.component';
import { DeviceService } from 'src/app/services/deviceService/device.service';
import { ValidationService } from 'src/app/services/validation/validation.service';
import { AESencryptorService } from 'src/app/utils/encryptor/aesencryptor.service';
import { environment } from 'src/environment/environment';


@Component({
  selector: 'app-add-device',
  templateUrl: './add-device.component.html',
  styleUrls: ['./add-device.component.css']
})
export class AddDeviceComponent {
  @Input() selectedLocation?: ILocation;
  @Output() closeModal = new EventEmitter<void>();
  @Output() deviceAdded = new EventEmitter<void>();
  baseUrl = environment.apiUrl;
  prosumerId!: number;

  devicesProducers = ["Solar panel", "Generator","Windmill"]
  devicesConsumers = ["TV","Laptop","PC","Kettle","Bulb","Microwave","Tumble dryer","Air conditioner"]
  prosumerOptions: IProsumer[] = []
  producerOptions: IProsumer[] = []
  consumerOptions: IProsumer[] = [];
  selectedProsumer?: IProsumer;
  showProsumerOptions = false;

  clickedAddDevice = false;

  checkoutForm = this.formBuilder.group({
    'description': '',
    'device': this.devicesProducers[0],
  })

  toggleProsumerOptions() {
    this.showProsumerOptions = !this.showProsumerOptions;
  }

  selectProsumerOption(option: IProsumer) {
    this.selectedProsumer = option;
    this.showProsumerOptions = false;
    this.prosumerOptions.forEach(item => {
      item.selected = item.device == option.device;
    });
  }

  getSelectedProsumerOptionText(): string {
    return this.selectedProsumer ? this.selectedProsumer.device : 'Choose device';
  }
  
  constructor(
    private formBuilder: FormBuilder, 
    private toastr: ToastrService, 
    private deviceService: DeviceService) {
      this.prosumerId = Number(AESencryptorService.decriptyString(sessionStorage.getItem("user")!))
  }

  ngAfterViewInit(): void {
    this.addProsumers(this.devicesProducers, 'p');
    this.addProsumers(this.devicesConsumers, 'c');
  } 

  addProsumers(prosumers: string[], type: 'p' | 'c') {
    for(let prosumer of prosumers) {
      const obj = {
        device: prosumer,
        selected: false
      }
      this.prosumerOptions.push(obj)
      if(type == 'p') {
        this.producerOptions.push(obj)
      } else {
        this.consumerOptions.push(obj)
      }
    }
  }

  onSubmit() {
    if(this.clickedAddDevice) {
      return;
    }

    if(!this.selectedProsumer) {
      this.showErrorBox("You must choose device.")
      return
    }

    const minDescLength = 10;
    if(ValidationService.isEmptyString(this.checkoutForm.value.description!) || this.checkoutForm.value.description!.length < minDescLength) {
      this.showErrorBox(`You must enter device description with minimum of ${minDescLength} characters.`)
      return;
    }

    this.clickedAddDevice = true;

    let type = "Potrosac"
    if(this.devicesProducers.includes(this.selectedProsumer.device)) {
      type = "Proizvodjac"
    }

    const data = {
      "name": this.selectedProsumer.device,
      "status": false,
      "type": type,
      "prosummerId": this.prosumerId as number,
      "realEstateId": this.selectedLocation?.id,
      "isVisible": false,
      "isAccesable": false,
      "description": this.checkoutForm.value.description,
      "manufacturer": ""
    };

    
    this.deviceService.addDevice(data)  
      .subscribe(_ => {
        this.toastr.success("You've added new device successfully.", "Success")
        this.closeModal.emit();
        this.deviceAdded.emit();
      }, _ => {
        this.showErrorBox("Error occured while trying to add new device. Please try again.")
      });
  }

  showErrorBox(msg: any) {
    this.toastr.error(msg, "Error");
  }

  getDeviceIconPath(device: string): string {
    const deviceName = device.toLowerCase().trim().replace(" ", "_")
    return `../../../../../../assets/icons/devices/${deviceName}.png`
  }

}

interface IProsumer {
  device: string,
  selected: boolean;
}