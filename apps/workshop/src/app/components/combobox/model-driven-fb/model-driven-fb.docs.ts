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
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ComboboxDirective, NovaLibModule } from '@visa/nova-angular';
import { VisaChevronDownTiny, VisaChevronUpTiny, VisaErrorTiny } from '@visa/nova-icons-angular';

/** #framework-specific */
@Component({
  selector: 'nova-workshop-combobox-model-driven-fb',
  templateUrl: './model-driven-fb.docs.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NovaLibModule, VisaErrorTiny, VisaChevronDownTiny, VisaChevronUpTiny]
})
export class ModelDrivenFbComboboxComponent {
  @ViewChild(ComboboxDirective) combobox: ComboboxDirective;

  comboboxForm = this.fb.group({
    comboboxFormControl: this.fb.control<{ label: string; value: string } | null | ''>(null, Validators.required)
  });
  isSubmitted = false;
  isInvalid = false;

  constructor(private fb: FormBuilder) {}

  submit() {
    this.isSubmitted = true;
    this.isInvalid = this.comboboxForm.controls.comboboxFormControl.invalid;
    if (this.isInvalid) this.combobox.input.el.nativeElement.focus();
  }

  reset() {
    this.isInvalid = false;
    this.isSubmitted = false;
    this.combobox.value = '';
  }
}
