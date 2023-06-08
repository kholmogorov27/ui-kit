import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { UiKitLibModule } from 'ui-kit-lib';
import { ProductPropertiesComponent } from './product-properties/product-properties.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ProductsComponent, ProductPropertiesComponent],
  imports: [CommonModule, UiKitLibModule, ReactiveFormsModule],
})
export class ProductsModule {}
