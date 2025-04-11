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
import { Component, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ComboboxDirective, ComboboxService, ListboxItemComponent, NovaLibModule } from '@visa/nova-angular';
import { VisaChevronDownTiny, VisaChevronUpTiny, VisaErrorTiny } from '@visa/nova-icons-angular';

/** @ignore */
@Component({
  selector: 'nova-workshop-multiselect-model-driven-with-programmatic-selection',
  templateUrl: './model-driven-with-programmatic-selection.docs.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NovaLibModule, VisaErrorTiny, VisaChevronDownTiny, VisaChevronUpTiny]
})
export class ModelDrivenProgrammticSelectionMultiselectComponent {
  @ViewChild(ComboboxDirective) combobox: ComboboxDirective;
  constructor(private comboboxService: ComboboxService) {}

  public cardTypes = [
    {
      label: 'Silver Signature Card',
      value: 'silver-signature-card'
    },
    {
      label: 'Visa Signature Card',
      value: 'visa-signature-card'
    },
    {
      label: 'Platinum Visa Card',
      value: 'platinum-visa-card'
    },
    {
      label: 'Gold Signature Card',
      value: 'gold-signature-card'
    },
    {
      label: 'Visa Debit Card',
      value: 'visa-debit-card'
    },
    {
      label: 'Visa Credit Card',
      value: 'visa-credit-card'
    }
  ];

  filteredItems = this.cardTypes;
  val = new FormControl(this.filteredItems[0]);

  ngAfterViewInit(): void {
    if (this.combobox) {
      // ComboboxService provider needed to get unique reference to filteredListEmitter
      this.combobox.filteredListEmitter.subscribe((listItems: ListboxItemComponent[]) => {
        this.extractList(listItems);
      });

      this.comboboxService.autoFilterDisplayedItems(this.combobox);
    }
  }

  /**
   * This function takes the ListboxItems[] and transforms it into the filtered array of the same shape of cardTypes ([{ label: '', value: '' }])
   * @param listItems
   */
  extractList(listItems: ListboxItemComponent[]) {
    let values: (string | number)[] = [];
    if (!listItems.length) this.filteredItems = [];
    listItems.forEach((item: ListboxItemComponent) => {
      if (item.value) values.push(item.value);
    });
    this.filteredItems = this.cardTypes.filter((item) => values.includes(item.value));
  }

  reset() {
    this.filteredItems = this.cardTypes;
    this.val.reset();
  }
}
