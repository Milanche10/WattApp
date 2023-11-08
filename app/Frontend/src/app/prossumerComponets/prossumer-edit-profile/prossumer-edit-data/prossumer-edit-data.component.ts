import { Component, Input } from '@angular/core';
import { Prosummer } from 'src/app/models/Prosummer';
import { ProsummerProfileFields } from 'src/app/models/ProsummerProfileFields';
import { Global } from 'src/app/utils/global/IGlobal';

@Component({
  selector: 'app-prossumer-edit-data',
  templateUrl: './prossumer-edit-data.component.html',
  styleUrls: ['./prossumer-edit-data.component.css', '../../prossumer-profile/prossumer-data/prossumer-data.component.css', '../../prossumer-profile/prossumer-data/prossummer-single-data/prossummer-single-data.component.css']
})
export class ProssumerEditDataComponent {
  @Input() prosummer!: Prosummer

  edit() {
    console.log(this.prosummer)
  }

  getData(param: ProsummerProfileFields) {
    switch(param.label) {
      case 'Ime i prezime': {
        const name = param.data.split(" ")
        this.prosummer.firstName=name[0]
        this.prosummer.lastName=name[1]
        break
      }

      case 'Email': {
        this.prosummer.email = param.data
        break
      }

      case 'Adresa': {
        this.prosummer.adress = param.data
        break
      }

      case 'JMBG': {
        this.prosummer.jbmg = param.data
        break
      }

      case 'Broj licne karte': {
        this.prosummer.brlk = param.data
        break
      }
    }
  }

  getFullName() {    
    return this.prosummer?.firstName + " " + this.prosummer?.lastName;
  }

  getEmail() {
    return this.prosummer?.email
  }

  getAddress() {
    return this.prosummer?.adress
  }

  getJMBG() {
    return this.prosummer?.jbmg
  }

  getIdentityCardNumber() {
    return this.prosummer?.brlk
  }
}
