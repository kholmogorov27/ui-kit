import { NgModule } from '@angular/core';
import { RegisterComponent } from './register.component';
import { CommonModule } from '@angular/common';
import { UiKitLibModule } from 'ui-kit-lib';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [RegisterComponent],
  imports: [CommonModule, UiKitLibModule, RouterModule, ReactiveFormsModule],
})
export class RegisterModule {}
