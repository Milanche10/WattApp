import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Chart, ChartType } from 'chart.js';
import { MostlyUsedDevice } from 'src/app/models/Device';
import { ProsummerWithHighestUsage } from 'src/app/models/Prosummer';
import { DashboardService } from 'src/app/services/dso/dashboard.service';

@Component({
  selector: 'app-dso-prosummer-usage-chart',
  templateUrl: './dso-prosummer-usage-chart.component.html',
  styleUrls: ['./dso-prosummer-usage-chart.component.css']
})
export class DsoProsummerUsageChartComponent implements OnInit,AfterViewInit {
  type: ChartType = 'doughnut'
  myChart: Chart | null = null;
  prosummer : ProsummerWithHighestUsage | null = null;
  totalProduced!: number;
  totalUsage!: number;

  constructor(private dashboardService : DashboardService) {
  }



  ngAfterViewInit(): void {

  }
  ngOnInit(): void {
    this.dashboardService.getTotalUsageForLastMonth().subscribe(response=>{
      this.totalUsage = response
      this.dashboardService.getTotalProducedForLastMonth().subscribe(respone=>{
        this.totalProduced = respone;
        this.generateChart();
      })
    })
  }
  generateChart(): void {
    var data = {
      labels: ["Total Usage For Last Month", "Total Produced For Last Month"],
      datasets: [
        {
          backgroundColor: ["#f53d17", "#f87a60"],
          data: [this.totalUsage, this.totalProduced],
        }
      ]
    };
  
    this.myChart = new Chart("prosummerUsageChart", {
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
            text: 'Comparing total usage and production for last month',
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
