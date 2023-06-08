import { Component, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'lib-input-prop-list',
  templateUrl: './input-prop-list.component.html',
  styleUrls: ['./input-prop-list.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: InputPropListComponent,
    },
  ],
})
export class InputPropListComponent implements ControlValueAccessor {
  @Input() fields: FieldOptions[] = [];
  @Input() limit = -1;
  @Input() addNewText = 'Добавить элемент';
  @Input() limitTextTemplate = (limit: number) => `Максимум ${limit} элементов`;
  @Input() items: FieldItem[] = [];

  touched = false;
  disabled = false;

  onChange: (value: Options) => unknown = () => {
    /*pass*/
  };

  onTouched: () => unknown = () => {
    /*pass*/
  };

  writeValue({ value, fields, limit, limitTextTemplate }: Options) {
    this.items = value;
    this.fields = fields;
    this.limit = limit;
    this.limitTextTemplate = limitTextTemplate;
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

  addItem() {
    if (this.isLimitExceeded) {
      return;
    }

    this.items.push(
      this.fields
        .map((field) => field.key)
        .reduce((acc, curr) => (((acc as FieldItem)[curr] = ''), acc), {})
    );

    this.onChange({
      value: this.items,
      fields: this.fields,
      limit: this.limit,
      limitTextTemplate: this.limitTextTemplate,
    });
    this.markAsTouched();
  }

  removeItem(item: FieldItem) {
    const index = this.items.indexOf(item);
    if (index > -1) {
      this.items.splice(index, 1);
    }

    this.onChange({
      value: this.items,
      fields: this.fields,
      limit: this.limit,
      limitTextTemplate: this.limitTextTemplate,
    });
    this.markAsTouched();
  }

  changeProp(item: FieldItem, field: string, event: Event) {
    const index = this.items.indexOf(item);
    if (index > -1) {
      this.items[index][field] = (event.target as HTMLInputElement).value;
    }

    this.onChange({
      value: this.items,
      fields: this.fields,
      limit: this.limit,
      limitTextTemplate: this.limitTextTemplate,
    });
    this.markAsTouched();
  }

  get isLimitExceeded() {
    return this.limit > -1 && this.items.length >= this.limit;
  }
}

type FieldOptions = {
  key: string;
  placeholder?: string;
  required?: boolean;
};

type FieldItem = {
  [key: string]: string;
};

type Options = {
  value: FieldItem[];
  fields: FieldOptions[];
  limit: number;
  limitTextTemplate: (limit: number) => string;
};
