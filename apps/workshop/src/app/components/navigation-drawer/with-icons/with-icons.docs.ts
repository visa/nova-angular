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
import { NovaLibModule, PanelComponent } from '@visa/nova-angular';
import {
  VisaAccountTiny,
  VisaChevronDownTiny,
  VisaChevronUpTiny,
  VisaCloseTiny,
  VisaMediaFastForwardTiny,
  VisaMediaRewindTiny,
  VisaNotesTiny,
  VisaSecurityTiny,
  VisaSettingsTiny,
  VisaStatisticsTiny,
  VisaSupportTicketTiny
} from '@visa/nova-icons-angular';

@Component({
  selector: 'nova-workshop-nav-drawer-with-icons',
  templateUrl: './with-icons.docs.html',
  standalone: true,
  imports: [
    CommonModule,
    NovaLibModule,
    VisaAccountTiny,
    VisaChevronDownTiny,
    VisaChevronUpTiny,
    VisaMediaRewindTiny,
    VisaMediaFastForwardTiny,
    VisaStatisticsTiny,
    VisaSettingsTiny,
    VisaNotesTiny,
    VisaSecurityTiny,
    VisaSupportTicketTiny,
    VisaCloseTiny
  ]
})
export class WithIconsNavDrawerComponent {
  @ViewChild(PanelComponent) panel: PanelComponent;

  panelElement: HTMLDialogElement;
  disclosureTabOpen = false;

  showModal() {
    this.panelElement = <HTMLDialogElement>document.getElementById(this.panel?.id);
    this.panelElement.showModal();
  }

  closeModal() {
    this.panelElement.close();
  }
}
