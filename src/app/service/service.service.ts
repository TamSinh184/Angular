import { Router } from '@angular/router';
import { Product } from '../model/product.class';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  public API :  string = 'http://localhost:3000/products';
  constructor(
    public http : HttpClient,
  ) {}
  getAllProduct() : Observable<any> {
    return this.http.get(this.API);
  }

  handleError(err) {
    if(err.error instanceof Error){
      console.log(`Client side error: ${err.error.messagge}`)
    }
  }

  addProduct( product: Product) : Observable<any>{
    console.log(product)
    return this.http.post(this.API, product);
  }

  editProduct(product: Product) : Observable<any> {
    return this.http.put(`${this.API}/${product.id}`, product);
  }

  delelteProduct(id: number) : Observable<any>{
    return this.http.delete(`${this.API}/${id}`);
  }

  getProductByID(id: number) : Observable<any>  {
    return this.http.get(`${this.API}/${id}`)
  }


}
