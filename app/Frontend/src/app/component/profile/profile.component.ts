import { Component } from '@angular/core';
import { Global } from 'src/app/utils/global/IGlobal';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  public glob = Global

  constructor() {
  }

}
