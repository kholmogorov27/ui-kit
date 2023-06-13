import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'lib-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent {
  @Input() value = '';
  @Output() valueChange = new EventEmitter();

  searchIcon = faMagnifyingGlass;
  crossIcon = faXmark;

  onInput(event: Event) {
    this.valueChange.emit((event.target as HTMLInputElement).value);
  }
}
