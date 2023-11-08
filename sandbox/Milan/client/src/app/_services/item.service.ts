import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Item } from '../_models/items';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  baseUrl = 'https://localhost:5001/api/';
  constructor(private http: HttpClient) { }

  AddItem(model:any)
  {
    return this.http.post(this.baseUrl+'add/register',model).pipe(
      map((item: Item)=> {
        if(item)
        {
          console.log("true");
        }
      })
    )
  }
}
