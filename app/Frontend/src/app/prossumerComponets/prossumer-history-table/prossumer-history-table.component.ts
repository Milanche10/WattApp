import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dso/dashboard.service';
import { records, Record, RecordMonthSum } from 'src/app/models/Record';
import { elements } from 'chart.js';

@Component({
  selector: 'app-prossumer-history-table',
  templateUrl: './prossumer-history-table.component.html',
  styleUrls: ['./prossumer-history-table.component.css']
})
export class ProssumerHistoryTableComponent {
  allRecords: Record[] = [];
  arrayOFSums: RecordMonthSum[]=[];
  pageSize = 10;
  currentPage:number = 1;
  totalRecords = 0;
  encryptedId! : string
  constructor(private dashboardService : DashboardService) {
  }
  ngOnInit(): void {
    this.encryptedId = sessionStorage.getItem("user")!
    this.dashboardService.getMonthlyRecordsByProsummer(this.encryptedId).subscribe(result=>{
      this.allRecords = result
      //console.log(this.allRecords)
      this.sumOFAllRecords()
      this.totalRecords = result.length;
    })
  }

  sumOFAllRecords():void{
    let sumUsage: number = 0
    let sumProduced: number = 0
    this.arrayOFSums = this.allRecords.map((record)=>{
      return {
          date: new Date(Number(record.date.split('/')[1]), Number(record.date.split('/')[0])-1),
          sumOFUsage: record.records.reduce((accumulator, element) => {
            return accumulator + element.usage;
          }, 0),
          sumOFProduced: record.records.reduce((accumulator, element) => {
            return accumulator + element.produced;
          }, 0)
      } as RecordMonthSum
    })
    this.arrayOFSums.sort((a,b)=>{
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      return b.date.valueOf() - a.date.valueOf();
    });
  }

  onTableDataChange(event: any) {
    this.currentPage = event;
    this.sumOFAllRecords();
  }
  onTableSizeChange(event: any): void {
    this.totalRecords = event.target.value;
    this.currentPage = 1;
    this.sumOFAllRecords();
  }
}
