import { Component, ElementRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'lib-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: SelectComponent,
    },
  ],
})
export class SelectComponent implements ControlValueAccessor {
  @Input() options: string[] = [];
  @Input() selected: string | null = null;
  @Input() placeholder = 'Выберите элемент';

  isOpened = false;
  touched = false;
  disabled = false;

  icon = faChevronDown;

  constructor(private elRef: ElementRef) {}

  private changeState(newState: boolean) {
    this.isOpened = newState;
    this.markAsTouched();
  }

  onBlur(event: FocusEvent): void {
    if (
      !(event.target as HTMLElement).contains(
        event.relatedTarget as HTMLElement
      )
    ) {
      this.changeState(false);
    }
  }

  onChange: (options: { value: string; options: string[] }) => unknown = () => {
    /*pass*/
  };

  onTouched: () => unknown = () => {
    /*pass*/
  };

  writeValue({ value, options }: { value: string; options: string[] }) {
    this.selected = value;
    this.options = options;
  }

  registerOnChange(onChange: () => unknown) {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: () => unknown) {
    this.onTouched = onTouched;
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  setDisabledState(disabled: boolean) {
    this.disabled = disabled;
  }

  chooseOption(option: string) {
    if (!this.disabled) {
      this.selected = option;
      this.onChange({ value: this.selected, options: this.options });
    }
  }

  toggle(event: MouseEvent, flag?: boolean): void {
    if (
      this.disabled ||
      (event.target as HTMLElement).classList.contains('dropdown')
    )
      return;

    if (typeof flag === 'boolean') {
      this.changeState(flag);
    } else {
      this.changeState(!this.isOpened);
    }
  }
}
