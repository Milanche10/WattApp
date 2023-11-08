import { HttpClient } from '@angular/common/http';
import { isNgTemplate, ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { User } from './_models/users';
import { AccountService } from './_services/account.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Sandbox';
  users : any;
  UserID: any;

  constructor( private accountService: AccountService, private titleService:Title){}

  ngOnInit() {
    this.titleService.setTitle("SendBox");
    this.setCurentUser();
  }

  setCurentUser()
  {
    const user: User = JSON.parse(localStorage.getItem('user'));
    this.accountService.setCurrentUser(user);
  }

}
