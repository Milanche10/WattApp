import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../_models/users';
import { AccountService } from '../_services/account.service';
declare const reloadd: any;

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model:any={}
  constructor(public accountService: AccountService) {
   }

  ngOnInit(): void {
  }

  login(){
    this.accountService.login(this.model).subscribe(response =>{
      console.log(response);
      reloadd();
    },error =>{
      console.log(error);
    });
  }
  logout(){
    this.accountService.logout();
    reloadd();
  }
  delete(){}
}
