import { SearchService } from './../service/search.service';
import { DataService } from './../service/data.service';
import { Product } from './../model/product.class';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { ServiceService } from '../service/service.service';
import * as lodash from 'lodash';
import { groupBy, mergeMap, toArray } from 'rxjs/operators';



@Component({
  selector: 'section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss']
})
export class SectionComponent implements OnInit, OnDestroy {
  @Input() childMessage: string;
  @Input() childCount: any = 1;

  
  // @Output() productEvent = new EventEmitter<Product>();
  // @Output() priceEvent = new EventEmitter<number>();

    product: Product = {} as Product;

    productsLocalStorage: Product[];
    products: Product[]=[];
    name: string;
    count: number= 1;
    img: string;
    category : string;
    price : number;
    subscription: Subscription;
    sub: Subscription;
    id : number;
    isPriceShow: boolean = false;
    isNameShow: boolean = false;
    isCategoryShow: boolean= false;
    p: number =1;
    groupByCategory = {};
    productsClone = []
  constructor(
    public serviceService: ServiceService,
    private dataService: DataService,
    public searchService: SearchService
      ) { }


  ngOnInit() {
    this.sub = this.searchService.currentMessage.subscribe(data =>{
      if(data){
        this.name = data;
      }
    });
    this.loadData();
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.name= this.childMessage;
  }

  ngOnDestroy(){
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  loadData(){
    this.subscription = this.serviceService.getAllProduct().subscribe(
      data => {
        this.products = data.map(item => {
          item.count = 1;
          item.isShow = true;
          return item;
        });

        this.productsClone = lodash.cloneDeep(this.products);

      },error => {
        this.serviceService.handleError(error);
      }
    );
  }



  minus(idx) {
    var a = this.products[idx].count;
    if(a>1){
      this.products[idx].count--;
    }

  }

  plus(idx){
     this.products[idx].count++;
  }

  //add to cart

  sendMessage(event: Product, indx : number) {
    this.dataService.postProduct(lodash.cloneDeep(event)) ;
    //localStorage.clear();
    //this.saveLocalStorage(event);
    // this.productEvent.emit(lodash.cloneDeep(event));
    // this.priceEvent.emit(this.price);
    this.products[indx].count = 1;
    this.isShowBtn(event);

  }

  saveLocalStorage(event){
      localStorage.setItem('this.product.id',  JSON.stringify(event));
      if(localStorage.length == 0) localStorage.setItem('prodcuts', JSON.stringify(event));
  }

  isShowBtn(event){
    event.isShow = !event.isShow;
    setTimeout(() =>{
      event.isShow = !event.isShow;
    }, 1000);
  }

  isPriceShowed(){
    this.isPriceShow = !this.isPriceShow;
  }

  isCategoryShowed(){
    this.isCategoryShow = !this.isCategoryShow;
  }

  decreaseProducts() {
    this.products.sort((val1,val2) => val2.price - val1.price );

  }

  increaseProducts(){
    this.products.sort((val1,val2) => val1.price - val2.price );

  }

  isNameShowed(){
    this.isNameShow = !this.isNameShow;
  }

  sortNameAZ(){
    console.log(this.products);
    this.products.sort((val1,val2) => val1.name.localeCompare(val2.name));
  }

  sortNameZA(){
    this.products.sort((val1,val2) => val2.name.localeCompare(val1.name));
  }

  groupByFruits(){
    this.products = this.productsClone.filter(t=>t.category == 'fruits');

  }

  groupByVegetable(){
     this.products = this.productsClone.filter(t=>t.category == 'vegetables');

  }

  groupByNuts(){
    this.products =this.productsClone.filter(t=> {return t.category == "nuts";});
    //this.groupByArray();
  
  }

  groupByArray(){
    this.products.forEach(x =>{
      this.groupByCategory[x.category] = this.groupByCategory[x.category] || [];
      this.groupByCategory[x.category].push({id: x.id, name: x.name, price : x.price, image: x.image, count: x.count, isShow : x.isShow, } )
    })
    console.log(this.groupByCategory)
  }

}
