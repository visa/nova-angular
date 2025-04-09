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
import { Component, ViewChild } from '@angular/core';
import { ListboxDirective, ListboxService, NovaLibModule } from '@visa/nova-angular';
import multiselectBasic from '../example-data/multiselect-basic';

/** #custom */
@Component({
  imports: [CommonModule, NovaLibModule],
  standalone: true,
  selector: 'nova-workshop-listbox-multi-select-scroll-to-index',
  templateUrl: './multi-select-scroll-to-index.docs.html'
})
export class MultiSelectScrollToIndexListboxComponent {
  @ViewChild(ListboxDirective) listbox: ListboxDirective;
  items = multiselectBasic;
  index = this.items.length - 1;

  constructor(private listboxService: ListboxService) {}

  selectAndScroll() {
    if (this.listbox) {
      this.listbox.value = this.items[this.index].value;
      this.listboxService.scrollItemIntoView(this.listbox, this.index);
    }
  }

  reset() {
    this.listbox.value = null;
    this.listboxService.scrollItemIntoView(this.listbox, 0);
  }
}
