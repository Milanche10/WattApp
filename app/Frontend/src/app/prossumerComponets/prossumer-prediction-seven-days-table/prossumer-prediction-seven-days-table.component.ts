import { Component } from '@angular/core';
import { DailyPrediction, Prediction, PredictionDaySum, PredictionMonthSum } from 'src/app/models/Prediction';
import { DashboardService } from 'src/app/services/dso/dashboard.service';

@Component({
  selector: 'app-prossumer-prediction-seven-days-table',
  templateUrl: './prossumer-prediction-seven-days-table.component.html',
  styleUrls: ['./prossumer-prediction-seven-days-table.component.css']
})
export class ProssumerPredictionSevenDaysTableComponent {

  allPrediction: Prediction[] = [];
  arrayOFSums: DailyPrediction[] = []; 
  pageSizePredictionSeven = 3;
  public currentPagePredictionSeven:number = 1;
  totalPredictionsSeven = 0;
  encryptedId!: string;

  showAllRows = false;
  
  constructor(private dashboardService : DashboardService) {
  }
  ngOnInit(): void {
    this.encryptedId = sessionStorage.getItem("user")!
    this.dashboardService. getPredictionByProsummerForSeven(this.encryptedId).subscribe(result=>{
      this.allPrediction = result
      this.sumOFAllPrediction()
      this.totalPredictionsSeven = result.length;
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

  onTableDataChangePrediction(event: any) {
    this.currentPagePredictionSeven = event;
    this.sumOFAllPrediction();
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
