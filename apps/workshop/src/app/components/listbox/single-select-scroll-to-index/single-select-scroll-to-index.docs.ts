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
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { ListboxDirective, ListboxService, NovaLibModule } from '@visa/nova-angular';
import singleSelectBasic from '../example-data/single-select-basic';

/** #docs */

/** @ignore */
@Component({
  imports: [CommonModule, NovaLibModule],
  standalone: true,
  selector: 'nova-workshop-listbox-single-select-scroll-to-index',
  templateUrl: './single-select-scroll-to-index.docs.html'
})
export class SingleSelectScrollToIndexListboxComponent implements AfterViewInit {
  @ViewChild(ListboxDirective) listbox: ListboxDirective;
  items = singleSelectBasic;
  index = 6;

  constructor(private listboxService: ListboxService) {}

  ngAfterViewInit() {
    if (this.listbox) {
      // scrolls given item of index into view
      this.listboxService.scrollItemIntoView(this.listbox, this.index);
    }
  }
}
