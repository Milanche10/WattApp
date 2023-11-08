import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProsummerProfileFields } from 'src/app/models/ProsummerProfileFields';

@Component({
  selector: 'app-prossumer-edit-single-data',
  templateUrl: './prossumer-edit-single-data.component.html',
  styleUrls: ['./prossumer-edit-single-data.component.css', '../../../prossumer-profile/prossumer-data/prossumer-data.component.css', '../../../prossumer-profile/prossumer-data/prossummer-single-data/prossummer-single-data.component.css']
})
export class ProssumerEditSingleDataComponent {
  @Input() label: string = "";
  @Input() data: string = "";
  @Output() dataEmmiter = new EventEmitter<ProsummerProfileFields>();

  getLabel() {
    return this.label;
  }

  getData() {
    return this.data;
  }

  onChangeValue(event: any) {

    const dataPass: ProsummerProfileFields = {
      data: event.target.value,
      label: this.label
    }
    this.dataEmmiter.emit(dataPass)
  }
}
