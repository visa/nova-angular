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
import { FormsModule, NgForm } from '@angular/forms';
import { InputDirective, NovaLibModule } from '@visa/nova-angular';
import { VisaErrorTiny } from '@visa/nova-icons-angular';

/** #framework-specific */
@Component({
  selector: 'nova-workshop-input-template-driven-form',
  templateUrl: './template-driven-form.docs.html',
  standalone: true,
  imports: [CommonModule, FormsModule, NovaLibModule, VisaErrorTiny]
})
export class TemplateDrivenFormInputComponent {
  @ViewChildren(InputDirective) inputs: QueryList<InputDirective>;
  isSubmitted = false;

  constructor(private renderer: Renderer2) {}

  handleFormSubmit(form: NgForm) {
    this.isSubmitted = true;
    if (form.invalid) {
      const invalidIndex = Object.values(form.controls).findIndex((control) => control.invalid);
      if (invalidIndex !== -1) {
        const id = '#' + this.inputs.toArray()[invalidIndex].id;
        this.renderer.selectRootElement(id).focus();
      }
    }
  }

  handleFormReset(form: NgForm) {
    this.isSubmitted = false;
    form.reset();
  }
}
