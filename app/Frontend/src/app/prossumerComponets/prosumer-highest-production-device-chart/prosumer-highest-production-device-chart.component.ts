import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ChartType, Chart } from 'chart.js';
import { MostlyUsedDevice } from 'src/app/models/Device';
import { DashboardService } from 'src/app/services/dso/dashboard.service';


@Component({
  selector: 'app-prosumer-highest-production-device-chart',
  templateUrl: './prosumer-highest-production-device-chart.component.html',
  styleUrls: ['./prosumer-highest-production-device-chart.component.css']
})
export class ProsumerHighestProductionDeviceChartComponent {
  type: ChartType = 'doughnut'
  myChart: Chart | null = null;
  device : MostlyUsedDevice | null = null;
  highestProductionForDevice!: number;
  totalProduction!: number;

  encryptedId!: string;

  constructor(private dashboardService : DashboardService) {
  }



  ngAfterViewInit(): void {

  }
  ngOnInit(): void {
    this.encryptedId = sessionStorage.getItem("user")!
    this.dashboardService.getTotalProducedForProsummer(this.encryptedId).subscribe(response=>{
      this.totalProduction = response
    })
    this.dashboardService.getDeviceWithHighestProducedPerProsummer(this.encryptedId).subscribe(respone=>{
      if(!respone)
        return;
      this.device = respone;
      this.highestProductionForDevice = this.device.produced
      this.generateChart();
    })
  }
  generateChart() : void{
    var data = {
      labels: ["Other Devices", "Highest Produced Device"],
      datasets: [
          {
            backgroundColor: ["#53c986", "#1fab5b"],
              data: [this.totalProduction, this.highestProductionForDevice]
          }
      ]
  };

    this.myChart = new Chart("highestProducedChart", {
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
            text: 'Comparing highest production for device'
          }
        }
    }
    });
  }
}
