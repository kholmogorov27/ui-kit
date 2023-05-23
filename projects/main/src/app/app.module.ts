import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UiKitLibModule } from 'ui-kit-lib';
import { NotifyAdminComponent } from './notify-admin/notify-admin.component';

@NgModule({
  declarations: [AppComponent, NotifyAdminComponent],
  imports: [BrowserModule, AppRoutingModule, UiKitLibModule, FontAwesomeModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
