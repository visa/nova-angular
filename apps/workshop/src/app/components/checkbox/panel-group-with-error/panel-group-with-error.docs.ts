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
import { CheckboxDirective, NovaLibModule } from '@visa/nova-angular';
import { VisaErrorTiny } from '@visa/nova-icons-angular';

/** #docs */
@Component({
  selector: 'nova-workshop-checkbox-panel-group-with-error',
  templateUrl: './panel-group-with-error.docs.html',
  standalone: true,
  imports: [CommonModule, NovaLibModule, VisaErrorTiny]
})
export class PanelGroupWithErrorCheckboxComponent {
  @ViewChildren(CheckboxDirective) checkboxes: QueryList<CheckboxDirective>;
  isInvalid = false;

  handleChange() {
    this.isInvalid = !this.checkboxes.some((checkbox) => checkbox.checked);
  }

  handleSubmit() {
    this.isInvalid = !this.checkboxes.some((checkbox) => checkbox.checked);
    if (this.isInvalid) this.checkboxes.first.el.nativeElement.focus();
  }

  handleReset() {
    this.checkboxes.forEach((checkbox) => (checkbox.checked = false));
    this.isInvalid = false;
  }
}
