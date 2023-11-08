import { Component } from '@angular/core';
import { DailyRecord, Record, RecordDaySum, RecordMonthSum } from 'src/app/models/Record';
import { DashboardService } from 'src/app/services/dso/dashboard.service';


@Component({
  selector: 'app-prossumer-record-seven-days-table',
  templateUrl: './prossumer-record-seven-days-table.component.html',
  styleUrls: ['./prossumer-record-seven-days-table.component.css']
})
export class ProssumerRecordSevenDaysTableComponent {

  allRecords: Record[] = [];
  arrayOFSums: DailyRecord []=[];
  pageSizeRecordsSeven = 3;
  currentPageRecordsSeven:number = 1;
  totalRecordsSeven = 0;
  encryptedId!: string;

  showAllRows = false;

  constructor(private dashboardService : DashboardService) {
  }
  ngOnInit(): void {
    this.encryptedId = sessionStorage.getItem("user")!
    this.dashboardService.getRecordsByProsummerForSeven(this.encryptedId).subscribe(result=>{
      this.allRecords = result
      this.sumOFAllRecord()
      this.totalRecordsSeven = result.length;
    })
  }

  sumOFAllRecord(): void {
    const today = new Date();
    const nextSevenDays = new Date();
    nextSevenDays.setDate(today.getDate() - 7);

    this.allRecords.forEach(record => {
      const dailyRecords: { [key: string]: { sumOFUsage: number; sumOFProduced: number } } = {};

      record.records.forEach(recordItem => {
        const dateKey = recordItem.day + '/' + record.date;
        const [day, month, year] = dateKey.split('/');
        let date: Date;

        if (year === String(today.getFullYear()) && month === String(today.getMonth() + 1) && day === String(today.getDate())) {
          date = today;
        } else {
          date = new Date(Number(year), Number(month) - 1, Number(day));
        }

        if (date <= today && date >= nextSevenDays) {
          if (!dailyRecords[dateKey]) {
            dailyRecords[dateKey] = {
              sumOFUsage: 0,
              sumOFProduced: 0
            };
          }
          dailyRecords[dateKey].sumOFUsage += recordItem.usage;
          dailyRecords[dateKey].sumOFProduced += recordItem.produced;
        }
      });

      Object.keys(dailyRecords).forEach(dateKey => {
        const [day, month, year] = dateKey.split('/');
        const date = new Date(Number(year), Number(month) - 1, Number(day));
        this.arrayOFSums.push({
          day: date,
          sumOFUsage: dailyRecords[dateKey].sumOFUsage,
          sumOFProduced: dailyRecords[dateKey].sumOFProduced
        });
      });
    });

    this.arrayOFSums.sort((a, b) => b.day.getTime() - a.day.getTime());
  }

  onTableDataChangeRecord(event: any) {
    this.currentPageRecordsSeven = event;
    this.sumOFAllRecord();
  }
  onTableSizeChange(event: any): void {
    this.totalRecordsSeven = event.target.value;
    this.currentPageRecordsSeven = 1;
    this.sumOFAllRecord();
  }

  toggleShowAllRows() {
    this.showAllRows = !this.showAllRows;
  }
  

}
