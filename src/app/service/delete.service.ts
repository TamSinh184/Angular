import { Product } from './../model/product.class';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeleteService {
  private deleteProduct = new BehaviorSubject<Product>(null);
  currentMessage = this.deleteProduct.asObservable();
  constructor() { }
  changeDeleteProduct(item: Product) {
    this.deleteProduct.next(item);
  }

  // currentMessage = this.messageSource.asObservable();


}
