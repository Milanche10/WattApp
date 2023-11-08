import { Component } from '@angular/core';
import { Prediction, PredictionMonthSum } from 'src/app/models/Prediction';
import { DashboardService } from 'src/app/services/dso/dashboard.service';

@Component({
  selector: 'app-dso-prediction-table',
  templateUrl: './dso-prediction-table.component.html',
  styleUrls: ['./dso-prediction-table.component.css']
})
export class DsoPredictionTableComponent {
  allPrediction: Prediction[] = [];
  arrayOFSums: PredictionMonthSum[]=[];
  pageSizePrediction = 10;
  currentPagePrediction:number = 1;
  totalPredictions = 0;
  constructor(private dashboardService : DashboardService) {
  }
  ngOnInit(): void {
    this.dashboardService.getMonthlyPredictions().subscribe(result=>{
      this.allPrediction = result
      this.sumOFAllPredction()
      this.totalPredictions = result.length;
    })
  }

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

  onTableDataChangePrediction(event: any) {
    this.currentPagePrediction = event;
    this.sumOFAllPredction();
  }
  onTableSizeChange(event: any): void {
    this.totalPredictions = event.target.value;
    this.currentPagePrediction = 1;
    this.sumOFAllPredction();
  }
}
