import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { copyObj, moveArrayElement } from '../utils';
import { TableCategory, TableItem } from '../types';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'lib-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnChanges {

  private sortCategories = (categories: TableCategory[]): TableCategory[] => {
    const clone = (copyObj(categories) as TableCategory[])
    clone.forEach((category, index) => {
      if (category.position) {
        moveArrayElement(clone, index, category.position)
      }
    })
    return clone
  }
  private toggleSelected(itemIndex: number, flag?: boolean): boolean {
    const select = (index: number): boolean => index > -1 && (Boolean(this.selected.push(index)) || true)
    const deselect = (index: number): boolean => index > -1 && (Boolean(this.selected.splice(index, 1)) || true)

    if (typeof flag === 'boolean') {
      return flag 
        ? select(itemIndex) 
        : deselect(this.selected.indexOf(itemIndex))
    } else {
      const foundIndex = this.selected.indexOf(itemIndex)
      return foundIndex === -1 
        ? select(itemIndex) 
        : deselect(foundIndex)
    }
  }
  private validatePagination() {
    if (this.currentPage > this.pagesAmount) {
      this.changePage(this.pagesAmount)
    }
  }

  @Output() itemClick = new EventEmitter()
  @Output() itemAdd = new EventEmitter()

  @Input() categories: TableCategory[] = []
  @Input() items: TableItem[] = []
  sortedCategories: TableCategory[] = this.sortCategories(this.categories)

  perPage = 5
  currentPage = 1
  selected: number[] = []

  rightArrowIcon = faChevronRight
  leftArrowIcon = faChevronLeft
  trashIcon = faTrashAlt
  
  handleItemClick(event: MouseEvent | KeyboardEvent, item: TableItem) {
    if (event instanceof KeyboardEvent && event.key !== 'Enter') {
      return
    }

    this.itemClick.emit(item)
    console.log('item click event')
  }
  handleAddItem(event: Event) {
    console.log('item add event')
    this.itemAdd.emit()
  }

  changePage(value: string | number):void {
    this.currentPage = Number(value)
    this.validatePagination()
  }
  changePerPage(value: string):void {
    this.perPage = Number(value)
    this.validatePagination()
  }
  nextPage():void {
    !this.isLastPage && this.currentPage++
  }
  prevPage():void {
    !this.isFirstPage && this.currentPage--
  }

  toggleAllCheckboxOnPage(flag: boolean): void {
    
    /** args
     * flag: boolean
     *  true - uncheck all
     *  false - check all
     */

    this.indexesOnPage.forEach(index => this.toggleSelected(index, !flag))
  }
  toggleCheckbox(checked: boolean, indexOnPage: number): void {
    this.toggleSelected(this.indexesOnPage[indexOnPage])
  }
  toggleAllCheckbox(flag: boolean) {
    this.selected = []
    
    if (flag) {
      this.items.forEach((value, index) => {
        this.selected.push(index)
      })
    }
  }

  removeSelectedItems() {
    const itemsCopy: (TableItem | undefined)[] = JSON.parse(JSON.stringify(this.items))

    this.selected.forEach(index => {
      itemsCopy[index] = undefined
    })

    this.items = []
    
    itemsCopy.forEach(item => {
      if (item !== undefined) {
        this.items.push(item)
      }
    })
    
    this.toggleAllCheckbox(false)
    this.validatePagination()
  }

  isItemChecked(indexOnPage: number) {
    return this.selected.includes(this.indexesOnPage[indexOnPage])
  }
  get itemsOnPage(): TableItem[] {
    return this.items.slice(this.itemsOffset, this.itemsEnd)
  }
  get indexesOnPage(): number[] {
    return Object.keys(this.itemsOnPage).map((index: string) => Number(index) + this.itemsOffset)
  }
  get pagesAmount(): number {
    return Math.ceil(this.items.length / this.perPage)
  }
  get getSelectedAmount(): number {
    return this.selected.length
  }
  get isFirstPage() {
    return this.currentPage === 1
  }
  get isLastPage() {
    return this.perPage >= this.items.length - this.itemsOffset
  }
  get isAnythingSelected() {
    return this.selected.length !== 0
  }
  get isAnythingOnPageSelected() {
    return this.indexesOnPage.some(index => this.selected.includes(index))
  }
  
  private get itemsOffset() {
      return (this.currentPage - 1) * this.perPage
  }
  private get itemsEnd() {
    return this.itemsOffset + this.perPage
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.sortedCategories = this.sortCategories(changes['categories'].currentValue)
  }

}