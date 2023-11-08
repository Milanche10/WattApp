import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavBarService } from 'src/app/services/navBarService/nav-bar.service';

@Component({
  selector: 'app-pagenotfound',
  templateUrl: './pagenotfound.component.html',
  styleUrls: ['./pagenotfound.component.css']
})
export class PagenotfoundComponent {
  constructor (
    private router: Router,
    private navService: NavBarService
  ) {
    this.navService.hide()
  }

  toHomePage() {
    this.navService.show()
    this.router.navigate([''])
  }
}
