import { AddUserComponent } from './../users/add-user/add-user.component';
import { AddProductComponent } from './../product/add-product/add-product.component';
import { UserComponent } from '../users/user/user.component';
import { EditUserComponent } from '../users/edit-user/edit-user.component';
import { DetailUserComponent } from '../users/detail-user/detail-user.component';
import { SectionComponent } from './../section/section.component';
import { CheckoutComponent } from '../cart-shoping/checkout/checkout.component';
import { ProductsListComponent } from '../product/products-list/products-list.component';
import { EditProductComponent } from '../product/edit-product/edit-product.component';
import { ProductDetailComponent } from '../product/product-detail/product-detail.component';
import { ProductsComponent } from '../product/products/products.component';
import { HeaderComponent } from './../header/header.component';
import { Routes } from '@angular/router';
import { UserListComponent } from '../users/user-list/user-list.component';



export const appRoutes : Routes = [
    {
        path: '',
        redirectTo: '/index',
        pathMatch: 'full'

    },
    {
        path: 'index',
        component : SectionComponent,
    },
    {
        path: 'check',
        component: CheckoutComponent
    },
    {
        path: 'product',
        component: ProductsComponent,
        children: [
            {
              path: '',
              redirectTo: '/product',
              pathMatch: 'full'
            },
            {
              path: '',
              component: ProductsListComponent
            },
            {
              path: 'detail/:id',
              component: ProductDetailComponent
            },
            {
              path: ':id/edit',
              component: EditProductComponent
            },
            {
              path: 'add',
              component: AddProductComponent
            }
          ]
    },
    {
      path: 'user',
      component: UserComponent,
      children: [
        {
          path: '',
          redirectTo: '/user',
          pathMatch: 'full'
        },
        {
          path: '',
          component: UserListComponent
        },
        {
          path: 'detail/:id',
          component: DetailUserComponent
        },
        {
          path: ':id/edit',
          component: EditUserComponent
        },
        {
          path: 'add',
          component: AddUserComponent
        }
      ]
    }


]