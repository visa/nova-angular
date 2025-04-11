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
import { Component, QueryList, ViewChildren } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ListboxDirective, NovaLibModule } from '@visa/nova-angular';
import { VisaErrorTiny } from '@visa/nova-icons-angular';
import multiselectTemplateForm from '../example-data/multiselect-template-form';
import singleSelectTemplateForm from '../example-data/single-select-template-form';

/** #framework-specific */
@Component({
  selector: 'nova-workshop-listbox-template-driven-form',
  templateUrl: './template-driven-form.docs.html',
  standalone: true,
  imports: [CommonModule, NovaLibModule, FormsModule, VisaErrorTiny]
})
export class TemplateDrivenFormListboxComponent {
  @ViewChildren(ListboxDirective) listboxes: QueryList<ListboxDirective>;
  isSubmitted = false;
  ss_items = singleSelectTemplateForm;
  ms_items = multiselectTemplateForm;

  handleFormSubmit(form: NgForm) {
    this.isSubmitted = true;
    if (form.invalid) {
      const invalidIndex = Object.values(form.controls).findIndex((control) => control.invalid);
      if (invalidIndex !== -1) {
        this.listboxes.toArray()[invalidIndex].listItems.first.el.nativeElement.focus();
      }
    }
  }

  handleFormReset(form: NgForm) {
    this.isSubmitted = false;
    form.reset();
  }
}
