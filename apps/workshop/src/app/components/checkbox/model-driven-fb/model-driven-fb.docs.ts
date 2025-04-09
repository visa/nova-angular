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
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NovaLibModule } from '@visa/nova-angular';
import { VisaErrorTiny } from '@visa/nova-icons-angular';

/** #framework-specific */
@Component({
  selector: 'nova-workshop-checkbox-model-driven-fb',
  templateUrl: './model-driven-fb.docs.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NovaLibModule, VisaErrorTiny]
})
export class ModelDrivenFbCheckboxComponent {
  formValidation = this.fb.group({
    input1: [true],
    input2: [false],
    input3: [false]
  });
  isSubmitted = false;
  isInvalid = false;

  constructor(private fb: FormBuilder) {}

  handleChange(form: FormGroup) {
    this.isInvalid = !Object.values(form.value).some((item) => item === true);
  }

  onSubmit(form: FormGroup, firstInput: HTMLInputElement) {
    const selected = Object.values(form.value).find((item) => item === true); // if an item is selected, then form is valid
    this.isInvalid = selected ? false : true;
    this.isSubmitted = true;
    if (this.isInvalid) firstInput.focus();
  }

  onReset(form: FormGroup) {
    form.reset();
    this.isSubmitted = false;
  }
}
