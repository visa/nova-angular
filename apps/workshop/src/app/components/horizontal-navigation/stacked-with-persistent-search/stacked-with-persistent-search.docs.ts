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
import { ButtonDirective, InputDirective, NovaLibModule } from '@visa/nova-angular';
import {
  VisaAccountLow,
  VisaChevronDownTiny,
  VisaChevronUpTiny,
  VisaClearAltTiny,
  VisaMenuLow,
  VisaNotificationsLow,
  VisaSearchLow
} from '@visa/nova-icons-angular';

@Component({
  selector: 'nova-workshop-horizontal-nav-stacked-with-persistent-search',
  templateUrl: './stacked-with-persistent-search.docs.html',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NovaLibModule,
    VisaMenuLow,
    VisaSearchLow,
    VisaAccountLow,
    VisaNotificationsLow,
    VisaChevronDownTiny,
    VisaChevronUpTiny,
    VisaClearAltTiny
  ]
})
export class StackedWithPersistentSearchHorizontalNavComponent {
  @ViewChild('inputRef') input: ElementRef;
  @ViewChild('searchClearBtn') button: ElementRef;
  inFocus: boolean = false;

  clearAndFocus() {
    if (this.input) {
      this.input.nativeElement.value = '';
      this.input.nativeElement.focus();
    }
  }

  focus() {
    this.inFocus = true;
  }

  blur(event: FocusEvent) {
    if (event.relatedTarget !== this.button?.nativeElement && event.relatedTarget !== this.input?.nativeElement) {
      this.inFocus = false;
    }
  }
}
