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
import { AfterViewInit, Component, QueryList, ViewChildren } from '@angular/core';
import { ButtonDirective, NovaLibModule, NovaLibService } from '@visa/nova-angular';

/** #custom */
@Component({
  imports: [CommonModule, NovaLibModule],
  standalone: true,
  selector: 'nova-workshop-tabs-without-arrow-navigation',
  templateUrl: './without-arrow-navigation.docs.html'
})
export class WithoutArrowNavigationTabsComponent implements AfterViewInit {
  @ViewChildren(ButtonDirective) buttons: QueryList<ButtonDirective>;
  constructor(private novaLibService: NovaLibService) {}
  selectedButtonTab = 0;

  ngAfterViewInit(): void {
    if (this.buttons.length > 0) {
      this.novaLibService.resetNavigationBehaviors(this.buttons.toArray());
    }
  }

  tabContent = [
    {
      tabLabel: 'Label 1',
      text: 'This is content area for label 1',
      id: 'nova-no-arrow-nav-example-0'
    },
    {
      tabLabel: 'Label 2',
      text: 'This is content area for label 2',
      id: 'nova-no-arrow-nav-example-1'
    },
    {
      tabLabel: 'Label 3',
      text: 'This is content area for label 3',
      id: 'nova-no-arrow-nav-example-2'
    },
    {
      tabLabel: 'Label 4',
      text: 'This is content area for label 4',
      id: 'nova-no-arrow-nav-example-3'
    }
  ];

  showPanel(index: number) {
    this.selectedButtonTab = index;
  }
}
