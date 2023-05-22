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
  [key: string]: string;
};

export type ModalOptions = {
  applyButton?: string;
  cancelButton?: string;
  closeOnEscape?: boolean;
  closeOnClickAway?: boolean;
};
