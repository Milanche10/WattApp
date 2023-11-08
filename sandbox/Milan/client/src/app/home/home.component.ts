import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from '../_models/users';
import { AccountService } from '../_services/account.service';
import { Title } from '@angular/platform-browser';

declare const reloadd: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  items:any;
  registerMode=false;
  AddItemMode=false;
  title="Sendbox";
  constructor(private http:HttpClient,public accountService: AccountService, private titleService:Title) { 
    this.items=null;
  }

  ngOnInit(): void {
    this.getUserItems();
    this.titleService.setTitle("SendBox");
  }

  registerToggle(){
    this.registerMode = !this.registerMode;
  }
  AddItemToggle(){
    this.AddItemMode = !this.AddItemMode;
  }

  cancelRegisterMode(event: boolean)
  {
    this.registerMode = event;
  }
  cancelItemMode(event :boolean)
  {
    this.AddItemMode=event;
  }

  getUserItems(){
    var idd = JSON.parse(localStorage.getItem('user'));
    this.http.get("https://localhost:5001/api/Item/"+idd.id).subscribe(response=>{
      this.items=response;
    },error=>{
      console.log(error);
    });
  }
  deletee(id: BigInteger){
    //console.log(id);
    this.http.get("https://localhost:5001/api/delete/"+id).subscribe(response=>{
      reloadd();
    },error =>{
      console.log(error);
    })
  }
}
