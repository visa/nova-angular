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
import { VisaChevronDownTiny } from '@visa/nova-icons-angular';

/** #framework-specific **/
@Component({
  selector: 'nova-workshop-select-model-driven-object',
  templateUrl: './model-driven-object.docs.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NovaLibModule, VisaChevronDownTiny]
})
export class ModelDrivenObjectSelectComponent {
  exampleObject = [
    { value: 1, label: 'United States' },
    { value: 2, label: 'Australia' },
    { value: 3, label: 'Canada' },
    { value: 4, label: 'Brazil' },
    { value: 5, label: 'England' }
  ];

  object = new FormControl(this.exampleObject[4]);
}
