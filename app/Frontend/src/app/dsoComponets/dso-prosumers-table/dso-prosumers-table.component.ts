import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Prosummer, ProsummerExtended } from 'src/app/models/Prosummer';
import { DeviceService } from 'src/app/services/deviceService/device.service';
import { DashboardService } from 'src/app/services/dso/dashboard.service';
import { Global, ModalTypes } from 'src/app/utils/global/IGlobal';
import { ModalOpener } from 'src/app/utils/modals/modal/modal.component';
import { ProsummerFilterDTO } from 'src/app/models/ProsummerFilterDTO';
import { ProsummerDTO } from 'src/app/models/ProsummerDTO';
import { DeviceDetailDTO } from 'src/app/models/DeviceDetailDTO';
import { FormsModule } from '@angular/forms'; // add this import
import { DeviceDetail } from 'src/app/models/Device';
import { PopupType } from 'src/app/models/popup/PopupType';
import { PopupDetails } from 'src/app/models/popup/PopupDetails';

@Component({
  selector: 'app-dso-prosumers-table',
  templateUrl: './dso-prosumers-table.component.html',
  styleUrls: ['./dso-prosumers-table.component.css'],
  
})


export class DsoProsumersTable implements OnInit {

    @Output() prosumerSelected = new EventEmitter<Prosummer>();
  
  numberOfPages:Array<number> = []
  currentPage!: number
  ind!: number
  global = Global
  searchTerm: string='';
  prosummers: ProsummerDTO[] = [];
  prosummers1: ProsummerDTO[] = [];
  prosummerFilterDTO: ProsummerFilterDTO = new ProsummerFilterDTO();
  popupVisible = false; 
  selectedCity:string='';
  selectedCounty:string='';

  all_prosummers: Prosummer[] = [];
  uniqueCities: string[]=[];
  uniqueCounty: string[]=[];
  userDevices!: DeviceDetail[]; 
  showDevicePopup = false;
  prosumerN!: ProsummerDTO;

  devicesDetailModalVisible = false;
 //
   popupDetails: PopupDetails=new PopupDetails();

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

//@Output() prosumerClicked: EventEmitter<number> = new EventEmitter<number>();
@Output() prosumerMapShowEvent= new EventEmitter<any>();

   ngOnInit(): void {
    this.global.DsoDashboardNumberOfPages = this.numberOfPages

  }

  showDevices(devices: DeviceDetail[], prosumer: ProsummerDTO): void {
    
    this.prosumerN = prosumer;
    this.userDevices = devices;
    this.showDevicePopup = true;
  }

public showOnMap(prosumer: any) {
   this.prosumerMapShowEvent.emit(prosumer);
  }
  search() {
    this.prosummers = this.all_prosummers.filter((item) => {
      return (
        item.firstName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        item.lastName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        item.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        item.jbmg.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        item.brlk.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
   
    });
    this.selectedCounty='';
    this.selectedCity='';
    if (this.searchTerm === '') {
      this.clearSearch(); 
    }
  }

  clearFilterCity() {
    this.selectedCity = '';
    this.onCityChange();
    this.clearSearch();
  }

  clearFilterCounty() {
  this.selectedCounty = '';
  this.onCountyChange();
  this.clearSearch();
  }

  clearSearch() {
    this.searchTerm = '';
    this.dsoDashboardService.getAllProsummersByFilter(this.prosummerFilterDTO).subscribe(response => {
      this.prosummers = response.prosummers;
      this.prosummers1 = response.prosummers;
      this.currentPage = response.currentPage;
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


  creatProsummer() {
    this.dialogOpener.openModal(null,ModalTypes.DSO_PROSUMMER_CREATION, {
      id: "modal-component",
      height: "600px",
      width: "1000px",
    })
  }
/*
  deleteProsummer(crypId: string) {

    this.dsoDashboardService.deleteProsummer(crypId).subscribe(
      () => {
        this.prosummers = this.prosummers?.filter(prosummer => prosummer.id != crypId)
        this.toastr.success("Prosummr has been removed","Success")
      }
      ,() => this.toastr.error("Something whent wrong with server request","Error")
    )
  }*/
  showDeletePopup(prosummer:ProsummerDTO) {
    this.popupVisible=true;
    this.popupDetails.prosumer=prosummer;
    this.popupDetails.header = `${prosummer.firstName} ${prosummer.lastName}`

    this.popupDetails.confirmText = "Are you sure you want to delete this prosumer?"
   this.popupDetails.confirm = "Delete"
    this.popupDetails.cancel = "Cancel"
    this.popupDetails.popupType=PopupType.deleteProsummer;
  }
  
onRowClick(prosumer: Prosummer) {
  this.prosumerSelected.emit(prosumer);
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
    this.searchTerm='';
    var city=this.selectedCity;
    this.selectedCounty='';
    this.dsoDashboardService.getProsummerByAdresseCity(city).subscribe(
      (prosummers: ProsummerDTO[]) => {
        this.prosummers = prosummers.filter(prosummer => prosummer.adress.includes(city));
      }
    );
  }

  onCountyChange() {
    this.searchTerm='';
    var county=this.selectedCounty;
    this.selectedCity='';
    this.dsoDashboardService.getAllProsummerByAdressCounty(county).subscribe(
      (prosummers: ProsummerDTO[]) => {
        this.prosummers = prosummers.filter(prosummer => prosummer.adress.includes(county));
      }
    );
  }
// Component code
toggleBlockColor(prosummer: any) {
  prosummer.isBlock = !prosummer.isBlock;
}

}

