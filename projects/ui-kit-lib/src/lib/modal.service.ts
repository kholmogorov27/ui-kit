import { ModalComponent } from './modal/modal.component';
import {
  Component,
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
  modalRefs: ModalInstance[] = [];

  private createComponent(
    viewContainerRef: ViewContainerRef,
    component: Type<Component>,
    children?: ComponentRef<Component>
  ): ComponentRef<Component> {
    const options = children
      ? {
          projectableNodes: [[this.getHTMLNode(children) as Node]],
        }
      : undefined;

    return viewContainerRef.createComponent<Component>(component, options);
  }

  private getHTMLNode(componentRef: ComponentRef<Component>): HTMLElement {
    return (componentRef.hostView as EmbeddedViewRef<unknown>)
      .rootNodes[0] as HTMLElement;
  }

  open(
    viewContainerRef: ViewContainerRef,
    content: Type<Component>,
    options?: ModalOptions
  ): ModalInstance {
    const contentRef = this.createComponent(viewContainerRef, content);
    const modalRef = this.createComponent(
      viewContainerRef,
      ModalComponent as Type<Component>,
      contentRef
    );

    const instance = new ModalInstance(modalRef, options);
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
