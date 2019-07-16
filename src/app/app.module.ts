import { BrowserModule } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SectionComponent } from './section/section.component';
import { FooterComponent } from './footer/footer.component';
import { CartBarComponent } from './cart-shoping/cart-bar/cart-bar.component';
import { ServiceService } from './service/service.service';
import { FormsModule } from '@angular/forms';
import { FindDataPipe } from './pipe/find-data.pipe';
import { CheckoutComponent } from './cart-shoping/checkout/checkout.component';
import { appRoutes } from './routes/app.router';
import { RouterModule } from '@angular/router';
import { ProductsComponent } from './product/products/products.component';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import { EditProductComponent } from './product/edit-product/edit-product.component';
import { ProductsListComponent } from './product/products-list/products-list.component';
import { AddProductComponent } from './product/add-product/add-product.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { DetailUserComponent } from './users/detail-user/detail-user.component';
import { AddUserComponent } from './users/add-user/add-user.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { UserComponent } from './users/user/user.component'; // <-- import the module
import { EditUserComponent } from './users/edit-user/edit-user.component';

@NgModule({
  exports:[RouterModule],
  declarations: [
    AppComponent,
    HeaderComponent,
    SectionComponent,
    FooterComponent,  
    CartBarComponent,
    FindDataPipe,
    CheckoutComponent,
    ProductsComponent,
    ProductDetailComponent,
    EditProductComponent,
    ProductsListComponent,
    AddProductComponent,
    UserListComponent,
    DetailUserComponent,
    EditUserComponent,
    AddUserComponent,
    UserComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    NgxPaginationModule

  ],
  providers: [
    ServiceService,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
