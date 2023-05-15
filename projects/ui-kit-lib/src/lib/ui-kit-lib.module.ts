import { NgModule } from '@angular/core';
import { UiKitLibComponent } from './ui-kit-lib.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserModule } from '@angular/platform-browser';
import { TableComponent } from './table/table.component';

@NgModule({
  declarations: [
    UiKitLibComponent,
    NavbarComponent,
    TableComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    FontAwesomeModule,
  ],
  exports: [
    UiKitLibComponent,
    NavbarComponent,
    TableComponent,
  ]
})
export class UiKitLibModule { }
