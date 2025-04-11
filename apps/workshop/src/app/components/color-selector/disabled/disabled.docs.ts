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
import { VisaAccessibilityTiny } from '@visa/nova-icons-angular';

/** #custom */
/** @ignore */
@Component({
  imports: [CommonModule, NovaLibModule, VisaAccessibilityTiny],
  standalone: true,
  selector: 'nova-workshop-color-selector-disabled',
  templateUrl: './disabled.docs.html'
})
export class DisabledColorSelectorComponent {}
