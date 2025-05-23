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
import { RouterModule } from '@angular/router';
import { NovaLibModule } from '@visa/nova-angular';
import {
  VisaAccountTiny,
  VisaChevronDownTiny,
  VisaChevronUpTiny,
  VisaMediaFastForwardTiny,
  VisaMediaRewindTiny,
  VisaNotesTiny,
  VisaSecurityTiny,
  VisaSettingsTiny,
  VisaStatisticsTiny,
  VisaSupportTicketTiny
} from '@visa/nova-icons-angular';

@Component({
  selector: 'nova-workshop-nav-vertical-alternate',
  templateUrl: './alternate.docs.html',
  styleUrls: ['../vertical-navigation.docs.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
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
    VisaSupportTicketTiny
  ]
})
export class AlternateVerticalNavComponent {
  navOpen = true;
  disclosureTabOpen = false;

  handleToggle(event: boolean) {
    this.disclosureTabOpen = event;
  }
}
