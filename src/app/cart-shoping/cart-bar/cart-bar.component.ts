import { DeleteService } from '../../service/delete.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from '../../model/product.class';
import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { DataService } from '../../service/data.service';
import * as lodash from 'lodash';

@Component({
  selector: 'cart-bar',
  templateUrl: './cart-bar.component.html',
  styleUrls: ['./cart-bar.component.scss']
})
export class CartBarComponent implements OnInit {
  sub: Subscription;
  prodInput: Product = {} as Product;
  products: Product[] = [];
  totalCart: number=0;
  

  constructor(
    private dataService: DataService,
    public routerService: Router,
    public activatedRoute: ActivatedRoute,
    public deleteService: DeleteService

  ) { }

  ngOnInit() {
    let local = JSON.parse(localStorage.getItem('products')); 
    this.products =local;
    this.sub = this.dataService.currentMessage.subscribe(data =>{
      if(data){
        this.prodInput = data;
        this.loadProducts();
      }

    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    if(changes && changes.prodInput && Object.keys(changes.prodInput.currentValue).length > 0 ) {
      localStorage.setItem('products', JSON.stringify(this.products));
    }
  }


  loadProducts(){
    if( this.products.length == 0){
       this.products.push(this.prodInput);
      localStorage.setItem('products', JSON.stringify(this.products));
      }
    else{
      var check = this.products.filter(item => {
        return item.id == this.prodInput.id;
      })
      if(check.length == 0){ 
        this.products.push(this.prodInput);
        localStorage.setItem('products', JSON.stringify(this.products));
      }
      else {
        this.products.forEach(item => {
          if(item.id == this.prodInput.id)
          item.count = item.count + this.prodInput.count;
          localStorage.setItem('products', JSON.stringify(this.products));
        })
      }
    }
  }

  localStorageProduct(){
    if(localStorage.length == 0) localStorage.setItem('products', JSON.stringify(this.products))
  }

  removeItem(item: Product, idx: number){
    this.deleteService.changeDeleteProduct(lodash.cloneDeep(item));
    this.products.splice(idx,1);
    localStorage.setItem('products', JSON.stringify(this.products));
  }

  total() {
     this.totalCart = this.products.reduce(( acc, currentValue, currentIndex, array) =>{
      return acc +  (currentValue.count * currentValue.price);
    }, 0)
    return this.totalCart;
  }

  sendCheckout(){
    this.routerService.navigate(['check']);
    //localStorage.setItem('products', JSON.stringify(this.products));
  }
}
