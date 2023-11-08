import { Pipe, PipeTransform } from '@angular/core';
import { DeviceDetail } from 'src/app/models/Device';
import { DeviceStatus, DeviceType } from './prosumer-devices.component';

@Pipe({
  name: 'deviceFilter'
})
export class DeviceFilterPipe implements PipeTransform {
  transform(devices: DeviceDetail[], deviceType: DeviceType, deviceStatus: DeviceStatus): any[] {
    if (!devices) {
      return devices;
    }

    let type: string;
    if(deviceType == DeviceType.ALL) {
        type = "Svi"
    } else if(deviceType == DeviceType.PRODUCER) {
        type = "Proizvodjac"
    } else {
        type = "Potrosac"
    }

    let status: string | boolean;
    if(deviceStatus == DeviceStatus.ALL) {
        status = "Svi"
    } else if(deviceStatus == DeviceStatus.OFF) {
        status = false
    } else {
        status = true
    }

    return devices.filter(item => {
        if((type == "Svi" || item.type == type)
            && (status == "Svi" || item.status == status)) {
            return true;
        }
        return false
    });
  }
}

// transform(devices: any[], filters: {filter_producer_consumer: any, filter_turned_on_off: any}): any[] {
//     if(filters.filter_turned_on_off == "turned_on") {
//         filters.filter_turned_on_off = true;
//     } else if(filters.filter_turned_on_off == "turned_off") {
//         filters.filter_turned_on_off = false;
//     }
//     return devices.filter(device => {
//         if( (filters.filter_producer_consumer == "both" || device.type == filters.filter_producer_consumer)
//             && (filters.filter_turned_on_off == "both" || device.status == filters.filter_turned_on_off) ) {
//                 return true;
//             }
//             return false;
//         })
// }