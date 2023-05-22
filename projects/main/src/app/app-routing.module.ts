import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { ClientsModule } from './clients/clients.module';
import { CategoriesComponent } from './categories/categories.component';
import { CitiesComponent } from './cities/cities.component';
import { BrandsComponent } from './brands/brands.component';
import { ProtocolsComponent } from './protocols/protocols.component';
import { OrdersComponent } from './orders/orders.component';
import { BannersComponent } from './banners/banners.component';
import { SeminarsComponent } from './seminars/seminars.component';
import { PromocodeComponent } from './promocode/promocode.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path: 'products',
    component: ProductsComponent,
  },
  {
    path: 'clients',
    component: ClientsModule,
  },
  {
    path: 'categories',
    component: CategoriesComponent,
  },
  {
    path: 'cities',
    component: CitiesComponent,
  },
  {
    path: 'brands',
    component: BrandsComponent,
  },
  {
    path: 'protocols',
    component: ProtocolsComponent,
  },
  {
    path: 'orders',
    component: OrdersComponent,
  },
  {
    path: 'banners',
    component: BannersComponent,
  },
  {
    path: 'seminars',
    component: SeminarsComponent,
  },
  {
    path: 'promocodes',
    component: PromocodeComponent,
  },
  {
    path: 'auth/login',
    component: LoginComponent,
  },
  {
    path: 'auth/register',
    component: RegisterComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
