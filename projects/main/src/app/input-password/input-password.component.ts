import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-input-password',
  templateUrl: './input-password.component.html',
  styleUrls: ['./input-password.component.scss'],
})
export class InputPasswordComponent {
  @Input() label = 'Пароль';
  @Input() placeholder = 'Введите пароль';
  @Input() isVisible = false;
  @Output() isVisibleChange = new EventEmitter();

  icon = faEye;

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
