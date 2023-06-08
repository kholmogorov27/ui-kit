import { Component, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'lib-input-tags',
  templateUrl: './input-tags.component.html',
  styleUrls: ['./input-tags.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: InputTagsComponent,
    },
  ],
})
export class InputTagsComponent implements ControlValueAccessor {
  @Input() tags: string[] = [];
  @Input() limit = -1;
  @Input() limitTextTemplate = (limit: number) => `Максимум ${limit} тэгов`;

  touched = false;
  disabled = false;

  iconCross = faXmark;

  onChange: (value: Options) => unknown = () => {
    /*pass*/
  };

  onTouched: () => unknown = () => {
    /*pass*/
  };

  writeValue({ tags, limit }: Options) {
    this.tags = tags;
    this.limit = limit;
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

  removeTag(tag: string) {
    const index = this.tags.indexOf(tag);
    if (index > -1) {
      this.tags.splice(index, 1);
    }

    this.onChange({ tags: this.tags, limit: this.limit });
    this.markAsTouched();
  }

  editTag(tag: string, newName: string) {
    if (!newName) {
      this.removeTag(tag);
      return;
    }

    const index = this.tags.indexOf(tag);
    if (index > -1) {
      this.tags[index] = newName;
    }

    this.onChange({ tags: this.tags, limit: this.limit });
    this.markAsTouched();
  }

  addTag(tag: string) {
    this.tags.push(tag);
  }

  onContentClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('container')) {
      this.addTag('');
      setTimeout(() => {
        (
          (event.target as HTMLElement).children[
            (event.target as HTMLElement).children.length - 1
          ].getElementsByClassName('name')[0] as HTMLElement
        ).focus();
      }, 0);
    }
  }

  get isLimitExceeded() {
    return this.limit > -1 && this.tags.length >= this.limit;
  }
}

type Options = { tags: string[]; limit: number };
