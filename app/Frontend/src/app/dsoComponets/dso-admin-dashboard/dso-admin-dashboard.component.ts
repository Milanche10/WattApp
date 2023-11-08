import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DeviceDetail } from 'src/app/models/Device';
import { Prosummer, ProsummerDetail, ProsummerExtended } from 'src/app/models/Prosummer';
import { DeviceService } from 'src/app/services/deviceService/device.service';
import { DashboardService } from 'src/app/services/dso/dashboard.service';
import { AESencryptorService } from 'src/app/utils/encryptor/aesencryptor.service';
import { Global, ModalData, ModalTypes } from 'src/app/utils/global/IGlobal';
import { ModalComponent, ModalOpener } from 'src/app/utils/modals/modal/modal.component';
import * as L from 'leaflet';
import { DataService } from 'src/app/services/dataService/data.service';
import { ProsummerFilterDTO } from 'src/app/models/ProsummerFilterDTO';
import { ProsummerPagingDTO } from 'src/app/models/ProsummerPagingDTO';
import { ProsummerDTO } from 'src/app/models/ProsummerDTO';
import { DeviceDetailDTO } from 'src/app/models/DeviceDetailDTO';
import { distinct } from 'rxjs/operators';


@Component({
  selector: 'app-dso-admin-dashboard',
  templateUrl: './dso-admin-dashboard.component.html',
  styleUrls: ['./dso-admin-dashboard.component.css'],
  providers: [DataService]
})
export class DsoAdminDashboardComponent implements OnInit {

  numberOfPages:Array<number> = []
  currentPage!: number
  ind!: number
  global = Global
  searchTerm: string='';
  prosummers: ProsummerDTO[] = [];
  prosummers1: ProsummerDTO[] = [];
  prosummerFilterDTO: ProsummerFilterDTO = new ProsummerFilterDTO();

  selectedCity:string='';
  selectedCounty:string='';

  all_prosummers: Prosummer[] = [];
  uniqueCities: string[]=[];
  uniqueCounty: string[]=[];


  constructor(
    private dsoDashboardService: DashboardService,
    private deviceService: DeviceService,
    private dialogOpener: ModalOpener,
    private toastr: ToastrService
  ) {
      this.prosummerFilterDTO.page=1;
      this.dsoDashboardService.getAllProsummersByFilter(this.prosummerFilterDTO).subscribe(response => {
      this.prosummers = response.prosummers
      this.prosummers1=response.prosummers
      this.numberOfPages = Array(response.numberOfPages).fill(1).map((x,i)=>i+1);
      this.global.DsoDashboardNumberOfPages = this.numberOfPages
      this.currentPage = response.currentPage
      this.ind = 2

       })
      this.dsoDashboardService.getAllProsummers().subscribe((prosumers: Prosummer[]) => {
      this.all_prosummers = prosumers;

      const citiesSet = new Set<string>(this.all_prosummers.map(prosummer => prosummer.adress.split(", ")[1]));
      this.uniqueCities = Array.from(citiesSet);

      const countySet = new Set<string>(this.all_prosummers.map(prosummer => prosummer.adress.split(", ")[2]));
      this.uniqueCounty = Array.from(countySet);

    });
  }


   ngOnInit(): void {
    this.global.DsoDashboardNumberOfPages = this.numberOfPages

  }

  search() {
    this.prosummers = this.prosummers1.filter((item) => {
      return (
        item.firstName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        item.lastName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        item.email.toLowerCase().includes(this.searchTerm.toLowerCase())||
        item.jbmg.toLowerCase().includes(this.searchTerm.toLowerCase())||
        item.brlk.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    });
  }

  LoadPage(page : number) {

    if(page>this.global.DsoDashboardNumberOfPages.length) {
      return
    }
    if(page<1) {
      return
    }
    this.prosummerFilterDTO.page=page;
    this.dsoDashboardService.getAllProsummersByFilter(this.prosummerFilterDTO).subscribe(response => {

      this.prosummers = response.prosummers
      this.prosummers1=response.prosummers
      this.currentPage = response.currentPage
    })


    if(this.currentPage > 1 )
    {
      this.ind = this.currentPage;
    }
  }

  extendMore(param: ProsummerDTO) {
    const prosummer : ProsummerExtended = {
      id: param.id,
      firstName: param.firstName,
      lastName: param.lastName,
      email: param.email,
      adress: param.adress,
      brlk: param.brlk,
      jbmg: param.jbmg
    }

    this.dialogOpener.openModal(prosummer,ModalTypes.PROSSUMER_DETAILS)

  }

  devicesDetail(devices: DeviceDetailDTO[]) {
    this.dialogOpener.openModal(devices,ModalTypes.DEVICE_DETAILS)
  }

  creatProsummer() {
    this.dialogOpener.openModal(null,ModalTypes.DSO_PROSUMMER_CREATION, {
      id: "modal-component",
      height: "600px",
      width: "1000px",
    })
  }

  deleteProsummer(crypId: string) {

    this.dsoDashboardService.deleteProsummer(crypId).subscribe(
      () => {
        this.prosummers = this.prosummers?.filter(prosummer => prosummer.id != crypId)
        this.toastr.success("Prosummr has been removed","Success")
      }
      ,() => this.toastr.error("Something whent wrong with server request","Error")
    )
  }

  blockUnblock(crypId: string, currentState: number) {
    var action: number;
    if (currentState == 1) {
      action = 0;
    } else {
      action = 1;
    }
    this.dsoDashboardService.changeState(crypId, action).subscribe(() => {
      this.prosummers!.filter(prosummer => prosummer.id == crypId)[0].isBlock = action
    })
  }

  onCityChange() {
    var city=this.selectedCity;
    this.selectedCounty='';
    this.dsoDashboardService.getProsummerByAdresseCity(city).subscribe(
      (prosummers: ProsummerDTO[]) => {
        this.prosummers = prosummers.filter(prosummer => prosummer.adress.includes(city));
      }
    );
  }

  onCountyChange() {
    var county=this.selectedCounty;
    this.selectedCity='';
    this.dsoDashboardService.getAllProsummerByAdressCounty(county).subscribe(
      (prosummers: ProsummerDTO[]) => {
        this.prosummers = prosummers.filter(prosummer => prosummer.adress.includes(county));
      }
    );
  }

}
