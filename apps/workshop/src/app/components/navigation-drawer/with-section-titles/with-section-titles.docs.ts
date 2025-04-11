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
import { RouterModule } from '@angular/router';
import { NovaLibModule, PanelComponent } from '@visa/nova-angular';
import {
  VisaAccountTiny,
  VisaAnalyticsTiny,
  VisaChevronDownTiny,
  VisaChevronUpTiny,
  VisaFavoriteStarOutlineTiny,
  VisaMediaFastForwardTiny,
  VisaMediaRewindTiny,
  VisaCloseTiny,
  VisaNotificationsTiny,
  VisaQuestionTiny,
  VisaStatisticsTiny,
  VisaTransactionsTiny,
  VisaViewGridTiny
} from '@visa/nova-icons-angular';

@Component({
  selector: 'nova-workshop-nav-drawer-with-section-titles',
  templateUrl: './with-section-titles.docs.html',
  standalone: true,
  imports: [
    CommonModule,
    NovaLibModule,
    RouterModule,
    VisaChevronDownTiny,
    VisaChevronUpTiny,
    VisaMediaRewindTiny,
    VisaMediaFastForwardTiny,
    VisaStatisticsTiny,
    VisaAccountTiny,
    VisaNotificationsTiny,
    VisaFavoriteStarOutlineTiny,
    VisaTransactionsTiny,
    VisaViewGridTiny,
    VisaAnalyticsTiny,
    VisaQuestionTiny,
    VisaCloseTiny
  ]
})
export class WithSectionTitleNavDrawerComponent {
  avatarOpen = false;
  l1_4Open = false;
  l1_6Open = false;
  l2_2Open = false;
  panelElement: HTMLDialogElement;

  @ViewChild(PanelComponent) panel: PanelComponent;

  showModal() {
    this.panelElement = <HTMLDialogElement>document.getElementById(this.panel?.id);
    this.panelElement.showModal();
  }

  closeModal() {
    this.panelElement.close();
  }
}
