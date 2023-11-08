import { Component } from '@angular/core';
import { Prosummer } from 'src/app/models/Prosummer';
import { DashboardService } from 'src/app/services/dso/dashboard.service';

@Component({
  selector: 'app-prossumer-profile',
  templateUrl: './prossumer-profile.component.html',
  styleUrls: ['./prossumer-profile.component.css']
})
export class ProssumerProfileComponent {
  prosumer!:Prosummer
  constructor(private dsoService: DashboardService){
    this.dsoService.getProsummerById(sessionStorage.getItem("user")!).subscribe(response=>{
      this.prosumer = response;
    });
  }
}
