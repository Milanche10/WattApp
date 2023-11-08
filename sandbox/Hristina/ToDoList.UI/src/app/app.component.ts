import { Component } from '@angular/core';
import { Task } from "./task";
import { takeLast } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'To Do List';
  list:any[] = [];
  
  addTask(item:string)
  {
    let task = new Task();
    task.id = this.list.length;
    task.input = item;
    task.checked = false;
    this.list.push({id:this.list.length, name:item});
    //this.list.push(task);
    console.warn(item);
  }

  removeTask(id:number)
  {
    console.warn(id);
    this.list=this.list.filter(item=>item.id!==id);
  }

}

