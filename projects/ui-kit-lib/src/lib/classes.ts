import { ModalComponent } from './modal/modal.component';
import { ComponentRef } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ModalOptions } from './types';

export class ModalInstance<T, C> {
  private keyboardCallbackRef: ((event: KeyboardEvent) => void) | null = null;
  private closeOnEscape = true;
  private closeOnClickAway = true;

  isValid = true;
  containerRef;
  contentRef;

  event = {
    close: new Subject<void>(),
    apply: new Subject<void>(),
    cancel: new Subject<void>(),
  };

  constructor(
    containerRef: ComponentRef<T>,
    contentRef: ComponentRef<C>,
    options?: ModalOptions
  ) {
    this.containerRef = containerRef;
    this.contentRef = contentRef;

    if (options?.inputs) {
      Object.entries(options.inputs).forEach(([name, value]) =>
        this.contentRef.setInput(name, value)
      );
    }
    if (options?.outputs) {
      Object.entries(options.outputs).forEach(([name, value]) => {
        if (
          Object.prototype.hasOwnProperty.call(this.contentRef.instance, name)
        ) {
          (
            (this.contentRef.instance as { [key: string]: unknown })[
              name
            ] as Observable<unknown>
          ).subscribe(value);
        }
      });
    }

    if (options?.applyButton) {
      (this.containerRef.instance as ModalComponent).applyButton =
        options.applyButton;
    }
    if (options?.cancelButton) {
      (this.containerRef.instance as ModalComponent).cancelButton =
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
    const instance = this.containerRef.instance as ModalComponent;

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
    this.containerRef.destroy();
  }

  close(): void {
    this.isValid && this.event.close.next();
  }
}
