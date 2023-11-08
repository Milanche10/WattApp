import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ChartType, Chart } from 'chart.js';
import { ProsummerWithHighestProduced } from 'src/app/models/Prosummer';
import { DashboardService } from 'src/app/services/dso/dashboard.service';

@Component({
  selector: 'app-dso-prosummer-produced-chart',
  templateUrl: './dso-prosummer-produced-chart.component.html',
  styleUrls: ['./dso-prosummer-produced-chart.component.css']
})
export class DsoProsummerProducedChartComponent implements OnInit,AfterViewInit{
  type: ChartType = 'doughnut'
  myChart: Chart | null = null;
  prosummer : ProsummerWithHighestProduced | null = null;
  totalProduced!: number;
  totalUsage!: number;

  constructor(private dashboardService : DashboardService) {
  }



  ngAfterViewInit(): void {

  }
  ngOnInit(): void {
    this.dashboardService.getTotalUsageForSevenDays().subscribe(response=>{
      this.totalUsage = response
      this.dashboardService.getTotalProducedForSevenDays().subscribe(respone=>{
        this.totalProduced = respone;
        this.generateChart();
      })
    })
  }
  generateChart(): void {
    var data = {
      labels: ["Total Usage For Last Seven Days", "Total Produced For Last Seven Days"],
      datasets: [
        {
          backgroundColor: ["#06a1b4", "#10ddf7"],
          data: [this.totalUsage, this.totalProduced]
        }
      ]
    };
  
    this.myChart = new Chart("prosummerProducedChart", {
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
            text: 'Comparing total usage and production for last seven days',
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
