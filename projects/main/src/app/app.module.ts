import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UiKitLibModule } from 'ui-kit-lib';
import { NotifyAdminComponent } from './notify-admin/notify-admin.component';
import { ProductsModule } from './products/products.module';
import { LoginModule } from './auth/login/login.module';
import { RegisterModule } from './auth/register/register.module';

@NgModule({
  declarations: [AppComponent, NotifyAdminComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UiKitLibModule,
    FontAwesomeModule,
    ProductsModule,
    LoginModule,
    RegisterModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
