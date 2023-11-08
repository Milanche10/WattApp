import { DeviceDetail } from "./Device";
import { DeviceDetailDTO } from "./DeviceDetailDTO";

export class ProsummerDTO {

    id: string;
  firstName: string;
  lastName: string;
  email: string;
  adress: string;
  jbmg: string;
  brlk: string;
  numberOfDevices: number;
  devices: DeviceDetail[];
  isBlock: number;

  constructor(dto: any) {
    this.id = dto.id;
    this.firstName = dto.firstName;
    this.lastName = dto.lastName;
    this.email = dto.email;
    this.adress = dto.adress;
    this.jbmg = dto.jbmg;
    this.brlk = dto.brlk;
    this.numberOfDevices = dto.numberOfDevices;
    this.devices = dto.devices;
    this.isBlock = dto.isBlock;
 
 }
}