import { Component } from '@angular/core';
import { Prediction, PredictionMonthSum, PredictionDaySum, DailyPrediction } from 'src/app/models/Prediction';
import { DashboardService } from 'src/app/services/dso/dashboard.service';

@Component({
  selector: 'app-dso-prediction-seven-days-table',
  templateUrl: './dso-prediction-seven-days-table.component.html',
  styleUrls: ['./dso-prediction-seven-days-table.component.css']
})
export class DsoPredictionSevenDaysTableComponent {
  allPrediction: Prediction[] = [];
  arrayOFSums: DailyPrediction[] = [];  
  pageSizePredictionSeven = 3;
  public currentPagePredictionSeven: number = 1;
  totalPredictionsSeven = 0;

  showAllRows = false;


  constructor(private dashboardService : DashboardService) {
  }
  ngOnInit(): void {
    this.dashboardService.getPredictionForSevenDays().subscribe(result=>{
      this.allPrediction = result
      console.log(this.allPrediction)
      this.sumOFAllPrediction()
      this.totalPredictionsSeven = this.arrayOFSums.length;
    })
  } 

  sumOFAllPrediction(): void {
    this.arrayOFSums = [];
  
    const today = new Date();
    const nextSevenDays = new Date();
    nextSevenDays.setDate(today.getDate() + 7);
  
    this.allPrediction.forEach(prediction => {
      const dailyPredictions: { [key: string]: { sumOFUsage: number; sumOFProduced: number } } = {};
  
      prediction.predictions.forEach(predictionItem => {
        const dateKey = predictionItem.day + '/' + prediction.date;
        const [day, month, year] = dateKey.split('/');
        let date: Date;
  
        if (year === String(today.getFullYear()) && month === String(today.getMonth() + 1) && day === String(today.getDate())) {
          date = today;
        } else {
          date = new Date(Number(year), Number(month) - 1, Number(day));
        }
  
        if (date >= today && date <= nextSevenDays) {
          if (!dailyPredictions[dateKey]) {
            dailyPredictions[dateKey] = {
              sumOFUsage: 0,
              sumOFProduced: 0
            };
          }
          dailyPredictions[dateKey].sumOFUsage += predictionItem.usage;
          dailyPredictions[dateKey].sumOFProduced += predictionItem.produced;
        }
      });
  
      Object.keys(dailyPredictions).forEach(dateKey => {
        const [day, month, year] = dateKey.split('/');
        const date = new Date(Number(year), Number(month) - 1, Number(day));
        this.arrayOFSums.push({
          day: date,
          sumOFUsage: dailyPredictions[dateKey].sumOFUsage,
          sumOFProduced: dailyPredictions[dateKey].sumOFProduced
        });
      });
    });
  
    this.arrayOFSums.sort((a, b) => a.day.getTime() - b.day.getTime());
  }
/*
  sumOFAllPredction():void{
    let sumUsage: number = 0
    let sumProduced: number = 0
    this.arrayOFSums = this.allPrediction.map((prediction)=>{
      return {
          date: new Date(Number(prediction.date.split('/')[1]), Number(prediction.date.split('/')[0])-1),
          sumOFUsage: prediction.predictions.reduce((accumulator, element) => {
            return accumulator + element.usage;
          }, 0),
          sumOFProduced: prediction.predictions.reduce((accumulator, element) => {
            return accumulator + element.produced;
          }, 0)
      } as PredictionMonthSum
    })
    this.arrayOFSums.sort((a,b)=>{
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      return a.date.valueOf() - b.date.valueOf();
    });
  }
*/
 
/*
  sumOFAllPrediction(): void {
 
    let sumUsage: number = 0;
    let sumProduced: number = 0;
    let map = new Map<string, PredictionDaySum>();
  
    this.allPrediction.forEach((prediction)=>{
      prediction.predictions.forEach((element)=>{
        let predictionDaySum=map.get(element.day);
        if(predictionDaySum){
          predictionDaySum.sumOFProduced+=element.produced;
          predictionDaySum.sumOFUsage+=element.usage;
        }else{
          predictionDaySum={
            day:element.day,
            sumOFUsage:element.usage,
            sumOFProduced:element.produced
          };
          map.set(element.day, predictionDaySum);
        }
      });
    });
    this.arrayOFSumsPredictions=Array.from(map.values());

    this.arrayOFSumsPredictions.sort((a,b)=>{
      return a.day.localeCompare(b.day);
    });
}
*/

onTableDataChangePrediction(table:number,event: any) {
  if(table===2)
  {
      this.currentPagePredictionSeven = event;
  this.sumOFAllPrediction();
  }

}

onTableSizeChange(event: any): void {
  this.totalPredictionsSeven = event.target.value;
  this.currentPagePredictionSeven = 1;
  this.sumOFAllPrediction();
}

toggleShowAllRows() {
  this.showAllRows = !this.showAllRows;
}


}
