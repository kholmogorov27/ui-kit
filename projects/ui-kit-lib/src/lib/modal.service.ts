import { ModalComponent } from './modal/modal.component';
import {
  ComponentRef,
  EmbeddedViewRef,
  Injectable,
  Type,
  ViewContainerRef,
} from '@angular/core';
import { ModalInstance } from './classes';
import { ModalOptions } from './types';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  modalRefs: ModalInstance<ModalComponent, unknown>[] = [];

  private createComponent<T, C>(
    viewContainerRef: ViewContainerRef,
    component: Type<T>,
    children?: ComponentRef<C>
  ): ComponentRef<T> {
    const options = children
      ? {
          projectableNodes: [[this.getHTMLNode(children)]],
        }
      : undefined;

    return viewContainerRef.createComponent<T>(component, options);
  }

  private getHTMLNode<T>(componentRef: ComponentRef<T>): HTMLElement {
    return (componentRef.hostView as EmbeddedViewRef<T>)
      .rootNodes[0] as HTMLElement;
  }

  open<T>(
    viewContainerRef: ViewContainerRef,
    content: Type<T>,
    options?: ModalOptions
  ): ModalInstance<ModalComponent, T> {
    const contentRef = this.createComponent<T, null>(viewContainerRef, content);
    const modalRef = this.createComponent<ModalComponent, T>(
      viewContainerRef,
      ModalComponent,
      contentRef
    );

    const instance = new ModalInstance(modalRef, contentRef, options);
    this.modalRefs.push(instance);

    instance.event.close.subscribe(() => {
      const index = this.modalRefs.indexOf(instance);
      if (index > -1) {
        this.modalRefs.splice(index, 1);
      }
    });

    return instance;
  }

  closeAll() {
    // copy to avoid the modalRefs' array mutations after the close event
    [...this.modalRefs].forEach((modalRef) => modalRef.close());
    this.modalRefs = [];
  }
}
