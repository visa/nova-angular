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
import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { AppReadyService } from '../_utilities/services/app-stable-check.service';
import { ListboxItemComponent } from '../listbox-item/listbox-item.component';
import {
  DOWN_ARROW_KEY,
  END_KEY,
  ENTER_KEY,
  HOME_KEY,
  SPACE_CODE,
  SPACE_KEY,
  TAB_KEY,
  UP_ARROW_KEY
} from '../nova-lib.constants';
import { NovaLibService } from '../nova-lib.service';
import { ListboxDirective } from './listbox.directive';

/**
 * Service used to create listbox behavior. Some functions are used within listbox component, others are optional additions.
 */
@Injectable({
  providedIn: 'root'
})
export class ListboxService {
  constructor(
    private rendererFactory: RendererFactory2,
    private novaLibService: NovaLibService,
    private appReadyService: AppReadyService
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }
  /** @ignore */
  private renderer: Renderer2;
  /** @ignore */
  listbox: ListboxDirective;

  /**
   * The setUpListbox method configures the listbox with the expected keyboard behaviors and sets the aria-activedescendant attribute. <br>
   * This method is called by default within <code>ListboxDirective</code>.
   * @param listbox Listbox to set up.
   */
  setUpListbox(listbox: ListboxDirective) {
    this.listbox = listbox;
    this.listenForActiveIndex(listbox);
    this.novaLibService.addArrowKeyNavigation(listbox.listItems.toArray(), true);
    this.addShortcuts(listbox);
  }

  /**
   * The listenForActiveIndex method sets the <code>aria-activedescendant</code> attribute of the listbox to the ID of the active listbox item and is called by default within <code>setUpListbox</code>.
   * @param listbox Listbox to listen to for active index.
   */
  listenForActiveIndex(listbox: ListboxDirective) {
    listbox.listItems.forEach((item) => {
      this.renderer.listen(item.el.nativeElement, 'focus', (event) => {
        listbox.ariaActiveDescendant.set(item.id);
      });
    });
  }

  /**
   * The scrollItemIntoView method scrolls given item to top of listbox. <br>
   * It’s called by default in <code>ListBoxDirective</code> unless <code>customScrollControl</code> is present. <br>
   * This method can also call to scroll to a custom index. By default it will scroll to the first active item, but you can provide a specific item if desired.
   * @param listbox Listbox to scroll.
   * @param indexToScrollTo Optional specific index to scroll to top (othwerwise, scrolls to first active item).
   */
  scrollItemIntoView(listbox: ListboxDirective, indexToScrollTo?: number): void {
    const targetItem: ListboxItemComponent | undefined =
      indexToScrollTo || indexToScrollTo === 0
        ? listbox.listItems.toArray()[indexToScrollTo]
        : listbox.multiselect
          ? listbox.listItems
              .toArray()
              .reverse()
              .find((item) => item.active)
          : listbox.listItems.toArray().find((item) => item.active);

    if (targetItem && this.appReadyService.isBrowserAndDomAvailable()) {
      if (!listbox._listboxScrollStylesSet) {
        // gather variable information
        listbox._listboxHeight = listbox.el.nativeElement.offsetHeight;
        listbox._listboxItemHeight = listbox.listItems.toArray()[0].el.nativeElement.offsetHeight;
        listbox._listboxGap = parseInt(window.getComputedStyle(listbox.el.nativeElement).gap, 10);
        listbox._listboxGap = isNaN(listbox._listboxGap) ? 4 : listbox._listboxGap;
      }

      let amountScrolledAlready = listbox.el.nativeElement.scrollTop;
      // determine distance between top of listbox and active item
      this.renderer.setStyle(listbox.el.nativeElement, 'position', 'relative'); // set position to relative to allow for correct offsetTop of item
      const fullItemDistanceFromTop = targetItem.el.nativeElement.offsetTop + listbox._listboxItemHeight;

      // if item is in the top view of the listbox..
      if (fullItemDistanceFromTop < listbox._listboxHeight) {
        if (!amountScrolledAlready) {
          return; // do nothing, item is in view (user hasn't scrolled)
        } else {
          // scroll to top of listbox (where item is)
          listbox.el.nativeElement.scrollTo(0, 0);
        }
      } else if (
        /**
         * Do nothing if the item is between the amount already scrolled and the bottom of the listbox
         * ie it is in view and the user has scrolled
         */
        amountScrolledAlready &&
        fullItemDistanceFromTop < listbox._listboxHeight + amountScrolledAlready &&
        fullItemDistanceFromTop > amountScrolledAlready
      ) {
        return;
      } else {
        // either scroll to top of listbox or scroll item to top
        listbox.el.nativeElement.scrollBy({
          top: fullItemDistanceFromTop - listbox._listboxGap - amountScrolledAlready - listbox._listboxItemHeight
        });
      }
    }
  }

  /**
   * Select all items between currently focused item and closest selected item.
   * @param items List of items that contains the items you want to select.
   * @param index Index of the focused item.
   */
  selectFromCloserSelectedToFocused(items: ListboxItemComponent[], index: number) {
    let [left, right] = [index, index];
    while (left !== 0 || right !== items.length - 1) {
      if (items[left]['active'] || items[right]['active']) break;
      if (left !== 0) left--;
      if (right !== items.length - 1) right++;
    }
    this.novaLibService.selectItems(items, items[left]['active'] ? left : index, items[left]['active'] ? index : right);
  }

  /* ======= KEYBOARD SHORTCUTS ======= */

  /**
   * The addShortcuts method adds keyboard shortcuts to the listbox and is called by default within <code>setUpListbox</code>.
   * @param listbox Listbox to add shortcuts to.
   */
  addShortcuts(listbox: ListboxDirective) {
    this.renderer.listen(listbox.el.nativeElement, 'keydown', (event) => {
      this.handleKeyDown(event, listbox);
    });
    this.renderer.listen(listbox.el.nativeElement, 'keyup', (event) => {
      this.handleKeyUp(event, listbox);
    });
  }

  /**
   * The handleKeyup method handles item selection on keyup events for the listbox and is called by default within <code>addShortcuts</code>.
   * @param event Keyup event
   * @param listbox Listbox to handle keyup event for.
   */
  handleKeyUp(event: KeyboardEvent, listbox: ListboxDirective) {
    if (!listbox._isRoleListboxVariant) return;
    if (event.key === ENTER_KEY || event.key === SPACE_KEY || event.key === HOME_KEY || event.key === END_KEY) {
      event.preventDefault(); // prevent scrolling
      if (event.key === SPACE_KEY) {
        listbox._recentSelectedIndex = listbox._highlightIndex;
      }
    }
  }

  /**
   * The handleKeydown handles keydown events for the listbox and is called by default within <code>addShortcuts</code>.
   * @param event Keydown event
   * @param listbox Listbox to handle keyup event for.
   */
  handleKeyDown(event: KeyboardEvent, listbox: ListboxDirective) {
    if (!listbox._isRoleListboxVariant) return;
    listbox._isHotkeyEvent = true;
    if (event.key !== TAB_KEY) {
      event.preventDefault();
    }

    /**
     * Meta + Shift + Home or End
     * Select the focused option and all options up/down to the first option
     * &
     * Home or End
     * Move the focus to the first/last listbox option
     */
    if (event.key === HOME_KEY || event.key === END_KEY) this.updateFocusItem(event, listbox);

    /**
     * A-Z OR a-z
     * Typing a character will move the focus to the next item with a name that starts with that character
     * Typing in rapid succession moves the focus to the next item with a name that reflectes the set of characters just typed
     */
    if (
      !event.metaKey &&
      event.key.length === 1 &&
      ((event.key >= 'a' && event.key <= 'z') ||
        (event.key >= 'A' && event.key <= 'Z') ||
        (event.key >= '0' && event.key <= '9'))
    )
      this.searchKeyword(event, listbox);

    /**
     * Shift + ↑/↓
     * Move the focus to and toggle the selected state of the next/previous option
     */
    if (event.key === UP_ARROW_KEY || event.key === DOWN_ARROW_KEY) this.toggleSelectedState(event, listbox);

    /**
     * Meta + A
     * Select all or deselect all items
     */
    if (event.metaKey && (event.key === 'A' || event.key === 'a') && listbox.multiselect) this.selectAll(listbox);

    /**
     * Shift + Space
     * Select contiguous items from the most recently selected item to ths focused item
     */
    if (event.code === SPACE_CODE && event.shiftKey === true) this.selectContiguousItems(listbox);
    listbox._isHotkeyEvent = false;
  }

  /**
   * The updateFocusItem method  is activated by Meta + Shift + Home/End and selects all items between the focused item and the first or last item, then sets focus to the first or last item. <br>
   * This method is called by default within <code>handleKeyDown</code>.
   * @param event Keyboard event
   * @param listbox Listbox to update focus item for.
   */
  updateFocusItem(event: KeyboardEvent, listbox: ListboxDirective) {
    const listItemsArray = listbox.listItems.toArray();
    if (event.metaKey && event.shiftKey && listbox.multiselect) {
      listItemsArray.forEach((item, i) => {
        if (listbox._highlightIndex !== null && item.disabled !== true) {
          if (event.key === HOME_KEY) listbox._highlightIndex >= i ? (item.active = true) : (item.active = false);
          if (event.key === END_KEY) listbox._highlightIndex <= i ? (item.active = true) : (item.active = false);
        }
      });
    }
    listbox._highlightIndex =
      event.key === HOME_KEY
        ? this.novaLibService.firstEnabledItem(listItemsArray)
        : this.novaLibService.lastEnabledItem(listItemsArray);
    listbox.updateValueFromItems();
    listItemsArray[listbox._highlightIndex].el.nativeElement.focus();
  }

  /**
   * The searchKeyword method  handles keys A-Z, a-z, and 0-9, moving the focus to the next item with a name starting with the typed character. <br>
   * In the case of rapid succession, it moves the focus to the next item whose name matches the sequence of characters typed. <br />
   * This method is called by default within <code>handleKeyDown</code>.
   * @param event Keyboard event
   * @param listbox Listbox to search for items in.
   */
  searchKeyword(event: KeyboardEvent, listbox: ListboxDirective) {
    const listItemsArray = listbox.listItems.toArray();
    listbox._keyword = listbox._keyword + event.key.toLowerCase();
    clearTimeout(listbox._timeoutId);
    const bounce = window.setTimeout(() => {
      if (listbox._keyword !== '') {
        listbox._keyword = '';
      }
    }, 1000);
    listbox._timeoutId = bounce;
    const selectedIndex = listItemsArray.findIndex((item) =>
      item.el.nativeElement.innerText?.toLowerCase().includes(listbox._keyword)
    );

    if (selectedIndex >= 0 && !listItemsArray[selectedIndex].disabled) {
      listItemsArray[selectedIndex].el.nativeElement.focus();
      listbox._highlightIndex = selectedIndex;
    }
  }

  /**
   * The selectAll method is activated by the Meta + A keys and selects or deselects all items in the listbox. <br>
   * This method is called by default within <code>handleKeyDown</code>.
   * @param listbox Listbox to select all items in.
   */
  selectAll(listbox: ListboxDirective) {
    if (listbox.multiselect) {
      const listItemsArray = listbox.listItems.toArray();
      this.novaLibService.detectAllItemsSelected(listItemsArray)
        ? this.novaLibService.deselectItems(listItemsArray)
        : this.novaLibService.selectItems(listItemsArray);
    }
  }

  /**
   * The selectFromCloserSelectedToFocused method selects all items between the currently focused item and the closest selected item. <br>
   * This method is called by default within <code>handleKeyDown</code>.
   * @param index Index of the focused item.
   */
  selectContiguousItems(listbox: ListboxDirective) {
    if (listbox._highlightIndex !== null && listbox._recentSelectedIndex !== null) {
      const listItemsArray = listbox.listItems.toArray();
      const isRecentLarger = listbox._recentSelectedIndex > listbox._highlightIndex;
      this.novaLibService.selectItems(
        listItemsArray,
        isRecentLarger ? listbox._highlightIndex : listbox._recentSelectedIndex,
        isRecentLarger ? listbox._recentSelectedIndex : listbox._highlightIndex
      );
      listbox.updateValueFromItems();
    }
  }

  /**
   * The toggleSelectedState method is activated by Shift + ↑/↓ and moves the focus to, and toggles the selected state of, the next or previous option. <br>
   * This method is called by default within <code>handleKeyDown</code>.
   * @param event Keyboard event
   * @param listbox Listbox to toggle selected state for.
   */
  toggleSelectedState(event: KeyboardEvent, listbox: ListboxDirective) {
    const listItemsArray = listbox.listItems.toArray();
    if (event.shiftKey === true && listbox.multiselect && listbox._highlightIndex !== null) {
      if (listItemsArray[listbox._highlightIndex].active) {
        this.novaLibService.deselectItem(listItemsArray, listbox._highlightIndex);
      } else {
        this.novaLibService.selectItem(listItemsArray, listbox._highlightIndex);
        listbox._recentSelectedIndex = listbox._highlightIndex;
      }
      listbox.updateValueFromItems();
    }
    listbox._highlightIndex =
      event.key === UP_ARROW_KEY
        ? this.novaLibService.previousEnabledItem(listItemsArray, listbox._highlightIndex!)
        : this.novaLibService.nextEnabledItem(listItemsArray, listbox._highlightIndex!);
  }
}
