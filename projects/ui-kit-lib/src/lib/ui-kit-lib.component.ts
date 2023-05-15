import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Link } from './types';

@Component({
  selector: 'lib-ui-kit-lib',
  template: `<lib-navbar [links]="links"></lib-navbar>`,
})
export class UiKitLibComponent {
  @Output() pathChange = new EventEmitter()
  @Input() links: Link[] = []
}