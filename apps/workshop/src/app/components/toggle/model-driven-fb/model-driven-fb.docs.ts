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
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NovaLibModule } from '@visa/nova-angular';
import { VisaErrorTiny } from '@visa/nova-icons-angular';

/** #framework-specific */
@Component({
  selector: 'nova-workshop-toggle-model-driven-fb',
  templateUrl: './model-driven-fb.docs.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NovaLibModule, VisaErrorTiny]
})
export class ModelDrivenFbToggleComponent {
  formValidation = this.fb.group({
    toggleControl: ['2']
  });
  isSubmitted: boolean = false;
  isInvalid: boolean = false;

  constructor(private fb: FormBuilder) {}

  handleChange() {
    this.isInvalid = false; // when a single select toggle button is changed, it means it is selected, so the group is no longer invalid
  }

  onSubmit(button: HTMLButtonElement) {
    this.isInvalid = this.formValidation.value.toggleControl ? false : true;
    this.isSubmitted = true;
    if (this.isInvalid) button.focus();
  }

  onReset() {
    this.formValidation.reset();
    this.isSubmitted = false;
  }
}
