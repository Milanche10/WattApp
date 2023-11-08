import { Component, Input } from '@angular/core';
import { Global } from 'src/app/utils/global/IGlobal';

@Component({
  selector: 'app-dso-nav-bar',
  templateUrl: './dso-nav-bar.component.html',
  styleUrls: ['./dso-nav-bar.component.css']
})
export class DsoNavBarComponent {
  @Input() toPage!: Function
  @Input() logout!: Function

  public glob = Global
}
