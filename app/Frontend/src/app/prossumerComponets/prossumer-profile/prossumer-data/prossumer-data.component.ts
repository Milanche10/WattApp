import { Component, Input } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { AESencryptorService } from 'src/app/utils/encryptor/aesencryptor.service';
import { Global } from 'src/app/utils/global/IGlobal';
import { OnInit } from '@angular/core';
import { Prosummer } from 'src/app/models/Prosummer';
@Component({
  selector: 'app-prossumer-data',
  templateUrl: './prossumer-data.component.html',
  styleUrls: ['./prossumer-data.component.css']
})
export class ProssumerDataComponent {
  @Input() prosummer!: Prosummer

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
