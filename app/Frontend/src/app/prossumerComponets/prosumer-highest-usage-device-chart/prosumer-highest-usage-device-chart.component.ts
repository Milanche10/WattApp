import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Chart, ChartType } from 'chart.js';
import { MostlyUsedDevice } from 'src/app/models/Device';
import { DashboardService } from 'src/app/services/dso/dashboard.service';

@Component({
  selector: 'app-prosumer-highest-usage-device-chart',
  templateUrl: './prosumer-highest-usage-device-chart.component.html',
  styleUrls: ['./prosumer-highest-usage-device-chart.component.css']
})
export class ProsumerHighestUsageDeviceChartComponent {
  type: ChartType = 'doughnut'
  myChart: Chart | null = null;
  device : MostlyUsedDevice | null = null;
  highestUsageForDevice!: number;
  totalUsage!: number;

  encryptedId!: string;

  constructor(private dashboardService : DashboardService) {
  }



  ngAfterViewInit(): void {

  }
  ngOnInit(): void {
    this.encryptedId = sessionStorage.getItem("user")!
    this.dashboardService.getTotalUsageForProsummer(this.encryptedId).subscribe(response=>{
      this.totalUsage = response
    })
    this.dashboardService.getDeviceWithHighestUsagePerProsummer(this.encryptedId).subscribe(respone=>{
      if(!respone)
        return;
      this.device = respone;
      this.highestUsageForDevice = this.device.usage
      this.generateChart();
    })
  }
  generateChart() : void{
    var data = {
      labels: ["Other Devices", "Highest Usage Device"],
      datasets: [
          {
              backgroundColor: [" #a258c7", "#8e27c2"],
              data: [this.totalUsage, this.highestUsageForDevice]
          }
      ]
  };

    this.myChart = new Chart("highestUsageChart", {
      type: this.type,
      data: data,
      options: {
        responsive: true,
        plugins: {
          legend: {
          position: 'top',
          },
          title: {
            display: true,
            text: 'Comparing highest usage for devices'
          }
        }
    }
    });
  }
}
