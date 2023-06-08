import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'lib-button-icon',
  templateUrl: './button-icon.component.html',
  styleUrls: ['./button-icon.component.css'],
})
export class ButtonIconComponent {
  @Input() icon = faTrashCan;
  @Input() color = '#000000';
  @Output() press = new EventEmitter();

  onClick(event: MouseEvent) {
    this.press.emit(event);
  }
}
