import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Chart, ChartData, ChartType } from 'chart.js';
import { MostlyUsedDevice } from 'src/app/models/Device';
import { DashboardService } from 'src/app/services/dso/dashboard.service';
import { TooltipItem } from 'chart.js/auto';

@Component({
  selector: 'app-prosumer-device-produced-chart',
  templateUrl: './prosumer-device-produced-chart.component.html',
  styleUrls: ['./prosumer-device-produced-chart.component.css']
})
export class ProsumerDeviceProducedChartComponent {

  type: ChartType = 'doughnut'
  myChart: Chart | null = null;
  device : MostlyUsedDevice | null = null;
  highestProducedForDevice!: number;
  totalProduced!: number;

  constructor(private dashboardService : DashboardService) {
  }



  ngAfterViewInit(): void {

  }
  ngOnInit(): void {
   
  }

  generateChart() : void{
    var data = {
      labels: ["Other Devices", "Highest Production Device"],
      datasets: [
          {
              backgroundColor: ["#356eea82", " #4e85f9"],
              data: [this.totalProduced, this.highestProducedForDevice]
          }
      ]
  };

    this.myChart = new Chart("productionChart", {
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
            text: 'Comparing highest production device'
          }
        }
    }
    });
  }
}
