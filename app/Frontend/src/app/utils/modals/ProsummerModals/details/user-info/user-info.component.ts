import { Component, Input, OnInit } from '@angular/core';
import { ProsummerDetail, ProsummerExtended } from 'src/app/models/Prosummer';
import { Global } from 'src/app/utils/global/IGlobal';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent {
  @Input() data!: ProsummerExtended
  
  glob = Global.modalHeader = "Prosummer Details"

}
