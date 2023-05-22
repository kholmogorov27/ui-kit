import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'lib-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
  @Input() applyButton = 'Отмена';
  @Input() cancelButton = 'Применить';

  @Output() modalClose = new EventEmitter();
  @Output() apply = new EventEmitter();
  @Output() cancel = new EventEmitter();

  closeModal(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('overlay')) {
      this.modalClose.emit();
    }
  }

  onApply() {
    this.apply.emit();
  }

  onCancel() {
    this.cancel.emit();
  }
}
