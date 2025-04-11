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
import { Component, ViewChild } from '@angular/core';
import { ListboxDirective, NovaLibModule, NovaLibService } from '@visa/nova-angular';
import { VisaErrorTiny } from '@visa/nova-icons-angular';
import singleSelectBasic from '../example-data/single-select-basic';

/** #docs */
@Component({
  selector: 'nova-workshop-listbox-single-select-with-error',
  templateUrl: './single-select-with-error.docs.html',
  standalone: true,
  imports: [CommonModule, NovaLibModule, VisaErrorTiny]
})
export class SingleSelectWithErrorListboxComponent {
  @ViewChild(ListboxDirective) listbox: ListboxDirective;
  items = singleSelectBasic;
  isInvalid: boolean = false;

  constructor(private novaLibService: NovaLibService) {}

  handleSubmit() {
    this.isInvalid = !this.listbox.val || (this.listbox.val as (string | number)[]).length === 0;
    if (this.isInvalid) {
      const focusableIndex = this.novaLibService.nextEnabledItem(this.listbox.listItems.toArray());
      this.listbox.listItems.toArray()[focusableIndex].el.nativeElement.focus();
    }
  }

  handleReset() {
    this.isInvalid = false;
    this.listbox.value = '';
  }
}
