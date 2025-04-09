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
import { NovaLibModule } from '@visa/nova-angular';

/** #docs */
@Component({
  imports: [CommonModule, NovaLibModule],
  standalone: true,
  selector: 'nova-workshop-checkbox-indeterminate-group',
  templateUrl: './indeterminate-group.docs.html'
})
export class IndeterminateGroupCheckboxComponent {
  nestedItems = [
    {
      label: 'L1 label 1',
      checked: false,
      indeterminate: true,
      id: 'indeterminate-parent-group-1',
      children: [
        {
          label: 'L2 label 1',
          checked: false,
          id: 'indeterminate-nested-group-1'
        },
        {
          label: 'L2 label 2',
          checked: true,
          id: 'indeterminate-nested-group-2'
        },
        {
          label: 'L2 label 3',
          checked: false,
          id: 'indeterminate-nested-group-3'
        }
      ]
    },
    {
      label: 'L1 label 2',
      checked: false,
      id: 'indeterminate-parent-group-2'
    },
    {
      label: 'L1 label 3',
      checked: false,
      id: 'indeterminate-parent-group-3'
    }
  ];

  onParentChange(event: Event) {
    const target = event?.target as HTMLInputElement;
    const isChecked = target.checked;
    this.nestedItems[0].indeterminate = false;
    this.nestedItems[0].children?.forEach((child) => (child.checked = isChecked));
  }

  onChildChange() {
    // START GENAI@CHATGPT4
    const { children = [] } = this.nestedItems[0];
    const amountChecked = children.filter((item) => item.checked).length;

    if (amountChecked === 0 || amountChecked !== children.length) {
      this.nestedItems[0].checked = false;
      this.nestedItems[0].indeterminate = amountChecked !== 0;
    } else {
      this.nestedItems[0].checked = true;
      this.nestedItems[0].indeterminate = false;
    }
    // END GENAI@CHATGPT4
  }
}
