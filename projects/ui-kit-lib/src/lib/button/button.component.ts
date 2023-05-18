import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'lib-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {

  @Output() press = new EventEmitter()

  handleClick(event: Event) {
    this.press.emit(event)
  }

}
