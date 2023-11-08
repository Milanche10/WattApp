import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder,FormGroup } from '@angular/forms';
import { ItemService } from '../_services/item.service';
declare const reloadd: any;

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {
  @Output() cancelItem = new EventEmitter();
  model: any={};
  str3: any;
  form: FormGroup;
  constructor(private http:HttpClient,private accountService: AccountService,public fb: FormBuilder) { 
    this.form = this.fb.group({
      Naziv: [''],
      userid: []
    })
  }

  ngOnInit(): void {
    var temp = JSON.stringify(localStorage.getItem("user"));
     var str1 = temp.split("\\",3)[2];
     var str2 = str1.split(":")[1];
      this.str3 = str2.split(",")[0];
      this.str3 = Number(this.str3);
  }
  submitForm() {
    console.log(this.form.value);
    this.accountService.AddItem(this.form.value).subscribe(response=>{
      reloadd();
    },error=>{
      console.log(error);
    });
  }
  cancel(){
    this.cancelItem.emit(false);
  }
}
