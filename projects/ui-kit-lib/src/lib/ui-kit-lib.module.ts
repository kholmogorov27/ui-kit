import { NgModule } from '@angular/core';
import { UiKitLibComponent } from './ui-kit-lib.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    UiKitLibComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    FontAwesomeModule,
  ],
  exports: [
    UiKitLibComponent
  ]
})
export class UiKitLibModule { }
