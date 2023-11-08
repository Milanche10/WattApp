import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { AccountService } from '../_services/account.service';

declare const reloadd: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  model: any={};

  constructor(private acountService: AccountService) { }

  ngOnInit(): void {
  }

  register(){
    this.acountService.register(this.model).subscribe(respone=>{
      localStorage.removeItem('user');
      reloadd();
    })
  }

  cancel(){
    this.cancelRegister.emit(false);
  }
}
