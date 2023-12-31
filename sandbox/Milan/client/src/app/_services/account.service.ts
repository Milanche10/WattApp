import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Item } from '../_models/items';
import { User } from '../_models/users';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = 'https://localhost:5001/api/';
  private currentUserSource = new ReplaySubject<User>(1);
  private UserID = new ReplaySubject<String>(1);
  curentUser$ =  this.currentUserSource.asObservable();
  constructor(private http:HttpClient) { }
  
  login(model:any)
  {
    return this.http.post(this.baseUrl+ 'account/login',model).pipe(
      map((response: User) => {
        const user = response;
        if(user){
          localStorage.setItem('user',JSON.stringify(user));
          this.currentUserSource.next(user);
        }
      })
    );
  }
  register(model:any)
  {
    return this.http.post(this.baseUrl+'account/register',model).pipe(
      map((user: User)=> {
        if(user)
        {
          localStorage.setItem('user',JSON.stringify(user));
          this.currentUserSource.next(user);
        }
      })
    )
  }
  AddItem(model:any)
  {
    return this.http.post(this.baseUrl+'account/addi',model).pipe(
      map((item: Item)=> {
        if(item)
        {
          console.log("true");
        }
      })
    )
  }
  setCurrentUser(user: User)
  {
    this.currentUserSource.next(user);
  }
  logout(){
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }
}
