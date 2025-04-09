/**
 *              Copyright (c) 2025 Visa, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 **/
import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ComboboxDirective, ComboboxService, ListboxItemComponent, NovaLibModule } from '@visa/nova-angular';
import { VisaChevronDownTiny, VisaChevronUpTiny } from '@visa/nova-icons-angular';

export interface ComboboxItem {
  label: string;
  value: string;
}

@Component({
  selector: 'nova-workshop-combobox-shared-combobox',
  templateUrl: './shared-combobox.docs.html',
  standalone: true,
  imports: [CommonModule, NovaLibModule, VisaChevronDownTiny, VisaChevronUpTiny]
})
export class SharedComboboxDocsComponent implements AfterViewInit {
  firstIndex: number = 0;
  lastIndex: number = 0;
  showLoadMore: boolean = false;
  chunkSize: number = 50;
  @ViewChild(ComboboxDirective) combobox: ComboboxDirective;
  // combobox label
  @Input() label: string;

  // selected item (one item since combobox)
  private _selectedValue: ComboboxItem;

  @Input()
  get selectedValue(): ComboboxItem {
    return this._selectedValue;
  }

  set selectedValue(value: ComboboxItem) {
    this._selectedValue = value;
  }

  // array of items to display in the combobox
  private _items: ComboboxItem[];

  @Input()
  get items(): ComboboxItem[] {
    return this._items;
  }

  set items(value: ComboboxItem[]) {
    if (value.length > 500) {
      console.warn('The items array is very large and may impact performance.');
      this.showLoadMore = true;
      this.lastIndex = this.chunkSize - 1;
      // Optionally, you can handle large arrays differently here
      // For example, you could paginate the items or limit the number of items displayed
    } else {
      this.showLoadMore = false;
      this.lastIndex = value.length - 1;
    }
    this._items = value;
    this.itemsUpdated();
  }

  @Output() updateValue = new EventEmitter<{ label: string; value: string | number | (string | number)[] } | null>();

  // variables specific to shared combobox
  filteredItems: ComboboxItem[];
  filteredListSubscription: any;

  constructor(
    private comboboxService: ComboboxService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngAfterViewInit() {
    if (this.combobox) {
      this.subscribeToFilteredList();
    }
  }

  /**
   * This function takes the ListboxItems[] and transforms it into the filtered array of the same shape of cardTypes ([{ label: '', value: '' }])
   * @param listItems
   */
  extractList(listItems: ListboxItemComponent[]) {
    let values: (string | number)[] = [];
    if (!listItems.length) this.filteredItems = [];
    listItems.forEach((item: ListboxItemComponent) => {
      if (item.value) values.push(item.value);
    });
    this.filteredItems = this.items.filter((item) => values.includes(item.value));
    this.lastIndex = this.filteredItems.length - 1 < this.chunkSize ? this.filteredItems.length : this.chunkSize - 1;
    this.showLoadMore = this.filteredItems.length > this.chunkSize;
  }

  itemsUpdated() {
    this.filteredItems = this.items;
    if (this.combobox) {
      // unsubscribe to filtered list of previous items
      this.filteredListSubscription.unsubscribe();
      /**
       * reset combobox value so old value isn't present in input
       * uncomment the following two lines if you want to null the combobox value when items are updated
       */
      // reset filtering and auto selecting for new set of items
      this.comboboxService?.autoFilterBasedOnList(this.combobox, this.items, 'label');
      this.comboboxService?.autoSelectItem(this.combobox);
      this.subscribeToFilteredList();
    }
  }

  subscribeToFilteredList() {
    this.filteredListSubscription = this.combobox.filteredListEmitter.subscribe((listItems: ListboxItemComponent[]) => {
      this.extractList(listItems);
    });
  }

  valueUpdated(value: string | number | (string | number)[] | null) {
    /**
     * Combobox's itemSelected (what is being passed to our value paramater here) emits what is essentially the listbox value
     * To see both the label and value of the combobox, we can access the combobox's full value
     */
    console.log(value); // value accessed from binding to itemSelected; equal to combobox's value.value, if not null
    this.updateValue.emit(this.combobox.value);
  }

  loadMore() {
    // this.firstIndex = this.lastIndex + 1;
    this.lastIndex = this.lastIndex + this.chunkSize - 1;
    this.cdRef.detectChanges();
  }
}
