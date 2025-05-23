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
import { Component, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NovaLibModule } from '@visa/nova-angular';
import { VisaInformationLow } from '@visa/nova-icons-angular';

@Component({
  selector: 'nova-workshop-dev-message-disabled-a-tag',
  templateUrl: './disabled-a-tag.docs.html',
  standalone: true,
  imports: [CommonModule, NovaLibModule, VisaInformationLow]
})
export class DisabledATagMessageComponent {
  @HostBinding('style.display') display = 'block';
}
