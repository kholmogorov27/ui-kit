import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export type Link = {
  name: string;
  path: string;
  icon?: IconDefinition;
};

export type TableCategory = {
  key: string;
  name: string;
  aligment?: 'left' | 'center' | 'right';
  position?: number;
};

export type TableItem = {
  [key: string]: unknown;
};

export type ModalOptions = {
  inputs?: { [key: string]: unknown };
  outputs?: { [key: string]: (...args: any[]) => unknown };
  closeOnEscape?: boolean;
  closeOnClickAway?: boolean;
  applyButton?: string;
  cancelButton?: string;
  onApply?: () => void;
  onCancel?: () => void;
};
