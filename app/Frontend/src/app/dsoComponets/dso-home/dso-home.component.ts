import { Component, Input } from '@angular/core';
import { Global } from 'src/app/utils/global/IGlobal';

@Component({
  selector: 'app-dso-home',
  templateUrl: './dso-home.component.html',
  styleUrls: ['./dso-home.component.css']
})
export class DsoHomeComponent {

  @Input() toPage!: Function

  public glob = Global
}
