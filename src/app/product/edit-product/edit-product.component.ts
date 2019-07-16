import { Router, ActivatedRoute, Params } from '@angular/router';
import { Product } from '../../model/product.class';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ServiceService } from '../../service/service.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit, OnDestroy {
  public product: Product = {} as Product;
  subscription: Subscription;
  subscriptionParams: Subscription;
  constructor(
    public serviceService: ServiceService,
    public http: HttpClient,
    public routerService: Router,
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

  onAddProduct(){
    this.subscription = this.serviceService.editProduct(this.product).subscribe(
      data =>{
        if(data = data.id){
          this.routerService.navigate(['product']);
        }
      }
    );
  }

  onFileSelected(event){
    var preview:any = document.querySelector('#imageAdd'); //selects the query named img
    var file:any    = event.target.files[0]; //sames as here
    var reader:any  = new FileReader();

    reader.onloadend = () => {
        preview.src = reader.result;
        this.product.image = reader.result;

    }

    if (file) {
        reader.readAsDataURL(file);
        console.log(reader.readAsDataURL(file))
    } else {
        preview.src = "";
    }
  }


}
