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
import { FormsModule } from '@angular/forms';
import { NovaLibModule } from '@visa/nova-angular';
import singleSelectTemplateForm from '../example-data/single-select-template-form';

/** #framework-specific */
@Component({
  imports: [CommonModule, NovaLibModule, FormsModule],
  standalone: true,
  selector: 'nova-workshop-listbox-single-select-template-driven',
  templateUrl: './single-select-template-driven.docs.html'
})
export class SingleSelectTemplateDrivenListboxComponent {
  items = singleSelectTemplateForm;
  initialValue = this.items[2].value;
}
