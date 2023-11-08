import { Component } from '@angular/core';
import { Prosummer } from 'src/app/models/Prosummer';
import { DashboardService } from 'src/app/services/dso/dashboard.service';

@Component({
  selector: 'app-prossumer-edit-profile',
  templateUrl: './prossumer-edit-profile.component.html',
  styleUrls: ['./prossumer-edit-profile.component.css', "../prossumer-profile/prossumer-profile.component.css"]
})
export class ProssumerEditProfileComponent {
  prosummer!:Prosummer
  constructor(private dsoService: DashboardService){
    this.dsoService.getProsummerById(sessionStorage.getItem("user")!).subscribe(response=>{
      this.prosummer = response;
    });
  }
}
