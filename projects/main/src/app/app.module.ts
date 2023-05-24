import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UiKitLibModule } from 'ui-kit-lib';
import { NotifyAdminComponent } from './notify-admin/notify-admin.component';
import { InputPasswordComponent } from './input-password/input-password.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    NotifyAdminComponent,
    InputPasswordComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, UiKitLibModule, FontAwesomeModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
