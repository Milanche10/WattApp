import { Injectable } from '@angular/core';
import { Model } from '../Models/model';
@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor() { }

  public getModel(): Model[]{
    let model=new Model();
    model.id=1;
    model.name="A";

    return [model];
}
}
