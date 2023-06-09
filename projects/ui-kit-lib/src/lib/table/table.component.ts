import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { copyObj, moveArrayElement } from '../utils';
import { TableCategory, TableItem } from '../types';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'lib-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnChanges {
  @Input() categories: TableCategory[] = [];
  @Input() items: TableItem[] = [];
  @Input() addButton = true;
  @Input() checkboxes = true;
  @Input() emptyPlaceholder = 'Здесь ничего нет';

  @Output() itemClick = new EventEmitter();
  @Output() itemAdd = new EventEmitter();

  ngOnChanges(changes: SimpleChanges): void {
    if ('categories' in changes) {
      this.sortedCategories = this.sortCategories(
        changes['categories'].currentValue
      );
    }

    if ('items' in changes) {
      this.items = changes['items'].currentValue;
    }

    this.validatePagination();
  }

  private get itemsOffset(): number {
    return (this.currentPage - 1) * this.perPage;
  }
  private get itemsEnd(): number {
    return this.itemsOffset + this.perPage;
  }
  get itemsOnPage(): TableItem[] {
    return this.items.slice(this.itemsOffset, this.itemsEnd);
  }
  get indexesOnPage(): number[] {
    return Object.keys(this.itemsOnPage).map(
      (index: string) => Number(index) + this.itemsOffset
    );
  }
  get pagesAmount(): number {
    return Math.ceil(this.items.length / this.perPage);
  }
  get columnsAmount(): number {
    return this.sortedCategories.length;
  }
  get rowsAmount(): number {
    return this.itemsOnPage.length + 1;
  }
  get getSelectedAmount(): number {
    return this.selected.length;
  }
  get isFirstPage(): boolean {
    return this.currentPage <= 1;
  }
  get isLastPage(): boolean {
    return this.perPage >= this.items.length - this.itemsOffset;
  }
  get isAnythingSelected(): boolean {
    return this.selected.length !== 0;
  }
  get isAnythingOnPageSelected(): boolean {
    return this.indexesOnPage.some((index) => this.selected.includes(index));
  }

  private sortCategories = (categories: TableCategory[]): TableCategory[] => {
    const clone = copyObj(categories) as TableCategory[];
    clone.forEach((category, index) => {
      if (category.position) {
        moveArrayElement(clone, index, category.position);
      }
    });
    return clone;
  };

  private toggleSelected(itemIndex: number, flag?: boolean): boolean {
    const select = (index: number): boolean =>
      index > -1 && (Boolean(this.selected.push(index)) || true);
    const deselect = (index: number): boolean =>
      index > -1 && (Boolean(this.selected.splice(index, 1)) || true);

    if (typeof flag === 'boolean') {
      return flag
        ? select(itemIndex)
        : deselect(this.selected.indexOf(itemIndex));
    } else {
      const foundIndex = this.selected.indexOf(itemIndex);
      return foundIndex === -1 ? select(itemIndex) : deselect(foundIndex);
    }
  }

  private validatePagination(): void {
    if (this.currentPage > this.pagesAmount) {
      this.changePage(this.pagesAmount);
    }
    if (this.currentPage === 0 && this.pagesAmount > 0) {
      this.changePage(1);
    }
  }

  onItemClick(
    event: MouseEvent | KeyboardEvent,
    item: TableItem,
    index: number
  ): void {
    if (
      (event instanceof KeyboardEvent && event.key !== 'Enter') ||
      (event.target as HTMLElement)?.tagName === 'INPUT'
    ) {
      return;
    }

    this.itemClick.emit({ item, index: this.getGlobalIndex(index) });
  }

  onAddItem(): void {
    this.itemAdd.emit();
  }

  changePage(value: string | number): void {
    this.currentPage = Number(value);
    this.validatePagination();
  }

  changePerPage(value: string): void {
    this.perPage = Number(value);
    this.validatePagination();
  }

  nextPage(): void {
    !this.isLastPage && this.currentPage++;
  }

  prevPage(): void {
    !this.isFirstPage && this.currentPage--;
  }

  toggleAllCheckboxOnPage(flag: boolean): void {
    /** args
     * flag: boolean
     *  true - uncheck all
     *  false - check all
     */

    this.indexesOnPage.forEach((index) => this.toggleSelected(index, !flag));
  }

  toggleCheckbox(checked: boolean, indexOnPage: number): void {
    this.toggleSelected(this.getGlobalIndex(indexOnPage));
  }

  toggleAllCheckbox(flag: boolean): void {
    this.selected = [];

    if (flag) {
      this.items.forEach((value, index) => {
        this.selected.push(index);
      });
    }
  }

  removeSelectedItems(): void {
    const itemsCopy: (TableItem | undefined)[] = copyObj(this.items);

    this.selected.forEach((index) => {
      itemsCopy[index] = undefined;
    });

    this.items = [];

    itemsCopy.forEach((item) => {
      if (item !== undefined) {
        this.items.push(item);
      }
    });

    this.toggleAllCheckbox(false);
    this.validatePagination();
  }

  getGlobalIndex(indexOnPage: number): number {
    return this.indexesOnPage[indexOnPage];
  }

  isItemChecked(indexOnPage: number): boolean {
    return this.selected.includes(this.getGlobalIndex(indexOnPage));
  }

  sortedCategories: TableCategory[] = this.sortCategories(this.categories);
  perPage = 5;
  currentPage = 1;
  selected: number[] = [];

  rightArrowIcon = faChevronRight;
  leftArrowIcon = faChevronLeft;
  trashIcon = faTrashAlt;
}
