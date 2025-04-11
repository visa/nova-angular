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
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ListboxDirective, NovaLibModule } from '@visa/nova-angular';
import { VisaErrorTiny } from '@visa/nova-icons-angular';
import multiselectReactiveForm from '../example-data/multiselect-reactive-form';
import singleSelectReactiveForm from '../example-data/single-select-reactive-form';

/** #framework-specific */
@Component({
  selector: 'nova-workshop-listbox-model-driven-fb',
  templateUrl: './model-driven-fb.docs.html',
  standalone: true,
  imports: [CommonModule, NovaLibModule, ReactiveFormsModule, VisaErrorTiny]
})
export class ModelDrivenFBListboxComponent {
  @ViewChildren(ListboxDirective) listboxes: QueryList<ListboxDirective>;
  singleSelectItems = singleSelectReactiveForm;

  multiselectItems = multiselectReactiveForm;

  formValidation = this.fb.group({
    ssFormControl: ['', Validators.required],
    msFormControl: [[], Validators.required]
  });
  isSubmitted = false;

  constructor(private fb: FormBuilder) {}

  onSubmit() {
    this.isSubmitted = true;
    const invalidIndex = Object.values(this.formValidation.controls).findIndex((control) => control.invalid);
    if (invalidIndex !== -1) {
      this.listboxes.toArray()[invalidIndex].listItems.first.el.nativeElement.focus();
    }
  }
}
