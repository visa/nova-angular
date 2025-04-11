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
import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NovaLibModule } from '@visa/nova-angular';
import {
  VisaAccountLow,
  VisaChevronDownTiny,
  VisaChevronUpTiny,
  VisaMenuLow,
  VisaNotificationsLow,
  VisaCloseLow,
  VisaSearchLow
} from '@visa/nova-icons-angular';

@Component({
  selector: 'nova-workshop-horizontal-nav-stacked',
  templateUrl: './stacked.docs.html',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NovaLibModule,
    VisaCloseLow,
    VisaSearchLow,
    VisaMenuLow,
    VisaChevronDownTiny,
    VisaChevronUpTiny,
    VisaNotificationsLow,
    VisaAccountLow
  ]
})
export class StackedHorizontalNavComponent {
  @ViewChild('stackedSearchInput', { static: false }) searchInput: ElementRef;
  @ViewChild('stackedSearchButton', { static: false }) searchButton: ElementRef;
  searchExpanded = false;
  isShown = false;

  toggleShown(_toggledOutput: boolean) {
    this.isShown = _toggledOutput;
  }

  toggleSearch(expanded: boolean) {
    this.searchExpanded = expanded;
    setTimeout(() => {
      // wait a tick for the elements to reappear in the dom after displaying/hiding the search
      if (this.searchExpanded) {
        this.searchInput.nativeElement.focus();
      } else {
        this.searchButton.nativeElement.focus();
      }
    });
  }
}
