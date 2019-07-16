import { Product } from './../model/product.class';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private searchProduct = new BehaviorSubject<string>(null);
  currentMessage = this.searchProduct.asObservable();
  constructor() { }
  changeSearchProduct(item: string) {
    this.searchProduct.next(item);
  }
}
