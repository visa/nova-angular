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
import { VisaCloseTiny, VisaSuccessLow } from '@visa/nova-icons-angular';

@Component({
  selector: 'nova-workshop-section-message-nova-success-section-message-with-action-button',
  templateUrl: './nova-success-section-message-with-action-button.docs.html',
  standalone: true,
  imports: [CommonModule, NovaLibModule, VisaSuccessLow, VisaCloseTiny]
})
export class NovaSuccessSectionMessageWithActionButtonSectionMessageComponent {}
