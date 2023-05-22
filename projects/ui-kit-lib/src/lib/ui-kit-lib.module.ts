import { NgModule } from '@angular/core';
import { UiKitLibComponent } from './ui-kit-lib.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserModule } from '@angular/platform-browser';
import { TableComponent } from './table/table.component';
import { ButtonComponent } from './button/button.component';
import { FormsModule } from '@angular/forms';
import { PopUpComponent } from './table/pop-up/pop-up.component';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  declarations: [
    UiKitLibComponent,
    NavbarComponent,
    TableComponent,
    ButtonComponent,
    PopUpComponent,
    ModalComponent,
  ],
  imports: [BrowserModule, RouterModule, FontAwesomeModule, FormsModule],
  exports: [NavbarComponent, TableComponent],
})
export class UiKitLibModule {}
