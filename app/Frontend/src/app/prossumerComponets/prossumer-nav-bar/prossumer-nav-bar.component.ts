import { Component, Input } from '@angular/core';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user/user.service';
import { AESencryptorService } from 'src/app/utils/encryptor/aesencryptor.service';
import { Global } from 'src/app/utils/global/IGlobal';

@Component({
  selector: 'app-prossumer-nav-bar',
  templateUrl: './prossumer-nav-bar.component.html',
  styleUrls: ['./prossumer-nav-bar.component.css']
})
export class ProssumerNavBarComponent {
  @Input() toPage!: Function
  @Input() logout!: Function

  public glob = Global

}
