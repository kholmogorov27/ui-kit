import { ModalComponent } from './modal/modal.component';
import { Component, ComponentRef } from '@angular/core';
import { Subject } from 'rxjs';
import { ModalOptions } from './types';

export class ModalInstance {
  private keyboardCallbackRef: ((event: KeyboardEvent) => void) | null = null;
  private closeOnEscape = true;
  private closeOnClickAway = true;

  isValid = true;
  componentRef;

  event = {
    close: new Subject<void>(),
    apply: new Subject<void>(),
    cancel: new Subject<void>(),
  };

  constructor(componentRef: ComponentRef<Component>, options?: ModalOptions) {
    this.componentRef = componentRef;

    if (options?.applyButton) {
      (this.componentRef.instance as ModalComponent).applyButton =
        options.applyButton;
    }
    if (options?.cancelButton) {
      (this.componentRef.instance as ModalComponent).cancelButton =
        options.cancelButton;
    }
    if (options?.closeOnEscape) {
      this.closeOnEscape = options.closeOnEscape;
    }
    if (options?.closeOnClickAway) {
      this.closeOnClickAway = options.closeOnClickAway;
    }

    this.bindInstanceEvents();
    this.defineEventActions();
  }

  private bindInstanceEvents(): void {
    const instance = this.componentRef.instance as ModalComponent;

    instance.modalClose.subscribe(() => {
      this.closeOnClickAway && this.event.close.next();
    });
    instance.apply.subscribe(() => {
      this.event.apply.next();
    });
    instance.cancel.subscribe(() => {
      this.event.cancel.next();
    });
  }

  private defineEventActions() {
    this.keyboardCallbackRef = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        this.event.close.next();
      }
    };

    this.closeOnEscape &&
      document.addEventListener('keydown', this.keyboardCallbackRef);

    this.event.close.subscribe(() => {
      this.keyboardCallbackRef &&
        document.removeEventListener('keydown', this.keyboardCallbackRef);

      this._close();
    });
  }

  private _close(): void {
    this.isValid = false;
    this.componentRef.destroy();
  }

  close(): void {
    this.isValid && this.event.close.next();
  }
}
