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
import { Injectable } from '@angular/core';
import { AppReadyService } from '../_utilities/services/app-stable-check.service';
import { ListboxItemComponent } from '../listbox-item/listbox-item.component';
import { ComboboxFilterType } from './combobox.constants';
import { ComboboxDirective } from './combobox.directive';

/**
 * Service containing optional functions for the ComboboxDirective.
 */
@Injectable({
  providedIn: 'root'
})
export class ComboboxService {
  constructor(private appReadyService: AppReadyService) {}
  /**
   * The closeMenuOnItemClick method automatically closes the menu when an item is selected. <br />
   * To keep the menu open after an item is selected, you must provide <code>[closeOnClick]="false"</code> to the combobox component.
   * @param combobox Combobox to apply behavior to.
   */
  closeMenuOnItemClick(combobox: ComboboxDirective) {
    combobox.listbox?.listItems?.forEach((item) => {
      item.clicked.subscribe(() => {
        combobox.floatingContainer?.floatingUIService?.hidefloatingUI();
      });
    });

    // subscribe to changes in items and apply service function to these items as well
    combobox.listbox?.listItems?.changes.subscribe(() => {
      combobox.listbox?.listItems.forEach((item) => {
        item.clicked.subscribe(() => {
          combobox.floatingContainer?.floatingUIService?.hidefloatingUI();
        });
      });
    });
  }

  /**
   * The selectHighlightedOnMenuClose method selects the last highlighted item when the menu is closed.
   * This method is called by default within <code>autoSelectItem</code>. <br />
   * @param combobox Combobox to apply behavior to.
   */
  selectHighlightedOnMenuClose(combobox: ComboboxDirective) {
    combobox.floatingContainer?.floatingUIService?.isShownEmitter.subscribe((isShown) => {
      if (!this.appReadyService.isBrowserAndDomAvailable()) return; // return if app is not ready to access nativeElement
      if (!isShown && combobox._lastHighlightedOnClose !== null) {
        combobox.selectItem(combobox._lastHighlightedOnClose);
      }
    });
  }

  /**
   * The autoFilterDisplayedItems method automatically filters the items shown in the combobox on initial render.
   * If the items displayed on page load are not the full list you want to filter, please use a different function. This method filters items based on selection and input value changes. <br />
   * To access the filtered list of <code>ListboxItemsDirective[]</code>, subscribe to the <code>filteredListEmitter</code>.
   * @param combobox Combobox to apply behavior to.
   */
  autoFilterDisplayedItems(combobox: ComboboxDirective) {
    if (!combobox.input || !combobox.listbox) return;
    let filteredListItems: ListboxItemComponent[] = [];

    // filter list with defaultValue
    if (combobox.value) {
      if (combobox.listbox?.multiselect) {
        combobox.value['value'].forEach((selectedValue: string | number) => {
          const selectedItem = combobox.initialListItems.find((item) => item.value === selectedValue);
          if (selectedItem) {
            filteredListItems.push(selectedItem);
            // combobox._prevActiveItem = selectedItem;
          }
        });
        // don't update list on initial render for multiselect, only on input
      } else {
        const selectedItem = combobox.initialListItems.find((item) => item.value === combobox.value['value']);
        if (selectedItem) {
          filteredListItems.push(selectedItem);
          combobox._prevActiveItem = selectedItem;
        }
        this.updateList(combobox, filteredListItems);
      }
    }

    combobox.input.inputEvent.subscribe((value) => {
      if (!this.appReadyService.isBrowserAndDomAvailable()) return; // return if app is not ready to access nativeElement
      // input value
      filteredListItems = [];
      combobox.initialListItems.forEach((item) => {
        if (item.el.nativeElement.innerText.trim().toLowerCase().includes(value.toLowerCase())) {
          // keep item in list if it includes the input value
          filteredListItems.push(item);
        }
      });
      this.updateList(combobox, filteredListItems);
    });

    combobox.itemSelected.subscribe((value) => {
      if (combobox.listbox?.multiselect) {
        // reset list on multiselect when option is selected
        filteredListItems = combobox.initialListItems;
        // if (filteredListItems && filteredListItems.length > 0)
        //   combobox._prevActiveItem = filteredListItems[filteredListItems.length - 1];
      } else {
        // listbox item value
        filteredListItems = [];
        const selectedItem = combobox.initialListItems.find((item) =>
          (value as (string | number)[])?.includes(item.value)
        );
        if (selectedItem) {
          filteredListItems.push(selectedItem);
          combobox._prevActiveItem = selectedItem;
        }
        if (selectedItem) filteredListItems.push(selectedItem);
      }
      this.updateList(combobox, filteredListItems);
    });
  }

  /**
   * The autoFilterBasedOnList method filters items in the combobox based on a specified list, which can differ from the initial list rendered. <br />
   * This method allows customization of the filtering criteria, enabling you to filter items based on properties such as id, label, value, etc. To access the filtered list, subscribe to <code>the filteredListEmitter</code>, which emits the filtered list in the same shape as <code>fullList</code>. <br />
   * This method is recommended over <code>autoFilterDisplayedItems</code> and can achieve the same functionality by calling <code>autoFilterBasedOnList(combobox, list, 'label')</code>.
   * @param combobox Combobox to apply filter function to.
   * @param fullList Full list of items to filter.
   * @param condition Condition on which to filter items in fullList (this would be a property you've provided to the items in fullList).
   */
  autoFilterBasedOnList(combobox: ComboboxDirective, fullList: any[], condition: string) {
    const listData = fullList;
    let filteredData: any[] = fullList;

    if (!combobox) return;

    combobox.filter.subscribe((filterEvent) => {
      filteredData = [];
      if (filterEvent.type === ComboboxFilterType.SELECTION) {
        if (combobox.listbox?.multiselect) {
          filteredData = listData;
          // if (filteredData && filteredData.length > 0) combobox._prevActiveItem = filteredData[filteredData.length - 1];
        } else {
          // if an item is selected, the list should only include that item
          filteredData = listData?.filter((item) => item[condition].toLowerCase() == filterEvent.input.toLowerCase());
          if (filteredData && filteredData.length === 1) combobox._prevActiveItem = filteredData[0];
        }
      } else if (filterEvent.type === ComboboxFilterType.INPUT) {
        listData.forEach((item) => {
          if (item[condition].toLowerCase().includes(filterEvent.input.toLowerCase())) filteredData.push(item);
        });
      } else if (filterEvent.type === ComboboxFilterType.RESET) {
        filteredData = listData;
      }
      this.updateList(combobox, filteredData);
    });
  }

  /**
   * The updateList method updates the combobox component with the given filtered list items,
   setting the active and highlighted index appropriately. <br />
   * This method is called by default within <code>autoFilterDisplayedItems</code> and <code>autoFilterBasedOnList</code>.
   * @param combobox Combobox to update.
   * @param filteredListItems Filtered array of listbox items.
   */
  updateList(combobox: ComboboxDirective, filteredListItems: ListboxItemComponent[]) {
    if (combobox.listbox?.multiselect) {
      // reset multiselect keyboard traversal altogether
      combobox._activeIndex = null;
      combobox._highlightedIndex = null;
    } else if (combobox._prevActiveItem && filteredListItems.includes(combobox._prevActiveItem)) {
      combobox._activeIndex = filteredListItems.findIndex((item) => item === combobox._prevActiveItem);
    } else {
      combobox._activeIndex = null;
      combobox._highlightedIndex = null;
    }

    combobox.filteredListEmitter.emit(filteredListItems);
  }

  /**
   * The autoSelectItem method highlights the first list item based on user input. <br />
   * This ensures that when the menu closes, if an input value was entered, an item is selected.
   * @param combobox Combobox to apply automatic selection to.
   */
  autoSelectItem(combobox: ComboboxDirective) {
    this.selectHighlightedOnMenuClose(combobox);

    combobox.input?.inputEvent.subscribe(() => {
      if (combobox.input.value) combobox.highlightIndex(0);
    });
  }
}
