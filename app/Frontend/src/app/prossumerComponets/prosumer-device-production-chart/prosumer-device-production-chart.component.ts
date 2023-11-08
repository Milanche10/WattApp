import { Component } from '@angular/core';
import { Chart, ChartType } from 'chart.js';
import { MostlyUsedDevice } from 'src/app/models/Device';
import { DashboardService } from 'src/app/services/dso/dashboard.service';


@Component({
  selector: 'app-prosumer-device-production-chart',
  templateUrl: './prosumer-device-production-chart.component.html',
  styleUrls: ['./prosumer-device-production-chart.component.css']
})
export class ProsumerDeviceProductionChartComponent {

  currentProduction!: number;
  encryptedId!: string;

  constructor(private dashboardService : DashboardService) {
  }

 
  ngOnInit(): void {
    this.encryptedId = sessionStorage.getItem("user")!
      this.dashboardService.getCurrentProducedForProsummer(this.encryptedId).subscribe(respone=>{
        this.currentProduction = respone;
      })
  }

}
