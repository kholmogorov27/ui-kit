import { Component, EventEmitter, Output } from '@angular/core';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'lib-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css'],
})
export class PopUpComponent {
  @Output() popupClose = new EventEmitter();

  crossIcon = faXmark;

  handleClose() {
    this.popupClose.emit();
  }
}
