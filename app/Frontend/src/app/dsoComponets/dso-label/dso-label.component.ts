import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MostlyUsedDevice } from 'src/app/models/Device';
import { ProsummerWithHighestProduced, ProsummerWithHighestUsage } from 'src/app/models/Prosummer';
import { DashboardService } from 'src/app/services/dso/dashboard.service';

@Component({
  selector: 'app-dso-label',
  templateUrl: './dso-label.component.html',
  styleUrls: ['./dso-label.component.css']
})
export class DsoLabelComponent implements OnInit,AfterViewInit{
  prosummerUsage : ProsummerWithHighestUsage | null = null;
  highestUsageForProsummer!: number;
  prosummerProduced : ProsummerWithHighestProduced | null = null;
  highestProducedForProsummer!: number;
  deviceUsage : MostlyUsedDevice | null = null;
  highestUsageForDevice!: number;
  deviceProduced : MostlyUsedDevice | null = null;
  highestProducedForDevice!: number;
  constructor(private dsoService: DashboardService){}

  ngAfterViewInit(): void {

  }
  ngOnInit(): void {
    this.dsoService.getProsummerWithHighestUsage().subscribe(response=>{
      this.prosummerUsage = response
      this.highestUsageForProsummer = this.prosummerUsage.totalUsage
      this.dsoService.getProsummerWithHighestProduced().subscribe(producedProsummer=>{
        this.prosummerProduced = producedProsummer
        this.highestProducedForProsummer = this.prosummerProduced.totalProduced
      })
      this.dsoService.getDeviceWithHighestUsage().subscribe(usageDevice=>{
        this.deviceUsage = usageDevice
        this.highestUsageForDevice = this.deviceUsage.usage
      })
      this.dsoService.getDeviceWithHighestProduced().subscribe(producedDevice=>{
        this.deviceProduced = producedDevice
        this.highestProducedForDevice = this.deviceProduced.usage
      })
    });
  }
}
