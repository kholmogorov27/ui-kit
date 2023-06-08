import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'lib-input-password',
  templateUrl: './input-password.component.html',
  styleUrls: ['./input-password.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: InputPasswordComponent,
    },
  ],
})
export class InputPasswordComponent implements ControlValueAccessor {
  @Input() label = 'Пароль';
  @Input() placeholder = 'Введите пароль';
  @Input() isVisible = false;
  @Input() value = '';

  @Output() isVisibleChange = new EventEmitter();

  onChange: (value: string) => unknown = () => {
    /*pass*/
  };

  onTouched: () => unknown = () => {
    /*pass*/
  };

  touched = false;
  disabled = false;
  icon = faEye;

  onValueChange(event: Event) {
    this.markAsTouched();
    if (!this.disabled) {
      this.value = (event.target as HTMLInputElement).value;
      this.onChange(this.value);
    }
  }

  writeValue(value: string) {
    this.value = value;
  }

  registerOnChange(onChange: () => unknown) {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: () => unknown) {
    this.onTouched = onTouched;
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  setDisabledState(disabled: boolean) {
    this.disabled = disabled;
  }

  toggleIsVisible(event: MouseEvent) {
    event.stopPropagation();
    event.preventDefault();

    this.isVisible = !this.isVisible;

    if (this.isVisible) {
      this.icon = faEyeSlash;
    } else {
      this.icon = faEye;
    }

    this.isVisibleChange.emit(this.isVisible);
  }
}
