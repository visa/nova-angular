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
import { Component, ViewChild } from '@angular/core';
import { ComboboxDirective, ComboboxFilterType, NovaLibModule } from '@visa/nova-angular';
import { VisaChevronDownTiny, VisaChevronUpTiny, VisaErrorTiny } from '@visa/nova-icons-angular';

/** #custom **/
@Component({
  selector: 'nova-workshop-combobox-fully-custom-filter',
  templateUrl: './fully-custom-filter.docs.html',
  standalone: true,
  imports: [CommonModule, NovaLibModule, VisaErrorTiny, VisaChevronDownTiny, VisaChevronUpTiny]
})
export class CustomFilterComboboxComponent {
  @ViewChild(ComboboxDirective) combobox: ComboboxDirective;

  public cardTypes = [
    {
      label: 'Option A',
      value: 'option-a'
    },
    {
      label: 'Option B',
      value: 'option-b'
    },
    {
      label: 'Option C',
      value: 'option-c'
    },
    {
      label: 'Option D',
      value: 'option-d'
    },
    {
      label: 'Option E',
      value: 'option-e'
    }
  ];

  filteredItems = this.cardTypes;

  filter(filterEvent: { type: ComboboxFilterType; input: string }) {
    this.filteredItems = [];
    if (filterEvent.type === ComboboxFilterType.INPUT) {
      this.cardTypes.forEach((item) => {
        // this uses .startsWith whereas the service uses .includes
        if (item.label.toLowerCase().startsWith(filterEvent.input.toLowerCase())) this.filteredItems.push(item);
      });
    } else if (filterEvent.type === ComboboxFilterType.SELECTION) {
      const selectedItem = this.cardTypes.find((item) => item.value === filterEvent.input);
      if (selectedItem) {
        this.filteredItems.push(selectedItem);
      }
    } else {
      this.filteredItems = this.cardTypes;
    }
  }
}
