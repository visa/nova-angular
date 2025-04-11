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
import { NovaLibModule } from '@visa/nova-angular';
import {
  VisaChevronDownTiny,
  VisaChevronUpTiny,
  VisaCopyTiny,
  VisaDeleteTiny,
  VisaExportTiny,
  VisaFileDownloadTiny
} from '@visa/nova-icons-angular';

/** #docs #custom */
@Component({
  selector: 'nova-workshop-dropdown-menu-custom-buttons',
  templateUrl: './custom-buttons.docs.html',
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
export class CustomButtonsDropdownmenuComponent {}
