import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Chart, ChartType } from 'chart.js';
import { Prediction } from 'src/app/models/Prediction';
import { DashboardService } from 'src/app/services/dso/dashboard.service';

@Component({
  selector: 'app-dso-prediction-chart',
  templateUrl: './dso-prediction-chart.component.html',
  styleUrls: ['./dso-prediction-chart.component.css']
})
export class DsoPredictionChartComponent implements OnInit, AfterViewInit {
  type: ChartType = 'line'
  selectedTimePeriod: string =''
  timePeriod: string = ''
  labels: string[] = [];
  produceds : number[] = [0,0,0,0,0,0,0,0,0,0,0,0]
  usages : number[] = [0,0,0,0,0,0,0,0,0,0,0,0]
  producedsMonth : number[] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
  usagesMonth : number[] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
  myChart: Chart | null = null;
  allPredictions: Prediction[] = [];
  selectedYear : number = 0
  selectedMonth : number = 1
  months = new Set()
  years = new Set()

  constructor(private dashboardService : DashboardService) {
  }
  ngAfterViewInit(): void {
    this.myChart = new Chart("Chart", {
      type: this.type,
      data: {
          labels: this.labels,
          datasets: [{
              label: 'Usage',
              data: this.usages,
              fill: false,
              borderColor: 'rgb(192, 75, 75)',
              backgroundColor: 'rgba(192, 75, 75, 0.2)',
              tension: 0.1,
              borderWidth: 1
          },
          {
            label: 'Produced',
            data: this.produceds,
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            tension: 0.1,
            borderWidth: 1
        }]
      },
      options: {
          aspectRatio: 2,
          scales: {
              y: {
                  beginAtZero: true
              }
          },
          animation: {
            duration: 2000,
            easing: 'easeInOutQuad'
          }
      }
    });
  }

  ngOnInit(): void {
    this.dashboardService.getMonthlyPredictions().subscribe(result => {
      this.allPredictions = result;
      this.getAllYears();
      this.selectedYear = 2023; // postavljamo vrednost na 2022
      this.selectedTimePeriod = 'year'; // postavljamo da se prikazuje godišnji grafikon
      this.createHistoryChartYearly(); // kreiramo godišnji grafikon
    });
  }

  refreshChart(data1: any, data2: any) : void{
    this.myChart!.data.labels = [];
    this.labels.forEach(label=>{
      this.myChart!.data.labels?.push(label)
    })
    this.myChart!.data.datasets[0].data = data1;
    this.myChart!.data.datasets[1].data = data2;
    this.myChart!.update()
  }

  getAllYears() : void{
    this.allPredictions.forEach(element =>{
      this.years.add(element.date.split('/')[1])
    })
    const myArray = Array.from(this.years)
    this.years.clear()
    myArray.sort().forEach(el=>
      {
        this.years.add(el)
      })
  }

  onTimePeriodChange():void{
    if (this.selectedTimePeriod === 'year') {
      this.timePeriod = 'year';
    } else if (this.selectedTimePeriod === 'month') {
      this.timePeriod = 'month';
    }
  }

  calculateUsageAndProducedForMonth() :  void{
    this.allPredictions.forEach(element =>{
      if(this.selectedMonth.toString() == element.date.split('/')[0] && this.selectedYear.toString() == element.date.split('/')[1]){
        element.predictions.forEach(prediction=>{
          this.usagesMonth[Number(prediction.day)] += Number(prediction.usage)
          this.producedsMonth[Number(prediction.day)] += Number(prediction.produced)
        })
      }
    })
  }

  calculateUsageAndProducedYearly() : void{
    this.months.clear()
    this.allPredictions.forEach(element =>{
      if(element.date.split('/')[1] == this.selectedYear.toString()){
        this.months.add(element.date.split('/')[0])
        element.predictions.forEach(prediction=>{
          this.usages[Number(element.date.split('/')[0])-1] += Number(prediction.usage)
          this.produceds[Number(element.date.split('/')[0])-1] += Number(prediction.produced)
        })
      }
    })
  }


  createHistoryChartYearly() : void{
    this.selectedMonth = 0;
    this.calculateUsageAndProducedYearly();
    this.labels = [];
    this.months.forEach(element=>{
      var monthNames = [ 'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December' ];
      this.labels.push(monthNames[Number(element)-1])
    })
    this.refreshChart(this.usages,this.produceds);
  }

  createHistoryChartMonth() : void{
    this.calculateUsageAndProducedForMonth()
    this.labels = [];
    for (let index = 1; index < 32; index++) {
     this.labels.push(String(index))
    }
    this.refreshChart(this.usagesMonth,this.producedsMonth)
  }
}
