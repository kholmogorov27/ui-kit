import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import { CommonModule } from '@angular/common';
import { UiKitLibModule } from 'ui-kit-lib';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, UiKitLibModule, RouterModule, ReactiveFormsModule],
})
export class LoginModule {}
