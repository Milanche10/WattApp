import { Options } from '@angular-slider/ngx-slider';
import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, Input, AfterViewChecked, ChangeDetectorRef, ViewChild, ElementRef, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { forkJoin } from 'rxjs';
import { DeviceDetail } from 'src/app/models/Device';
import { Prediction, predictions } from 'src/app/models/Prediction';
import { Record, records } from 'src/app/models/Record';
import { DeviceService } from 'src/app/services/deviceService/device.service';

@Component({
  selector: 'app-prosumer-energy-info',
  templateUrl: './prosumer-energy-info.component.html',
  styleUrls: ['./prosumer-energy-info.component.css'],
  providers: [DatePipe]
})
export class ProsumerEnergyInfoComponent implements AfterViewInit, AfterViewChecked  {
  @Input() device!: DeviceDetail;
  energyTypeText: string | undefined;
  energyDaysPrediction: Chart | undefined;
  backgroundColor!: string;

  predictionData: EnergyData[] = [];

  isEnergyPredictionsSelected: boolean = true;
  isEnergyHistorySelected: boolean = false;

  doesExistHistoryData: boolean = true;

  HistoryType = HistoryType
  historyData: EnergyData[] = [];
  selectedHistoryType: HistoryType = HistoryType.HOURS;
  
  selectedYearHistory = 0;
  selectedMonthHistory = 0;
  selectedDayHistory = 0;

  energyHistory: YearData = {};

  yearOptions!: Options;

  monthOptions: Options = {
    floor: 0,
    showTicks: false,
    translate: (value: number): string => {
      return this.monthLabels[value];
    }
  };

  dayOptions: Options = {
    floor: 0,
    showTicks: false,
    translate: (value: number): string => {
      return (value + 1).toString();
    }
  }

  energyHistoryChart: Chart | undefined;

  monthLabels: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  dayLabels: string[] = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31].map(d => d.toString())


  yearLabels: string[] = [
  ]

  historyDataLoaded = false;

  historyChartData: EnergyData[] = [];
  historyDataChanged = false;
  historyChartLabelX = "Month"

  constructor(
    private deviceService: DeviceService,
    private datePipe: DatePipe,
    private cdr: ChangeDetectorRef) {
  }

  ngAfterViewChecked() {
    if (this.historyDataChanged) {
      this.updateHistoryChart();
      this.historyDataChanged = false;
    }
  }

  updateHistoryChart() {
      this.loadHistoryChartData();
      this.energyHistoryChart!.data.labels = this.historyChartData.map(hcd => hcd.date);
      this.energyHistoryChart!.data.datasets[0].data = this.historyChartData.map(hcd => hcd.energy);
      // Call update() on the chart instance to apply the changes
      this.energyHistoryChart!.update();
  }

  ngAfterViewInit(): void {
    if(this.device.type.trim().toLowerCase() == "potrosac") {
      this.energyTypeText = "Consumption"
      this.backgroundColor = 'royalblue'
    } else {
      this.energyTypeText = "Production"
      this.backgroundColor = 'lightgreen'
    }

    this.cdr.detectChanges()

    this.loadPredictions();
    // this.loadEnergyHistory();
  }

  loadPredictions() {

    // prediction for 7 days before and next 7 days
    forkJoin([
      this.deviceService.getLastSevenDaysEnergyByDevice(this.device.id),
      this.deviceService.getPredictionsForSevenDaysBeforeByDevice(this.device.id),
      this.deviceService.getPredictionsForSevenDaysByDevice(this.device.id)
    ]).subscribe(([recordBefore, predictionBefore, predictionAfter]) => {

      this.historyData = []
      this.predictionData = []

      const deviceTypeTxt = this.device!.type == 'Potrosac' ? 'usage' : 'produced';
      const currentDate = new Date();
      const historyDate = new Date();
      historyDate.setDate(currentDate.getDate() - 6) //  days before
      
      // Records and predictions seven days before\
      
      for(let i = 0; i < 6; i++) {
        const nextDate = new Date();
        nextDate.setDate(historyDate.getDate() + i);
        const formattedDate = this.datePipe.transform(nextDate, 'dd. MM. yyyy');
        // const day = this.datePipe.transform(nextDate, 'EEEE')
        const day = nextDate.getDate();

        let energyRecord: number = this.getEnergyFromRecords(recordBefore[0], day, deviceTypeTxt)
        energyRecord += this.getEnergyFromRecords(recordBefore[1], day, deviceTypeTxt);
        const dataRecord = {
          date: formattedDate!,
          energy: energyRecord
        }

        let energyPrediction: number = this.getEnergyFromPredictions(predictionBefore[0], day, deviceTypeTxt)
        energyPrediction += this.getEnergyFromPredictions(predictionBefore[1], day, deviceTypeTxt);
        
        const dataPrediction = {
          date: formattedDate!,
          energy: energyPrediction
        }

        this.historyData.push(dataRecord)
        this.predictionData.push(dataPrediction)
      }

      //add current date record
      const nextDate = new Date();
      nextDate.setDate(currentDate.getDate())
      const formattedDate = this.datePipe.transform(nextDate, 'dd. MM. yyyy');
      const day = nextDate.getDate();

      let energyRecord: number = this.getEnergyFromRecords(recordBefore[0], day, deviceTypeTxt)
      energyRecord += this.getEnergyFromRecords(recordBefore[1], day, deviceTypeTxt);
      
      const dataRecord = {
        date: formattedDate!,
        energy: energyRecord
      }

      this.historyData.push(dataRecord)

      for(let i = 0; i < 7; i++) {
        const nextDate = new Date();
        nextDate.setDate(currentDate.getDate() + i);
        const formattedDate = this.datePipe.transform(nextDate, 'dd. MM. yyyy');
        // const day = this.datePipe.transform(nextDate, 'EEEE')
        const day = nextDate.getDate();
        
        let energy: number = this.getEnergyFromPredictions(predictionAfter[0], day, deviceTypeTxt)
        // get predictions from next month
        energy += this.getEnergyFromPredictions(predictionAfter[1], day, deviceTypeTxt);
        
        const data = {
          date: formattedDate!,
          energy: energy
        }

        this.predictionData.push(data)
      }

      // this.historyData = this.predictionData.slice(0, 8)
      this.addPredictionChart();
    })
  }

  private getEnergyFromPredictions(prediction: Prediction, day: number, deviceType: 'usage' | 'produced'): number {
    if(!prediction) {
      return 0;
    }
    let energy;
  
    if(deviceType == 'usage') {
      energy = this.__getEnergyFromPredictions(prediction, day, 'usage')
    } else {
      energy = this.__getEnergyFromPredictions(prediction, day, 'produced')
    }
    return energy;
  }

  private getEnergyFromRecords(record: Record, day: number, deviceType: 'usage' | 'produced'): number {
    if(!record) {
      return 0;
    }
    let energy;
  
    if(deviceType == 'usage') {
      energy = this.__getEnergyFromRecords(record, day, 'usage')
    } else {
      energy = this.__getEnergyFromRecords(record, day, 'produced')
    }
    return energy;
  }

  private __getEnergyFromPredictions(prediction: Prediction, day: number, deviceType: 'usage' | 'produced'): number {
    let energy = 0;
    const predictions: predictions[] = prediction.predictions;

    for(const p of predictions) {
      if (day == Number(p.day)) {
        energy += p[deviceType];
      } 
    }

    return energy;
  }

  private __getEnergyFromRecords(record: Record, day: number, deviceType: 'usage' | 'produced'): number {
    let energy = 0;
    const records: records[] = record.records;

    for(const r of records) {
      if (day == Number(r.day)) {
        energy += r[deviceType];
      } 
    }

    return energy;
  }

  addPredictionChart() {
    this.energyDaysPrediction = new Chart("energy-days-prediction-line", {
      type: 'line',
      data: {
        labels: this.predictionData.map(p => p.date.split(". ")[0]),
        datasets: [{
            label: `${this.energyTypeText} history`,
            data: this.historyData.map(p => p.energy),
            fill: false,
            borderColor: this.backgroundColor,
            backgroundColor: this.backgroundColor,
            tension: 0.1,
            borderWidth: 2,
          }, {
            label: `${this.energyTypeText} prediction`,
            data: this.predictionData.map(p => p.energy),
            fill: false,
            borderColor: 'orange',
            backgroundColor: 'orange',
            tension: 0.1,
            borderWidth: 1,
            borderDash: [5, 5]
          }
        ]
      },
      options: {
        scales: {
          x: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Day',
              color: 'white',
              // align: 'end',
              padding: 10,
            }
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'kW / h',
              color: 'white',
              // align: 'end',
              padding: 10,
            },
            // ticks: {
            //   callback: function (value) {
            //     return value + ' kW/h';
            //   }
            // }
          },
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: function (context) {
                var label = context.dataset.label || '';
                var value = context.parsed.y || 0;
                return label + ': ' + value.toFixed(1) + ' kW/h';
              }
            }
          }
        }
      }
    })
  }

  loadEnergyHistory(): void {

    this.deviceService.getMonthlyEnergyByDevice(this.device.id)
      .subscribe(response => {
        if(response.length == 0) {
          this.doesExistHistoryData = false;
          return;
        } 

        const currentDate = new Date();

        for(const record of response) {
          const deviceTypeTxt = this.device!.type == 'Potrosac' ? 'usage' : 'produced';
          const [month, year] = record.date.split("/")
          
          if(!this.energyHistory[year]) {
            this.energyHistory[year] = {}
          }
          
          let upperMargin = 12;
          if(currentDate.getFullYear() == Number(year)) {
            upperMargin = currentDate.getMonth() + 1
          }
  
          for(let i = 1; i <= upperMargin; i++) {
            this.energyHistory[year][i.toString()] = {}
          }

          let maxDays!: number;
          if(currentDate.getFullYear() == Number(year) &&
            currentDate.getMonth() + 1 == Number(month)) {
              maxDays = currentDate.getDate()
          }
          else {
            maxDays = Number(this.dayLabels[Number(month) - 1])
          }
          
          for(let i = 1; i <= maxDays; i++) {
            this.energyHistory[year][month][i.toString()] = {}
            for(let j = 0; j < 24; j++) {
              this.energyHistory[year][month][i.toString()][j.toString()] = 0
            }
          } 
          
          for(const r of record.records) {
            this.energyHistory[year][month][r.day][r.hour] += r[deviceTypeTxt]
          }
        }

        this.yearLabels = []
        for(let year in this.energyHistory) {
          this.yearLabels.push(year)
        }

        this.yearOptions = {
          floor: 0,
          ceil: this.yearLabels.length - 1,
          showTicks: false,
          translate: (value: number): string => {
            return this.yearLabels[value];
          }
        }

        this.selectedYearHistory = this.yearLabels.length - 1
        this.loadMonthOptions()
        
        this.historyDataLoaded = true; // signal for sliders to be visible
        this.cdr.detectChanges()
        this.addHistoryChart();
      })
  }

  loadMonthOptions(): void {
    const months = Object.keys(this.energyHistory[this.yearLabels[this.selectedYearHistory]])

    const ceil = Number(months[months.length - 1]) - 1
    
    this.monthOptions = {
      ...this.monthOptions,
      ceil: ceil
    }
    this.selectedMonthHistory = ceil

    this.loadDayOptions()
  }

  loadDayOptions(): void {
    const year: string = this.yearLabels[this.selectedYearHistory]
    const month: string = (this.selectedMonthHistory + 1).toString()

    const currentDate = new Date();
    let ceil: number;
    if(currentDate.getMonth() + 1 == Number(month)) {
      const days = Object.keys(this.energyHistory[year][month])
      ceil = Number(days[days.length - 1]) - 1
    } else {
      ceil = Number(this.dayLabels[Number(month) - 1]) - 1
    }
    
    this.dayOptions = {
      ...this.dayOptions,
      ceil: ceil
    }

    this.selectedDayHistory = ceil

    this.loadHistoryChartData()
  }

  addHistoryChart(): void {

    this.energyHistoryChart = new Chart("energy-history-chart", {
      type: 'line',
      data: {
        labels: this.historyChartData.map(hcd => hcd.date),
        datasets: [{
            label: `${this.energyTypeText} history`,
            data: this.historyChartData.map(hcd => hcd.energy),
            fill: false,
            borderColor: this.backgroundColor,
            backgroundColor: this.backgroundColor,
            tension: 0.1,
            borderWidth: 1,
          }]
      },
      options: {
        scales: {
          x: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Time period',
              color: 'white',
              // align: 'end',
              padding: 10,
            }
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'kW / h',
              color: 'white',
              // align: 'end',
              padding: 10,
            },
            // ticks: {
            //   callback: function (value) {
            //     return value + ' kW/h';
            //   }
            // }
          },
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: function (context) {
                var label = context.dataset.label || '';
                var value = context.parsed.y || 0;
                return label + ': ' + value.toFixed(1) + ' kW/h';
              }
            }
          }
        }
      }
    })
  }

  loadHistoryChartData(): void {
    this.historyChartData = [];
    const selectedYear: string = this.yearLabels[this.selectedYearHistory]
    const selectedMonth: number = this.selectedMonthHistory + 1
      
    if(this.selectedHistoryType == HistoryType.MONTHS) {
      const months = this.energyHistory[selectedYear]
      
      for(let month in months) {
        let energy = 0;
        for(let day in months[month]) {
          for(let hour in months[month][day]) {
            energy += months[month][day][hour]
          }
        }
        const obj: EnergyData = {
          date: this.monthLabels[Number(month) - 1],
          energy: energy
        }
        this.historyChartData.push(obj)
      }
    } else if(this.selectedHistoryType == HistoryType.DAYS) {
      const days = this.energyHistory[selectedYear][selectedMonth]
      for(let day in days) {
        let energy = 0;
        for(let hour in days[day]) {
          energy += days[day][hour]
        } 
        const obj: EnergyData = {
          date: day,
          energy: energy
        }
        this.historyChartData.push(obj)
      }
    } else {
      const selectedDay: number = this.selectedDayHistory + 1;

      if(selectedMonth in this.energyHistory[selectedYear]) {
        const hours = this.energyHistory[selectedYear][selectedMonth][selectedDay]
        for(let hour in hours) {
          const obj: EnergyData = {
            date: hour,
            energy: hours[hour]
          }
          this.historyChartData.push(obj)
        }
      }
    }

    this.historyDataChanged = true; // for optimization in AfterViewChecked
  }

  changeHistoryType(historyType: HistoryType) {
    this.selectedHistoryType = historyType;
    this.loadHistoryChartData()
  }

  showEnergyPredictions(): void {
    this.isEnergyPredictionsSelected = true;
    this.isEnergyHistorySelected = false;
    this.energyHistory = {}
    this.loadPredictions()
  }

  showEnergyHistory(): void {
    this.isEnergyHistorySelected = true;
    this.isEnergyPredictionsSelected = false;
    this.predictionData = []
    this.loadEnergyHistory()
  }

  getPredictionDate(prediction: EnergyData) {
    const [day, month, _] = prediction.date.split(". ");
    return `${this.monthLabels[Number(month)-1]} ${day}`
  }

  getHistoryTableHeading(): string {
    if(this.selectedHistoryType == HistoryType.MONTHS) {
      return "Month";
    } else if(this.selectedHistoryType == HistoryType.DAYS) {
      return "Day"
    } else {
      return "Hour"
    }
  }
  getHistoryChartTitle(): string {
    let historyTitle = `History of energy ${this.energyTypeText?.toLowerCase()} per `;
    if(this.selectedHistoryType == HistoryType.MONTHS) {
      historyTitle += 'months'
    } else if(this.selectedHistoryType == HistoryType.DAYS) {
      historyTitle += 'days'
    } else {
      historyTitle += 'hours'
    }

    return historyTitle
  }

  getHistoryDataSum(): number {
    return this.historyChartData.reduce((acc, curr) => acc + curr.energy, 0)
  }
}

interface EnergyData {
  date: string,
  energy: number
}

export enum HistoryType {
  MONTHS,
  DAYS,
  HOURS
}

interface HourData {
  [hour: string]: number; // Replace 'any' with the desired value type
}

interface DayData {
  [day: string]: HourData;
}

interface MonthData {
  [month: string]: DayData;
}

interface YearData {
  [year: string]: MonthData;
}