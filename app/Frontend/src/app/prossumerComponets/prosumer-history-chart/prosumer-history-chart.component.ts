import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Chart, ChartType } from 'chart.js';
import { Prosummer } from 'src/app/models/Prosummer';
import { records, Record } from 'src/app/models/Record';
import { DashboardService } from 'src/app/services/dso/dashboard.service';
import { AESencryptorService } from 'src/app/utils/encryptor/aesencryptor.service';

@Component({
  selector: 'app-prosumer-history-chart',
  templateUrl: './prosumer-history-chart.component.html',
  styleUrls: ['./prosumer-history-chart.component.css']
})
export class ProsumerHistoryChartComponent implements OnInit, AfterViewInit{
  type: ChartType = 'bar'
  selectedTimePeriod: string =''
  timePeriod: string = ''
  labels: string[] = [];
  produceds : number[] = [0,0,0,0,0,0,0,0,0,0,0,0]
  usages : number[] = [0,0,0,0,0,0,0,0,0,0,0,0]
  producedsMonth : number[] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
  usagesMonth : number[] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
  myChart: Chart | null = null;
  allRecords: Record[] = [];
  selectedYear : number = 0
  selectedMonth : number = 1
  months = new Set()
  years = new Set()

  prosummer! : Prosummer
  encryptedId!: string;


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
              backgroundColor:"#0196FD",
              borderColor: "#0196FD",
              borderWidth: 1
          },
          {
            label: 'Produced',
            data: this.produceds,
            backgroundColor:"#FFAF00",
            borderColor: "#FFAF00",
            borderWidth: 1
        }]
      },
      options: {
          scales: {
              y: {
                  beginAtZero: true
              }
          }
      }
    });
  }

  ngOnInit(): void {
    this.encryptedId = sessionStorage.getItem("user")!
    this.dashboardService.getMonthlyRecordsByProsummer(this.encryptedId).subscribe(result=>{
      this.allRecords = result
      this.getAllYears();
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
  }


  getAllYears() : void{
    this.allRecords.forEach(element =>{
      this.years.add(element.date.split('/')[1])
    })
  }


  calculateUsageAndProducedForMonth() :  void{
    this.allRecords.forEach(element =>{
      if(this.selectedMonth.toString() == element.date.split('/')[0] && this.selectedYear.toString() == element.date.split('/')[1]){
        element.records.forEach(record=>{
          this.usagesMonth[Number(record.day)] += Number(record.usage)
          this.producedsMonth[Number(record.day)] += Number(record.produced)
        })
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
