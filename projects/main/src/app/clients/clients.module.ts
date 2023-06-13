import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientsComponent } from './clients.component';
import { UiKitLibModule } from 'ui-kit-lib';

@NgModule({
  declarations: [ClientsComponent],
  imports: [CommonModule, UiKitLibModule],
})
export class ClientsModule {}
