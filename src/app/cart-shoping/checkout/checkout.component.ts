import { DeleteService } from '../../service/delete.service';
import { Product } from '../../model/product.class';
import { Component, OnInit, SimpleChanges, Input } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  productCarts : Product[]= [];
  prodInput: Product = {} as Product;

  totalCart: number=0;
  sub: Subscription;

  constructor(
    public deleteService: DeleteService
  ) { }

  ngOnInit() {
    let local = JSON.parse(localStorage.getItem('products'));
    this.productCarts = local;
    this.sub = this.deleteService.currentMessage.subscribe(data =>{
      if(data){
        this.prodInput = data;
        this.onloadData(data.id);
      }

    })

  }
  ngOnChanges(changes: SimpleChanges): void {
    this.productCarts = JSON.parse(localStorage.getItem('products'));

  }

  onloadData(id){
    for(var i = 0; i< this.productCarts.length; i++){
      if(this.productCarts[i].id ==id){
        this.productCarts.splice(i,1)
        break;
      }
    }
  }


  delete(item: Product, idx: number){

    this.productCarts = JSON.parse(localStorage.getItem('products'));
  }

  totalProducts(){
    this.totalCart = this.productCarts.reduce((acc, currentValue) =>{
      return acc + (currentValue.count *currentValue.price);
    },0)
    return this.totalCart;
  }


}
