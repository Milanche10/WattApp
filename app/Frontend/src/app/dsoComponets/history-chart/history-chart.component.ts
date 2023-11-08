import { AfterViewInit, Component, OnInit, ɵpublishDefaultGlobalUtils,ElementRef,ViewChild} from '@angular/core';
import { records, Record } from 'src/app/models/Record';
import { DashboardService } from 'src/app/services/dso/dashboard.service';
import Chart from 'chart.js/auto'
import { ChartConfiguration, ChartType, ChartTypeRegistry } from 'chart.js';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-history-chart',
  templateUrl: './history-chart.component.html',
  styleUrls: ['./history-chart.component.css'],
})
export class HistoryChartComponent implements OnInit, AfterViewInit {
  //@ViewChild('myChart') private chartCanvas: ElementRef;

  type: ChartType = 'line'
  selectedTimePeriod: string =''
  timePeriod: string = ''
  labels: string[] = [];
  produceds : number[] = [0,0,0,0,0,0,0,0,0,0,0,0]
  usages : number[] = [0,0,0,0,0,0,0,0,0,0,0,0]
  producedsMonth : number[] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
  usagesMonth : number[] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
  producedsDay : number[] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
  usagesDay : number[] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
  myChart: Chart | null = null;
  allRecords: Record[] = [];
  selectedYear : number = 0
  selectedMonth : string = ""
  selectedDay : number = 1
  months = new Set()
  years = new Set()
  days = new Set()
  ALL_MONTHS = [ 'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December' ]


  constructor(private dashboardService : DashboardService) {
  }
  ngAfterViewInit(): void {
    this.myChart = new Chart("myChart", {
      type: this.type,
      data: {
          labels: this.labels,
          datasets: [{
              label: 'Usage',
              data: this.usages,
              fill: false,
              borderColor: 'orange',
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
              text:'Month / Day',
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
    this.dashboardService.getMonthlyRecords().subscribe(result => {
      this.allRecords = result;
      this.getAllYears();
      this.selectedYear = 2023;
      this.selectedTimePeriod = 'year';
      this.createHistoryChartYearly();
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

  onTimePeriodChange():void{
    if (this.selectedTimePeriod === 'year') {
      this.timePeriod = 'year';
    } else if (this.selectedTimePeriod === 'month') {
      this.timePeriod = 'month';
    }
    else if(this.selectedTimePeriod === 'day'){
      this.timePeriod = 'day';
    }
  }


  getAllYears() : void{
    this.allRecords.forEach(element =>{
      this.years.add(element.date.split('/')[1])
    })
  }

  calculateUsageAndProducedForDay() : void{
    this.allRecords.forEach(element =>{
      console.log(this.selectedMonth);

      if(this.selectedMonth.toString() == element.date.split('/')[0] && this.selectedYear.toString() == element.date.split('/')[1]){
        element.records.forEach(record=>{
          if(this.selectedDay.toString() == record.day){
            this.usagesDay[Number(record.hour)] += Number(record.usage)
            this.producedsDay[Number(record.hour)] += Number(record.produced)
          }
        })
      }
    })
  }


  calculateUsageAndProducedForMonth() :  void{
    this.days.clear()
    this.allRecords.forEach(element =>{
      if(this.selectedMonth.toString() == element.date.split('/')[0] && this.selectedYear.toString() == element.date.split('/')[1]){
        element.records.forEach(record=>{
          this.days.add(record.day)
          this.usagesMonth[Number(record.day)] += Number(record.usage)
          this.producedsMonth[Number(record.day)] += Number(record.produced)
        })
        this.days = new Set([...this.days].sort((a, b) => Number(a) - Number(b)));
      }
    })
  }

  calculateUsageAndProducedYearly() : void{
    this.months.clear()

    this.allRecords.forEach(element =>{
      if(element.date.split('/')[1] == this.selectedYear.toString()){
        this.months.add(element.date.split('/')[0])
        element.records.forEach(record=>{
          this.usages[Number(element.date.split('/')[0])-1] += Number(record.usage)
          this.produceds[Number(element.date.split('/')[0])-1] += Number(record.produced)
        })
      }
    })
  }


  createHistoryChartYearly() : void{
    this.selectedMonth = "0";
    this.selectedDay=0;
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

  createHistoryChartDay() : void{
    this.calculateUsageAndProducedForDay()
    this.labels = [];
    for (let index = 1; index < 24; index++) {
     this.labels.push(String(index))
    }
    this.refreshChart(this.usagesDay,this.producedsDay)
  }

  getIndexOfMonth(month: any): number {
    for(let i = 0; i < this.ALL_MONTHS.length; i++) {
      if(this.ALL_MONTHS[i] == month)
        return i + 1;
    }

    return -1;
  }

  getNameOfMonth(index: any) {
    return this.ALL_MONTHS[index - 1]
  }

}
