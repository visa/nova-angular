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
import { FloatingUIContainer, NovaLibModule, PanelComponent } from '@visa/nova-angular';
import {
  VisaAccountTiny,
  VisaChevronDownTiny,
  VisaChevronUpTiny,
  VisaCloseTiny,
  VisaMenuLow
} from '@visa/nova-icons-angular';

@Component({
  selector: 'nova-workshop-nav-drawer-nested-with-section-titles',
  templateUrl: './nested-with-section-titles.docs.html',
  standalone: true,
  imports: [
    CommonModule,
    NovaLibModule,
    VisaAccountTiny,
    VisaChevronDownTiny,
    VisaChevronUpTiny,
    VisaMenuLow,
    VisaCloseTiny
  ]
})
export class NestedWithSectionTitlesNavDrawerComponent {
  @ViewChild(PanelComponent) panel: PanelComponent;

  panelElement: HTMLDialogElement;
  disclosureTabOpen = false;
  l1_2Open = false;
  l2_2Open = false;

  showModal() {
    this.panelElement = <HTMLDialogElement>document.getElementById(this.panel?.id);
    this.panelElement.showModal();
  }

  closeModal() {
    this.panelElement.close();
  }
}
