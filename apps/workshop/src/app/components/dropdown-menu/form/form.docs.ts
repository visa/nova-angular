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
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FloatingUIContainer, NovaLibModule } from '@visa/nova-angular';
import { VisaChevronDownTiny, VisaChevronUpTiny } from '@visa/nova-icons-angular';

/** #custom */
@Component({
  selector: 'nova-workshop-dropdown-menu-form',
  templateUrl: './form.docs.html',
  standalone: true,
  imports: [CommonModule, NovaLibModule, VisaChevronDownTiny, VisaChevronUpTiny]
})
export class FormDropdownmenuComponent implements AfterViewInit {
  @ViewChild(FloatingUIContainer) container: FloatingUIContainer;
  menuOpen: boolean = false;

  ngAfterViewInit(): void {
    this.container?.floatingUIService?.isShownEmitter.subscribe((open) => {
      this.menuOpen = open;
    });
  }

  closeMenu() {
    this.container.floatingUIService.hidefloatingUI();
  }
}
