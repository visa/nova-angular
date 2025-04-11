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
import { Component } from '@angular/core';
import { NovaLibModule } from '@visa/nova-angular';
import { VisaErrorTiny } from '@visa/nova-icons-angular';

/** #docs */
/** @ignore */
@Component({
  selector: 'nova-workshop-radio-error',
  templateUrl: './error.docs.html',
  standalone: true,
  imports: [CommonModule, NovaLibModule, VisaErrorTiny]
})
export class ErrorRadioComponent {
  isInvalid = false;

  handleChange(radioRef: HTMLInputElement) {
    this.isInvalid = !radioRef.checked;
  }

  handleSubmit(radioRef: HTMLInputElement) {
    this.isInvalid = !radioRef.checked;
    if (this.isInvalid) {
      radioRef.focus();
    }
  }

  handleReset(radioRef: HTMLInputElement) {
    this.isInvalid = false;
    radioRef.checked = false;
  }
}
