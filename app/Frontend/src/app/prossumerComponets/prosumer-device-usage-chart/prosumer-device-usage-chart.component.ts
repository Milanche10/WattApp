import { Component } from '@angular/core';
import { Chart, ChartType } from 'chart.js';
import { MostlyUsedDevice } from 'src/app/models/Device';
import { DashboardService } from 'src/app/services/dso/dashboard.service';


@Component({
  selector: 'app-prosumer-device-usage-chart',
  templateUrl: './prosumer-device-usage-chart.component.html',
  styleUrls: ['./prosumer-device-usage-chart.component.css']
})
export class ProsumerDeviceUsageChartComponent {

  currentUsage!: number;
  encryptedId!: string;

  constructor(private dashboardService : DashboardService) {
  }

  ngOnInit(): void {
      this.encryptedId = sessionStorage.getItem("user")!
      this.dashboardService.getCurrentUsageForProsummer(this.encryptedId).subscribe(respone=>{
        this.currentUsage = respone;
      })
  }

}
