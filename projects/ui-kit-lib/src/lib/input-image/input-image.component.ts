import { Component, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { faImage } from '@fortawesome/free-regular-svg-icons';
import { faLink } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'lib-input-image',
  templateUrl: './input-image.component.html',
  styleUrls: ['./input-image.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: InputImageComponent,
    },
  ],
})
export class InputImageComponent implements ControlValueAccessor {
  @Input() images: string[] = [];
  @Input() description: string | undefined;
  @Input() limit = -1;

  onChange: (value: Options) => unknown = () => {
    /*pass*/
  };

  onTouched: () => unknown = () => {
    /*pass*/
  };

  touched = false;
  disabled = false;
  trashIcon = faImage;
  linkIcon = faLink;

  writeValue(options: Options) {
    this.images = options.images;
    if (options.limit) {
      this.limit = options.limit;
    }
    if (options.description) {
      this.description = options.description;
    }
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

  removeImage(image: string) {
    const index = this.images.indexOf(image);
    if (index > -1) {
      this.images.splice(index, 1);
    }

    this.onChange({
      images: this.images,
      limit: this.limit,
      description: this.description,
    });
    this.markAsTouched();
  }

  addImage(image: string) {
    if (this.isLimitExceeded) {
      return;
    }

    this.images.push(image);

    this.onChange({
      images: this.images,
      limit: this.limit,
      description: this.description,
    });
    this.markAsTouched();
  }

  get isLimitExceeded() {
    return this.limit > -1 && this.images.length >= this.limit;
  }
}

type Options = {
  images: string[];
  description?: string;
  limit?: number;
};
