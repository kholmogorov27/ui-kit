import { NgModule } from '@angular/core';
import { UiKitLibComponent } from './ui-kit-lib.component';
import { TestComponent } from './test/test.component';



@NgModule({
  declarations: [
    UiKitLibComponent,
    TestComponent
  ],
  imports: [
  ],
  exports: [
    UiKitLibComponent
  ]
})
export class UiKitLibModule { }
