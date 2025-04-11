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
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NovaLibModule, SelectDirective } from '@visa/nova-angular';
import { VisaChevronDownTiny, VisaErrorTiny } from '@visa/nova-icons-angular';

/** #framework-specific **/
@Component({
  selector: 'nova-workshop-select-model-driven-fb',
  templateUrl: './model-driven-fb.docs.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NovaLibModule, VisaErrorTiny, VisaChevronDownTiny]
})
export class ModelDrivenFbSelectComponent {
  @ViewChildren(SelectDirective) selects: QueryList<SelectDirective>;

  formValidation = this.fb.group({
    input1: ['', Validators.required],
    input2: ['', Validators.required],
    input3: ['', Validators.required]
  });
  isSubmitted = false;

  constructor(private fb: FormBuilder) {}

  handleFocus(form: FormGroup) {
    const invalidIndex = Object.values(form.value).findIndex((item) => !item);
    if (invalidIndex !== -1 && this.selects.length > 0) {
      this.selects.toArray()[invalidIndex].el.nativeElement.focus();
    }
  }
}
