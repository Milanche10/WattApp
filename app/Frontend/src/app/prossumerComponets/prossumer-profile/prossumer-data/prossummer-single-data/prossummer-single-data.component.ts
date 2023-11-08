import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-prossummer-single-data',
  templateUrl: './prossummer-single-data.component.html',
  styleUrls: ['./prossummer-single-data.component.css']
})
export class ProssummerSingleDataComponent {
  @Input() label: string = "";
  @Input() data: string = "";

  getLabel() {
    return this.label;
  }

  getData() {
    return this.data;
  }
}
