import { SearchService } from './../service/search.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from './../model/product.class';
import { SectionComponent } from './../section/section.component';
import { Component, Directive, OnInit, ViewChild, AfterViewInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{


  nameSearch : string;

  prodHeader : Product = {} as Product;
  price : number;
  count : any = 1;
  total : number = 0;
  isShowSearch: boolean = true;



  constructor(
    private route: ActivatedRoute,
    public searchService : SearchService
      ) { }

  ngOnInit() {

  }
  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    this.searchService.changeSearchProduct(this.nameSearch);

  }


  searchProduct(data: string) {
    this.searchService.changeSearchProduct(data);
    console.log(this.searchService.changeSearchProduct(data)    )
  }

  showSearch() {
    this.isShowSearch = !this.isShowSearch;
  }
}
