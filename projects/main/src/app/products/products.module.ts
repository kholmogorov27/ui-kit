import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { UiKitLibModule } from 'ui-kit-lib';
import { ModalContentComponent } from './modal-content/modal-content.component';

@NgModule({
  declarations: [ProductsComponent, ModalContentComponent],
  imports: [CommonModule, UiKitLibModule],
})
export class ProductsModule {}
