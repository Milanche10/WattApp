import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { User } from './User';
import { UserService } from 'src/services/user.services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
 
  users: User[]=[];
  title = 'User';
  userToEdit?:User;

  constructor(private userService:UserService){}
 
  ngOnInit(): void {
    this.userService
    .getUsers()
    .subscribe((result: User[])=>(this.users=result));
  }

  updateUserList(users:User[]){
    this.users=users;
  }

  initNewUser(){
    this.userToEdit=new User();
  }
  editUser(user:User){

    this.userToEdit=user;
  }



}
