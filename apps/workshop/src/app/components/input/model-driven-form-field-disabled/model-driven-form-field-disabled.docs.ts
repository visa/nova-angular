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
import { Component, QueryList, Renderer2, ViewChildren } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputDirective, NovaLibModule } from '@visa/nova-angular';
import { VisaErrorTiny } from '@visa/nova-icons-angular';

/** @ignore */
@Component({
  selector: 'nova-workshop-input-model-driven-form-field-disabled',
  templateUrl: './model-driven-form-field-disabled.docs.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NovaLibModule, VisaErrorTiny]
})
export class NovaModelDrivenFormFieldDisabledComponent {
  @ViewChildren(InputDirective) inputs: QueryList<InputDirective>;
  formValidation: FormGroup;
  input1 = new FormControl('', [Validators.required]);
  input2 = new FormControl('', [Validators.required]);
  input3 = new FormControl('', [Validators.required]);
  isSubmitted = false;
  constructor(private renderer: Renderer2) {
    this.formValidation = new FormGroup({
      input1: this.input1,
      input2: this.input2,
      input3: this.input3
    });
  }
  toggleDisabled() {
    this.formValidation.controls['input1']?.disabled
      ? this.formValidation.controls['input1']?.enable()
      : this.formValidation.controls['input1']?.disable();
  }
  onSubmit() {
    this.isSubmitted = true;
    const invalidIndex = Object.values(this.formValidation.controls).findIndex((control) => control.invalid);
    if (invalidIndex !== -1) {
      const id = '#' + this.inputs.toArray()[invalidIndex].id;
      this.renderer.selectRootElement(id).focus();
    }
  }
}
