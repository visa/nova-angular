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
import { InputDirective, NovaLibModule } from '@visa/nova-angular';
import { VisaErrorTiny } from '@visa/nova-icons-angular';

@Component({
  imports: [CommonModule, NovaLibModule, VisaErrorTiny],
  standalone: true,
  selector: 'nova-workshop-date-time-selector-time-selector-with-error',
  templateUrl: './time-selector-with-error.docs.html'
})
export class InvalidTimeSelectorDateTimeComponent {
  @ViewChild(InputDirective) input: InputDirective;
  isInvalid = false;

  handleSubmit() {
    this.isInvalid = !this.input.value;

    if (this.isInvalid) {
      this.input.el.nativeElement.focus();
    }
  }

  handleReset() {
    this.isInvalid = false;
    this.input.value = '';
  }
}
