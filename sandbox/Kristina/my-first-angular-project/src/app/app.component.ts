import { Component } from '@angular/core';
import { Model } from './Models/model';
import { ServiceService } from './Services/service.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-first-angular-project';
  models:Model[]=[];

  constructor(private serviceService: ServiceService){}
  ngOnInit():void{
    this.models=this.serviceService.getModel();
    console.log(this.models);
  }
}
