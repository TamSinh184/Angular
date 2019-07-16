import {  BehaviorSubject } from 'rxjs';
import { Injectable, OnChanges, SimpleChanges, EventEmitter } from '@angular/core';
import { Product } from '../model/product.class';

@Injectable({
  providedIn: 'root'
})
export class DataService{
  // product: Product = {} as Product;
  private messageSource = new BehaviorSubject<Product>(null);
  currentMessage = this.messageSource.asObservable();
  constructor() { }
  // changeSidebarState(data: any) {
  //   this.messageSource.next(data);
  // }



   postProduct(data: Product){
    this.messageSource.next(data);
      // return data;
   }

   



}
