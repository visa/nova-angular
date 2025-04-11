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
import { Component, signal } from '@angular/core';
import { NovaLibModule } from '@visa/nova-angular';
import { VisaCloseTiny, VisaMediaFastForwardTiny, VisaMediaRewindTiny } from '@visa/nova-icons-angular';

@Component({
  selector: 'nova-workshop-panel-responsive-expanded-tabbed',
  templateUrl: './responsive-expanded-tabbed.docs.html',
  standalone: true,
  imports: [NovaLibModule, VisaMediaRewindTiny, VisaMediaFastForwardTiny, VisaCloseTiny]
})
export class ResponsiveExpandedTabbedPanelComponent {
  automaticTabContent = [
    {
      id: 'nova-tab-panel-auto-example-0',
      tabLabel: 'FAQ'
    },
    {
      id: 'nova-tab-panel-auto-example-1',
      tabLabel: 'Chat'
    },
    {
      id: 'nova-tab-panel-auto-example-2',
      tabLabel: 'Contact'
    }
  ];
  readonly expanded = signal(true);
  readonly selectedTab = signal(0);

  selectTab(index: number) {
    this.selectedTab.set(index);
  }
  toggleExpanded() {
    this.expanded.update((expanded) => !expanded);
  }
}
