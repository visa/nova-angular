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
import { Component, QueryList, ViewChildren } from '@angular/core';
import { CheckboxDirective, NovaLibModule } from '@visa/nova-angular';
import { VisaErrorTiny } from '@visa/nova-icons-angular';

/** #docs */
@Component({
  selector: 'nova-workshop-checkbox-indeterminate-group-with-error',
  templateUrl: './indeterminate-group-with-error.docs.html',
  standalone: true,
  imports: [CommonModule, NovaLibModule, VisaErrorTiny]
})
export class IndeterminateGroupWithErrorCheckboxComponent {
  @ViewChildren(CheckboxDirective) checkboxes: QueryList<CheckboxDirective>;
  invalid = false;
  nestedItems = [
    {
      label: 'L1 label 1',
      checked: false,
      indeterminate: true,
      id: 'indeterminate-error-parent-group-1',
      children: [
        {
          label: 'L2 label 1',
          checked: true,
          id: 'indeterminate-error-nested-group-1'
        },
        {
          label: 'L2 label 2',
          checked: false,
          id: 'indeterminate-error-nested-group-2'
        },
        {
          label: 'L2 label 3',
          checked: false,
          id: 'indeterminate-error-nested-group-3'
        }
      ]
    }
  ];

  onParentChange(event: Event) {
    const target = event?.target as HTMLInputElement;
    const isChecked = target.checked;
    this.nestedItems[0].indeterminate = false;
    this.nestedItems[0].children?.forEach((child) => (child.checked = isChecked));
    this.invalid = !isChecked;
  }

  onChildChange() {
    // START GENAI@CHATGPT4
    const { children = [] } = this.nestedItems[0];
    const amountChecked = children.filter((item) => item.checked).length;
    // END GENAI@CHATGPT4

    if (amountChecked === children.length) {
      this.nestedItems[0].checked = true;
      this.nestedItems[0].indeterminate = false;
    } else {
      this.nestedItems[0].checked = false;
      this.nestedItems[0].indeterminate = amountChecked !== 0;

      if (amountChecked > 1) {
        this.invalid = false;
      }
    }
  }

  handleSubmit() {
    const childrenChecked = this.nestedItems[0].children?.filter((item) => item.checked);

    if (childrenChecked.length < 2) {
      this.invalid = true;
      this.checkboxes.first.el.nativeElement.focus();
    } else this.invalid = false;
  }

  handleReset() {
    this.nestedItems[0].checked = false;
    this.nestedItems[0].indeterminate = false;
    this.nestedItems[0].children?.forEach((child) => (child.checked = false));
    this.invalid = false;
  }
}
