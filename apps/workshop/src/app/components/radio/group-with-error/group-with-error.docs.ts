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
import { NovaLibModule, RadioGroupDirective } from '@visa/nova-angular';
import { VisaErrorTiny } from '@visa/nova-icons-angular';

/** #docs */
@Component({
  selector: 'nova-workshop-radio-group-with-error',
  templateUrl: './group-with-error.docs.html',
  standalone: true,
  imports: [CommonModule, NovaLibModule, VisaErrorTiny]
})
export class GroupWithErrorRadioComponent {
  @ViewChild(RadioGroupDirective) radioGroup: RadioGroupDirective;
  isInvalid: boolean = false;

  handleChange() {
    this.isInvalid = false; // when a radio button is changed, it means it is selected, so the group is no longer invalid
  }

  handleSubmit() {
    if (!this.radioGroup?.value) {
      // no radio is selected
      this.isInvalid = true;
      this.radioGroup.radios.first.el.nativeElement.focus();
    }
  }

  handleReset() {
    this.radioGroup.value = null;
    this.isInvalid = false;
  }
}
