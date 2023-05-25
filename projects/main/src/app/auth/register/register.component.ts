import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  form = this.formBuilder.group({
    login: '',
    password: '',
    passwordRepeat: '',
  });

  constructor(private formBuilder: FormBuilder) {}

  onSubmit(): void {
    alert(
      this.form.value.login +
        ' ' +
        this.form.value.password +
        ' ' +
        this.form.value.passwordRepeat
    );
  }
}
