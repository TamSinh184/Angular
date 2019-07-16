import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { Product } from '../../model/product.class';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ServiceService } from '../../service/service.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  public product: Product = {} as Product;
  subscription: Subscription;
  selectedFile: File= null;


  constructor(    
    public serviceService: ServiceService,
    public http: HttpClient,
    public routerService: Router

    ) { }

  ngOnInit() {
    // this.product = new Product();
  }

  onFileSelected(event){
    this.selectedFile = <File>event.target.files[0];
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


  onAddProduct(){
    this.subscription = this.serviceService.addProduct(this.product).subscribe(
      data =>{
        if(data = data.id){
          this.routerService.navigate(['product']);
        }
      }
    );
  }

}
