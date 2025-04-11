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

/** #docs */
@Component({
  imports: [CommonModule, NovaLibModule],
  standalone: true,
  selector: 'nova-workshop-tabs-horizontal-default',
  templateUrl: './horizontal-default.docs.html'
})
export class HorizontalDefaultTabsComponent {
  selectedButtonTab = 0;

  tabContent = [
    {
      tabLabel: 'Label 1',
      text: 'This is content area for label 1',
      id: 'nova-horizontal-tabs-0'
    },
    {
      tabLabel: 'Label 2',
      text: 'This is content area for label 2',
      id: 'nova-horizontal-tabs-1'
    },
    {
      tabLabel: 'Label 3',
      text: 'This is content area for label 3',
      id: 'nova-horizontal-tabs-2'
    },
    {
      tabLabel: 'Label 4',
      text: 'This is content area for label 4',
      id: 'nova-horizontal-tabs-3'
    }
  ];

  showPanel(index: number) {
    this.selectedButtonTab = index;
  }
}
