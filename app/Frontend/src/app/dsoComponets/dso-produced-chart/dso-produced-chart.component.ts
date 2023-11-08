import { AfterViewInit, Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dso/dashboard.service';
import { records, Record, RecordMonthSum, RecordDaySum, DailyData } from 'src/app/models/Record';
import { predictions, Prediction, PredictionMonthSum } from 'src/app/models/Prediction';
import { Chart, ChartType } from 'chart.js';

@Component({
  selector: 'app-dso-produced-chart',
  templateUrl: './dso-produced-chart.component.html',
  styleUrls: ['./dso-produced-chart.component.css']
})
export class DsoProducedChartComponent implements OnInit, AfterViewInit{
  labels: string[] = [];
  allRecords: Record[] = [];
  allPredictions: Prediction[] = [];
  allPredictionsBefore: Prediction[] = [];
  dailyDataRecords: DailyData = {};
  dailyDataPredictions: DailyData = {};
  dailyDataPredictionsBefore: DailyData = {};
  type: ChartType = 'line'
  myChart: Chart | null = null;
  historyProduced : (number|null)[] = []
  predictionProduced : (number|null)[] = []
  allDays = new Set()
  allDates = new Set<Date>()
  historyUsage : (number|null)[] = []
  predictionUsage : (number|null)[] = []
  ALL_MONTHS: string[] = ["January","February","March","April","May","Jun","Jul","August","September","October","November","December"];

  constructor(private dsoService: DashboardService){}

  ngAfterViewInit(): void {
    this.myChart = new Chart("dsoProducedChart", {
      type: this.type,
      data: {
          labels: this.labels,
          datasets: [{
              label: 'Produced History',
              data: this.historyProduced,
              fill: false,
              borderColor: 'rgb(75, 192, 192)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              tension: 0.1,
              borderWidth: 1.3
          },
          {
            label: 'Produced Prediction',
            data: this.predictionProduced,
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            tension: 0.1,
            borderWidth: 1,
            borderDash: [5, 5]
        },{
              label: 'Usage history',
              data: this.historyUsage,
              fill: false,
              borderColor: 'orange',
              backgroundColor: 'rgba(192, 75, 75, 0.2)',
              tension: 0.1,
              borderWidth: 1.3
          },
          {
            label: 'Usage Prediction',
            data: this.predictionUsage,
            fill: false,
            borderColor: 'orange',
            backgroundColor: 'rgba(192, 75, 75, 0.2)',
            tension: 0.1,
            borderWidth: 1,
            borderDash: [5, 5]
        }]
      },
      options: {
          aspectRatio: 2,
          scales: {
            y: {
                beginAtZero: true,
                title:{
                display:true,
                text:'kW / h',
                color: 'white',
                }
            },
            x: {
              beginAtZero: true,
              title:{
              display:true,
              text:'Day',
              color: 'white',
              }
          }

        },
          animation: {
            duration: 2000,
            easing: 'easeInOutQuad'
          },
          plugins: {
            tooltip: {
              caretPadding: 3,
              caretSize: 0,
              displayColors: true,
              backgroundColor: 'rgba(84, 135, 191, 0.8)',
              bodyColor: 'rgb(255,255,255)',
              callbacks: {
                title: () => {
                  return
                },
                label: function(context) {
                  let label = context.dataset.label || '';

                  if (label) {
                      label += ': ';
                  }
                  if (context.parsed.y !== null) {
                    label += new Intl.NumberFormat('en-US', { style: 'decimal' }).format(context.parsed.y) + ' kWh';
                  }
                  return label;
                }
              }
            }
          }
      }
    });
  }
  ngOnInit(): void {
    this.dsoService.getRecordsForSevenDays().subscribe(response=>{
      this.allRecords = response;
      this.dsoService.getPredictionForSevenDays().subscribe(response=>{
        this.allPredictions = response;
        this.dsoService.getPredictionSevenDaysBefore().subscribe(result=>{
          this.allPredictionsBefore = result;
          this.calculateUsageInRecords();
          this.calculateUsageInPredictions();
          this.populateChart();
        })
      })
    })
  }

  calculateUsageInRecords() : void{
    for (const record of this.allRecords) {
      for (const hourlyData of record.records) {
        const day = hourlyData.day;
        const month = record.date.split('/')[0];
        const year = record.date.split('/')[1];
        const date = new Date(Number(year),Number(month)-1,Number(day))
        this.allDates.add(date)
        this.allDays.add(day)
        if (!this.dailyDataRecords[day]) {
          this.dailyDataRecords[day] = { usage: 0, produced: 0 };
        }
        this.dailyDataRecords[day].usage += hourlyData.usage;
        this.dailyDataRecords[day].produced += hourlyData.produced;
      }
    }
    this.historyProduced.push(...Object.values(this.dailyDataRecords).map((data) => data.produced));
    this.historyUsage.push(...Object.values(this.dailyDataRecords).map((data) => data.usage));

  }

  calculateUsageInPredictions():void{
    for (const prediction of this.allPredictions) {
      for (const hourlyData of prediction.predictions) {
        const day = hourlyData.day;
        const month = prediction.date.split('/')[0];
        const year = prediction.date.split('/')[1];
        const date = new Date(Number(year),Number(month)-1,Number(day))
        this.allDates.add(date)
        this.allDays.add(day)
        if (!this.dailyDataPredictions[day]) {
          this.dailyDataPredictions[day] = { usage: 0, produced: 0 };
        }
        this.dailyDataPredictions[day].usage += hourlyData.usage;
        this.dailyDataPredictions[day].produced += hourlyData.produced;
      }
    }

    for (const prediction of this.allPredictionsBefore) {
      for (const hourlyData of prediction.predictions) {
        const day = hourlyData.day;
        const month = prediction.date.split('/')[0];
        const year = prediction.date.split('/')[1];
        const date = new Date(Number(year),Number(month)-1,Number(day))
        this.allDates.add(date)
        this.allDays.add(day)
        if (!this.dailyDataPredictionsBefore[day]) {
          this.dailyDataPredictionsBefore[day] = { usage: 0, produced: 0 };
        }
        this.dailyDataPredictionsBefore[day].usage += hourlyData.usage;
        this.dailyDataPredictionsBefore[day].produced += hourlyData.produced;
      }
    }

    this.predictionProduced.push(...Object.values(this.dailyDataPredictionsBefore).map((data) => data.produced));
    this.predictionProduced.push(...Object.values(this.dailyDataPredictions).map((data) => data.produced));
    this.predictionUsage.push(...Object.values(this.dailyDataPredictionsBefore).map((data) => data.usage));
    this.predictionUsage.push(...Object.values(this.dailyDataPredictions).map((data) => data.usage));

  }

  populateChart() : void {
    this.labels = [];
    //const array: Number[] = [];
    const arrDate: Date[] = [];
    this.allDates.forEach(date =>{
      arrDate.push(date)
    })
    /*this.allDays.forEach(day=>{
      array.push(Number(day))
    })*/
    this.myChart!.data.datasets[0].data = this.historyProduced
    this.myChart!.data.datasets[1].data = this.predictionProduced
    /*array.sort(function(a, b) {
      if (typeof a === 'number' && typeof b === 'number') {
        return a - b;
      } else {
        return 0;
      }
    })
    array.forEach(el=>{
      this.myChart!.data.labels?.push(el)
    })*/
    //console.log(arrDate);
    const currentDate = new Date();
    const startDate = new Date(currentDate); // Start date (6 days before current date)
    startDate.setDate(startDate.getDate() - 7);

    const endDate = new Date(currentDate); // End date (6 days after current date)
    endDate.setDate(endDate.getDate() + 6);

    const allDates1: Date[] = [];
    const currentDateCopy = new Date(startDate); // Create a copy of the start date for iteration

    while (currentDateCopy <= endDate) {
      allDates1.push(new Date(currentDateCopy)); // Add the current date to the array
      currentDateCopy.setDate(currentDateCopy.getDate() + 1); // Move to the next date
    }

    //console.log(allDates1);


    allDates1.forEach(el=>{
      const element = el.getDate() + " " + this.ALL_MONTHS[el.getMonth()]
      this.myChart!.data.labels?.push(element)
    })
    this.myChart!.update()
  }
}
