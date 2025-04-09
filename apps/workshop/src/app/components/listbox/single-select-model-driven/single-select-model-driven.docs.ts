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
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NovaLibModule } from '@visa/nova-angular';
import singleSelectReactiveForm from '../example-data/single-select-reactive-form';

/** #framework-specific */
@Component({
  imports: [CommonModule, NovaLibModule, ReactiveFormsModule],
  standalone: true,
  selector: 'nova-workshop-listbox-single-select-model-driven',
  templateUrl: './single-select-model-driven.docs.html'
})
export class SingleSelectModelDrivenListboxComponent {
  items = singleSelectReactiveForm;
  listboxFormControl = new FormControl(this.items[2].value);
}
