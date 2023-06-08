import { AbstractControl } from '@angular/forms';

export function requireImages(control: AbstractControl) {
  if (control.value.images.length > 0) {
    return null;
  }

  return { requireImages: true };
}

export function requireProps(control: AbstractControl) {
  for (const item of control.value.value) {
    for (const value of Object.values(item)) {
      if (!value) {
        return { requireProps: true };
      }
    }
  }

  return null;
}
