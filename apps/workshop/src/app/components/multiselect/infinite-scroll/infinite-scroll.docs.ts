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
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  Renderer2,
  ViewChild,
  ViewChildren
} from '@angular/core';
import { ComboboxDirective, ComboboxService, ListboxItemComponent, NovaLibModule } from '@visa/nova-angular';
import { VisaChevronDownTiny, VisaChevronUpTiny, VisaClearAltTiny, VisaArrowUpTiny } from '@visa/nova-icons-angular';
import { MockDataService } from '../../../shared/services/mock-data.service';

/** #custom **/
@Component({
  selector: 'nova-workshop-multiselect-infinite-scroll',
  templateUrl: './infinite-scroll.docs.html',
  providers: [ComboboxService],
  standalone: true,
  imports: [CommonModule, NovaLibModule, VisaChevronDownTiny, VisaChevronUpTiny, VisaClearAltTiny, VisaArrowUpTiny]
})
export class InfiniteScrollMultiselectComponent implements OnInit, AfterViewInit {
  @ViewChild(ComboboxDirective) combobox: ComboboxDirective;
  @ViewChildren(ListboxItemComponent) listboxItems: QueryList<ListboxItemComponent>;

  listData: Array<any> = [];
  filteredData = this.listData;
  chipArray = Array();
  itemIsSelected = false;

  itemChunkSize = 20;
  defaultLastItemIndex = 20;
  lastItemIndex = this.defaultLastItemIndex;
  firstItemIndex = 0;
  forceScrollTop = false;

  constructor(
    private mockDataService: MockDataService,
    private comboboxService: ComboboxService,
    private cdr: ChangeDetectorRef,
    private renderer: Renderer2,
    private el: ElementRef
  ) {}

  ngOnInit() {
    this.getMockData();
  }

  getMockData() {
    this.mockDataService.getLargeData().subscribe((data: Array<{ id: string; actor: { login: string } }>) => {
      this.listData = data.map((item) => {
        return { label: item.actor.login, value: item.id };
      });
      this.filteredData = this.listData;
    });
  }

  ngAfterViewInit(): void {
    if (this.combobox) {
      this.combobox.itemSelected.subscribe((event) => {
        this.updateChipArray();
      });
    }
    this.updateChipArray();

    // listen to listbox scroll event
    this.renderer.listen(this.combobox.listbox.el.nativeElement, 'scroll', (event) => {
      // if we are intentionally scrolling to top via scrollToTop(), return
      if (this.forceScrollTop) {
        this.forceScrollTop = false;
        return;
      }
      const currentScrollPosition = event.target.scrollTop + event.target.offsetHeight;

      const maxScrollPosition = event.target.scrollHeight - 10;

      if (currentScrollPosition >= maxScrollPosition) {
        // if the current position is at the bottom of the list, append more items
        this.appendItems();
      } else if (event.target.scrollTop <= 10) {
        // else if the current position is at the top of the list, prepend more items
        const firstItem = this.combobox.listbox.listItems.first.el.nativeElement;

        // calculate the current offset of the first item before prepending
        const firstItemOffset = firstItem ? firstItem.offsetTop - event.target.scrollTop : 0;

        this.prependItems();
        if (firstItem) {
          // calculate the new offset of the first item after prepending and scroll to it
          const firstItemNewOffset = firstItem.offsetTop;
          event.target.scrollTop = firstItemNewOffset - firstItemOffset;
        }
      }
    });
  }

  updateChipArray() {
    const selectedValues = this.combobox.value?.value || [];
    this.chipArray = selectedValues.map((value: string) =>
      this.listData.find((option) => option && option.value === value)
    );
    this.cdr.detectChanges(); // required to update the view
  }

  deleteChip(value: string) {
    this.combobox?.listbox?.listItems?.find((item) => item.value === value)?.selectItem();
    if (this.combobox?.chips?.length) {
      this.combobox?.chips.last.button?.el.nativeElement.focus();
    }
  }

  appendItems() {
    let newLastIndex = this.lastItemIndex + this.itemChunkSize;

    // if no chunk is added, return
    if (newLastIndex === this.lastItemIndex) {
      return;
    }

    // if the new last index is greater than the total number of items, set it to the last item
    if (this.filteredData.length <= newLastIndex) {
      newLastIndex = this.filteredData.length;
    }
    this.lastItemIndex = newLastIndex;
    this.firstItemIndex = newLastIndex - 2 * this.itemChunkSize;
  }

  prependItems() {
    let newFirstIndex = Math.max(0, this.firstItemIndex - this.itemChunkSize);

    // if we are at the beginning of the list, return
    if (newFirstIndex === this.firstItemIndex) {
      return;
    }
    this.firstItemIndex = newFirstIndex;
    this.lastItemIndex = newFirstIndex + 2 * this.itemChunkSize;

    this.cdr.detectChanges();
  }

  scrollToTop() {
    // You must set a flag that we are intentionally scrolling to top so the scroll renderer event does not trigger
    this.forceScrollTop = true;
    this.firstItemIndex = 0;
    this.lastItemIndex = this.defaultLastItemIndex;
    this.combobox.listbox.el.nativeElement.scrollTop = 0;
  }
}
