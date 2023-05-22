import { Component, Type, ViewContainerRef } from '@angular/core';
import { ModalService } from 'ui-kit-lib';

@Component({
  selector: 'app-sample',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.css'],
})
export class SampleComponent {
  constructor(
    private viewContainerRef: ViewContainerRef,
    private modalService: ModalService
  ) {}

  openModals(amount: number) {
    for (let i = 0; i < amount; i++) {
      this.modalService.open(
        this.viewContainerRef,
        SampleComponent as Type<Component>
      );
    }
  }

  closeAllModals() {
    this.modalService.closeAll();
  }
}
