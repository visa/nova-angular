/**
 *              © 2025 Visa
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
import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {
  ComboboxDirective,
  InputDirective,
  ListboxDirective,
  ListboxItemComponent,
  NovaLibModule
} from '@visa/nova-angular';
import { VisaChevronDownTiny, VisaChevronUpTiny, VisaClearAltTiny } from '@visa/nova-icons-angular';

/** #docs */
@Component({
  selector: 'nova-workshop-multiselect-archived',
  templateUrl: './archived.docs.html',
  standalone: true,
  imports: [CommonModule, NovaLibModule, VisaChevronDownTiny, VisaChevronUpTiny, VisaClearAltTiny]
})
export class ArchivedMultiselectComponent implements AfterViewInit, AfterViewChecked {
  @ViewChild(ComboboxDirective) combobox: ComboboxDirective;
  @ViewChildren(ListboxItemComponent) listboxItems: QueryList<ListboxItemComponent>;
  @ViewChild(ListboxDirective) listbox: ListboxDirective;
  @ViewChild(InputDirective) input: InputDirective;

  chipArray = Array();

  public optionTypes = [
    {
      label: 'Option A',
      value: 'option-a'
    },
    {
      label: 'Option B',
      value: 'option-b'
    },
    {
      label: 'Option C',
      value: 'option-c'
    },
    {
      label: 'Option D',
      value: 'option-d'
    },
    {
      label: 'Option E',
      value: 'option-e'
    }
  ];
  filteredItems = this.optionTypes;
  noItemsFound = false;
  itemIsSelected = false;

  ngAfterViewInit(): void {
    if (this.combobox) {
      this.combobox.listbox.listItems.changes.subscribe(() => {});

      // ComboboxService provider needed to get unique reference to filteredListEmitter
      this.combobox.filteredListEmitter.subscribe((listItems: ListboxItemComponent[]) => {
        this.extractList(listItems);
      });

      this.autoFilterDisplayedItems(this.combobox);
    }
  }

  makeButtonId(label: string) {
    return 'default-chip-' + label.replace(/\s/g, '-').toLowerCase();
  }

  ngAfterViewChecked() {
    this.listboxItems.forEach((item) => {
      this.chipArray.find((chip) => chip.value === item.value) ? (item.active = true) : (item.active = false);
    });
    this.cdr.detectChanges();
  }

  /**
   * This function takes the ListboxItems[] and transforms it into the filtered array of the same shape of cardTypes ([{ label: '', value: '' }])
   * @param listItems
   */
  extractList(listItems: ListboxItemComponent[]) {
    let values: (string | number)[] = [];
    listItems.forEach((item: ListboxItemComponent) => {
      if (item.value) values.push(item.value);
    });

    if (this.itemIsSelected) {
      this.filteredItems = this.optionTypes;
      this.listboxItems.reset(this.combobox.initialListItems);
      this.itemIsSelected = false;
    } else {
      this.filteredItems = this.optionTypes.filter((item) => values.includes(item.value));
    }

    if (listItems.length === 0) {
      this.noItemsFound = true;
    } else {
      this.noItemsFound = false;
    }
  }

  autoFilterDisplayedItems(combobox: ComboboxDirective) {
    if (!combobox.input || !combobox.listbox) return;
    let filteredListItems: ListboxItemComponent[] = [];

    //if has initial pre-selected items, show list
    if (!this.listboxItems) {
      this.noItemsFound = true;
    } else {
      this.noItemsFound = false;
    }

    combobox.input.inputEvent.subscribe((value) => {
      filteredListItems = [];
      combobox.initialListItems.forEach((item) => {
        if (item.el.nativeElement.innerText.trim().toLowerCase().includes(value.toLowerCase())) {
          // keep item in list if it includes the input value
          filteredListItems.push(item);
        }
      });

      combobox.filteredListEmitter.emit(filteredListItems);
    });

    combobox.itemSelected.subscribe((value) => {
      this.listbox._internalValue = [];
      this.itemIsSelected = true;

      this.chipArray.find((chip) => chip.value === value)
        ? (this.chipArray = this.chipArray.filter((chip) => chip.value !== value))
        : this.chipArray.push(this.optionTypes.find((card) => card.value == value));

      combobox.input.value = '';
      this.cdr.detectChanges();

      combobox.filteredListEmitter.emit(combobox.initialListItems);
    });
  }

  toggleChip(value: string) {
    this.combobox.itemSelected.emit(value);
  }

  deleteLabel(labelToDelete: string) {
    this.listboxItems.forEach((item) => {
      if (item.value === labelToDelete) {
        item.active = false;
      }
    });

    let labelToFocus = '';
    for (let i = 0; i < this.chipArray.length; i++) {
      if (this.chipArray[i].value === labelToDelete) {
        if (i === 0 && this.chipArray.length === 1) {
          // last only one in the list
          labelToFocus = 'default-chip-reset-button';
        } else if (i === this.chipArray.length - 1) {
          // the last one in the list
          labelToFocus = this.makeButtonId(this.chipArray[i - 1].value);
        } else {
          // not the last one in the list
          labelToFocus = this.makeButtonId(this.chipArray[i + 1].value);
        }
        this.chipArray = this.chipArray.filter((chip) => chip.value != labelToDelete);
      }
    }
    let focusedElement = this.el.nativeElement.querySelector('#' + labelToFocus);
    if (focusedElement) {
      focusedElement.focus();
    }
  }

  constructor(
    private el: ElementRef,
    private cdr: ChangeDetectorRef
  ) {}
}
