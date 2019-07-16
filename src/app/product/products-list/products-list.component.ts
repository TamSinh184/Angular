
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from '../../model/product.class';
import { ServiceService } from 'src/app/service/service.service';


@Component({
  selector: 'products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
  subscription: Subscription;
  products: Product[]=[];


  constructor(
    public serviceService: ServiceService

  ) { }

  ngOnInit() {
    this.loadData();
  }
  loadData(){
    this.subscription = this.serviceService.getAllProduct().subscribe(
      (data: Product[]) => {
        this.products = data.map(item => {
          item.count = 1;
          item.isShow = true;
          return item;
        });

      },error => {
        this.serviceService.handleError(error);
      }
    );
  }

  updateProduct(item: Product) {
    console.log(item.id)
  }

  deleteProduct(idx : number){
    this.subscription = this.serviceService.delelteProduct(idx).subscribe(
      (data: Product) => {
        this.updatedDataAfterDelete(idx);
      });
  }

  updatedDataAfterDelete(id: number){
    for (var i = 0; i < this.products.length; i++){
      if(this.products[i].id == id) {
        this.products.splice(i,1)
        break;
      }
    }
  }

}
