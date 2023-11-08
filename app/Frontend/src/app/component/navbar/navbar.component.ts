import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { NavBarService } from 'src/app/services/navBarService/nav-bar.service';
import { UserService } from 'src/app/services/user/user.service';
import { AESencryptorService } from 'src/app/utils/encryptor/aesencryptor.service';
import { Global } from 'src/app/utils/global/IGlobal';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public glob = Global

  constructor(
    private router: Router,
    public nav: NavBarService
  ) {
  }
  ngOnInit(): void {
  }

  // ngAfterContentChecked() {
  //   this.cdref.detectChanges()
  // }

  toPage(route: String) {
    if(this.glob.isAdmin) {
      this.router.navigate(['dso/'+route])
    }
    if(this.glob.isProssumer){
      this.router.navigate(['prosummer/'+route])
    }
  }

  logout() {
    sessionStorage.removeItem("token")
    sessionStorage.removeItem("user")
    sessionStorage.removeItem("role")
    this.router.navigate([''])
  }

  get toPageFunction() {
    return this.toPage.bind(this)
  }

  get logoutFunction() {
    return this.logout.bind(this)
  }

}
