import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Chart, ChartData, ChartType } from 'chart.js';
import { MostlyUsedDevice } from 'src/app/models/Device';
import { DashboardService } from 'src/app/services/dso/dashboard.service';
import { TooltipItem } from 'chart.js/auto';

@Component({
  selector: 'app-dso-device-produced-chart',
  templateUrl: './dso-device-produced-chart.component.html',
  styleUrls: ['./dso-device-produced-chart.component.css']
})
export class DsoDeviceProducedChartComponent implements OnInit, AfterViewInit {
  type: ChartType = 'doughnut'
  myChart: Chart | null = null;
  device : MostlyUsedDevice | null = null;
  currentUsage!: number;
  currentProduction!: number;

  constructor(private dashboardService : DashboardService) {
  }



  ngAfterViewInit(): void {

  }
  ngOnInit(): void {
    this.dashboardService.getCurrentProduced().subscribe(response=>{
      this.currentProduction = response
      this.dashboardService.getCurrentUsage().subscribe(respone=>{
        this.currentUsage = respone;
        this.generateChart()
      })

    })
  }

  generateChart(): void {
    var data = {
      labels: ["Current Usage", "Current Production"],
      datasets: [
        {
          backgroundColor: ["#356eea82", "#4e85f9"],
          data: [this.currentUsage, this.currentProduction],
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
            text: 'Comparing current usage and production',
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
