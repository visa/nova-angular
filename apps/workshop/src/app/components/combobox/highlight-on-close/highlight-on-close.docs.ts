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
import { ComboboxDirective, ComboboxService, NovaLibModule } from '@visa/nova-angular';
import { VisaChevronDownTiny, VisaChevronUpTiny, VisaErrorTiny } from '@visa/nova-icons-angular';

/** #custom **/
@Component({
  selector: 'nova-workshop-combobox-highlight-on-close',
  templateUrl: './highlight-on-close.docs.html',
  standalone: true,
  imports: [CommonModule, NovaLibModule, VisaErrorTiny, VisaChevronDownTiny, VisaChevronUpTiny]
})
export class HighlightOnCloseComboboxComponent implements AfterViewInit {
  @ViewChild(ComboboxDirective) combobox: ComboboxDirective;
  constructor(private comboboxService: ComboboxService) {}

  ngAfterViewInit(): void {
    if (this.combobox) {
      this.comboboxService.selectHighlightedOnMenuClose(this.combobox);
    }
  }
}
