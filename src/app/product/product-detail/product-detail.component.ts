import { Router, ActivatedRoute, Params } from '@angular/router';
import { Product } from '../../model/product.class';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ServiceService } from '../../service/service.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit ,OnDestroy{
  public product: Product = {} as Product;
  subscription: Subscription;
  subscriptionParams: Subscription;
  products: Product[]=[];
  constructor(
    public serviceService: ServiceService,
    public routerService: Router,
    public http: HttpClient,
    public activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.loadData();
  }

  ngOnDestroy() {
    if(this.subscription){
       this.subscription.unsubscribe();
    }
  }

  loadData(){
    this.subscriptionParams = this.activatedRoute.params.subscribe((data : Params) => {
      let id = data['id'];
      this.subscription = this.serviceService.getProductByID(id).subscribe(
        (product: Product) => {
          this.product = product;
          console.log(this.product);
        }
      );
    });
  }

  onBack(){
    this.routerService.navigate(['product']);
  }

  

  delete(idx){
    var result = confirm('Do you want to Delete')
    if(result){
      this.deleteProductDetail(idx);

    }

    }

  deleteProductDetail(id){
    this.subscription = this.serviceService.delelteProduct(id).subscribe(
      (data: Product) => {
        this.updatedDataAfterDelete(id);
        this.onBack();
      });
  }
  updatedDataAfterDelete(id: number){
    for (var i = 0; i < this.products.length; i++){
      console.log(this.products[i].id + "sanr pham tim thays")
      if(this.products[i].id == id) {
        this.products.splice(i,1)
        break;
      }
    }
  }
}
