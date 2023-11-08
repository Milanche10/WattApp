import { Component, OnInit } from '@angular/core';
import { Global } from 'src/app/utils/global/IGlobal';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  public glob = Global

  constructor() {
  }

  ngOnInit(): void {
   
   
  }

}
