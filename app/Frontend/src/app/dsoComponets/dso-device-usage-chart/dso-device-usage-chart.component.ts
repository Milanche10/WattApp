import { Component } from '@angular/core';
import { Chart, ChartType } from 'chart.js';
import { MostlyUsedDevice } from 'src/app/models/Device';
import { DashboardService } from 'src/app/services/dso/dashboard.service';

@Component({
  selector: 'app-dso-device-usage-chart',
  templateUrl: './dso-device-usage-chart.component.html',
  styleUrls: ['./dso-device-usage-chart.component.css']
})
export class DsoDeviceUsageChartComponent {
  type: ChartType = 'doughnut'
  myChart: Chart | null = null;
  totalProduced!: number;
  totalUsage!: number;

  constructor(private dashboardService : DashboardService) {
  }



  ngAfterViewInit(): void {

  }
  ngOnInit(): void {
    this.dashboardService.getTotalUsage().subscribe(response=>{
      this.totalUsage = response
      this.dashboardService.getTotalProduced().subscribe(respone=>{
        this.totalProduced = respone
        this.generateChart();
      })
    })
  }
  generateChart(): void {
    var data = {
      labels: ["Total Usage", "Total Production"],
      datasets: [
        {
          backgroundColor: ["#df6d02d4", "orange"],
          data: [this.totalUsage, this.totalProduced],
        }
      ]
    };
  
    this.myChart = new Chart("usageChart", {
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
            text: 'Comparing total usage and production',
            color: 'lightblue',
          },
          tooltip: {
            enabled: true,
            callbacks: {
              label: function (context: any) {
                var label = '';
                if (context.dataset.label) {
                  label += context.dataset.label + ': ';
                }
                if (context.parsed) {
                  label += context.parsed.toFixed(2) + ' kWh';
                }
                return label;
              }
            }
          }
        }
      }
    });
  }
}
