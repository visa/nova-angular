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
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { ButtonDirective, NovaLibModule, NovaLibService, TabListDirective } from '@visa/nova-angular';

/** #custom */
@Component({
  imports: [CommonModule, NovaLibModule],
  standalone: true,
  selector: 'nova-workshop-tabs-automatic-activation',
  templateUrl: './automatic-activation.docs.html'
})
export class AutomaticActivationTabsComponent implements AfterViewInit {
  @ViewChild(TabListDirective) tabList: TabListDirective;
  constructor(private novaLibService: NovaLibService) {}

  ngAfterViewInit(): void {
    if (this.tabList) {
      // alternatively, you could add a ViewChildren to get the ButtonDirectives directly
      let buttons: ButtonDirective[] = [];
      this.tabList.tabs.toArray().forEach((tab) => {
        buttons.push(tab.button);
      });

      this.novaLibService.addArrowKeyNavigation(buttons, true);
      this.novaLibService.addAutomaticActivation(this.tabList.tabs.toArray());
    }
  }

  selectedButtonTab = 0;

  tabContent = [
    {
      tabLabel: 'Label 1',
      text: 'This is content area for label 1',
      id: 'nova-auto-activation-tabs-example-0'
    },
    {
      tabLabel: 'Label 2',
      text: 'This is content area for label 2',
      id: 'nova-auto-activation-tabs-example-1'
    },
    {
      tabLabel: 'Label 3',
      text: 'This is content area for label 3',
      id: 'nova-auto-activation-tabs-example-2'
    },
    {
      tabLabel: 'Label 4',
      text: 'This is content area for label 4',
      id: 'nova-auto-activation-tabs-example-3'
    }
  ];

  showPanel(index: number) {
    this.selectedButtonTab = index;
  }
}
