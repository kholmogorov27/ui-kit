import { NgModule } from '@angular/core';
import { UiKitLibComponent } from './ui-kit-lib.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserModule } from '@angular/platform-browser';
import { TableComponent } from './table/table.component';
import { ButtonComponent } from './button/button.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PopUpComponent } from './table/pop-up/pop-up.component';
import { ModalComponent } from './modal/modal.component';
import { InputPasswordComponent } from './input-password/input-password.component';

@NgModule({
  declarations: [
    UiKitLibComponent,
    NavbarComponent,
    TableComponent,
    ButtonComponent,
    PopUpComponent,
    ModalComponent,
    InputPasswordComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    NavbarComponent,
    TableComponent,
    ButtonComponent,
    InputPasswordComponent,
  ],
})
export class UiKitLibModule {}
