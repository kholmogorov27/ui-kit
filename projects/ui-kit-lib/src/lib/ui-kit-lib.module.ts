import { NgModule } from '@angular/core';
import { UiKitLibComponent } from './ui-kit-lib.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserModule } from '@angular/platform-browser';
import { TableComponent } from './table/table.component';
import { ButtonComponent } from './button/button.component';
import { FormsModule } from '@angular/forms';
import { PopUpComponent } from './pop-up/pop-up.component';

@NgModule({
  declarations: [
    UiKitLibComponent,
    NavbarComponent,
    TableComponent,
    ButtonComponent,
    PopUpComponent,
  ],
  imports: [BrowserModule, RouterModule, FontAwesomeModule, FormsModule],
  exports: [UiKitLibComponent, NavbarComponent, TableComponent],
})
export class UiKitLibModule {}
