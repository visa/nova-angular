/**
 *              Copyright (c) 2025 Visa, Inc.
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
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FloatingUIPlacements, FloatingUIService, NovaLibModule } from '@visa/nova-angular';
import {
  VisaChevronDownTiny,
  VisaChevronUpTiny,
  VisaCopyTiny,
  VisaDeleteTiny,
  VisaExportTiny,
  VisaFileDownloadTiny
} from '@visa/nova-icons-angular';

/** #custom */
@Component({
  selector: 'nova-workshop-dropdown-menu-native-popover',
  templateUrl: './native-popover.docs.html',
  standalone: true,
  imports: [
    CommonModule,
    NovaLibModule,
    VisaExportTiny,
    VisaCopyTiny,
    VisaFileDownloadTiny,
    VisaDeleteTiny,
    VisaChevronDownTiny,
    VisaChevronUpTiny
  ]
})
export class NativePopoverDropdownmenuComponent implements AfterViewInit {
  @ViewChild('trigger') trigger: ElementRef;
  @ViewChild('popup') popup: ElementRef;

  isShown = false;

  constructor(private floatingUIService: FloatingUIService) {}

  ngAfterViewInit(): void {
    // used for styling. Toggle behavior is implemented by native popover UI
    if (this.trigger && this.popup) {
      this.floatingUIService.positionFloatingUI(
        this.trigger.nativeElement,
        this.popup.nativeElement,
        FloatingUIPlacements.BOTTOM_START
      );
    }
  }

  onToggle(event: Event) {
    this.isShown = (event as ToggleEvent).newState === 'open';
  }
}
