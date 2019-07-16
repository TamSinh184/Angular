import { Product } from './../model/product.class';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartLocalStrorageService {
  carts: Product = {} as Product;
  constructor() { }

  addIntoLocalStorage(item) {
    localStorage.setItem('carts', JSON.stringify('item')); 
  }

  getFromLocalStrorage() {
    const  cart =  JSON.parse(localStorage.getItem('cartObject'));
    return cart;
  }
}
