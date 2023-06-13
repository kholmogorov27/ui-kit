import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UiKitLibModule } from 'ui-kit-lib';
import { NotifyAdminComponent } from './notify-admin/notify-admin.component';
import { ProductsModule } from './products/products.module';
import { LoginModule } from './auth/login/login.module';
import { RegisterModule } from './auth/register/register.module';
import { MockInterceptor } from './main-interceptor.service';
import { ClientsModule } from './clients/clients.module';

@NgModule({
  declarations: [AppComponent, NotifyAdminComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    UiKitLibModule,
    FontAwesomeModule,
    ProductsModule,
    LoginModule,
    RegisterModule,
    ClientsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MockInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
