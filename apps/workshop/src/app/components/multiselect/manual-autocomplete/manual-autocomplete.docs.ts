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
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { ComboboxDirective, ComboboxService, ListboxItemComponent, NovaLibModule } from '@visa/nova-angular';
import { VisaChevronDownTiny, VisaChevronUpTiny, VisaClearAltTiny } from '@visa/nova-icons-angular';

/** #docs **/
@Component({
  selector: 'nova-workshop-multiselect-manual-autocomplete',
  templateUrl: './manual-autocomplete.docs.html',
  providers: [ComboboxService],
  standalone: true,
  imports: [CommonModule, NovaLibModule, VisaClearAltTiny, VisaChevronDownTiny, VisaChevronUpTiny]
})
export class ManualAutocompleteMultiselectComponent {
  @ViewChild(ComboboxDirective) combobox: ComboboxDirective;
  constructor(
    private comboboxService: ComboboxService,
    private cdRef: ChangeDetectorRef
  ) {}

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
  chipArray = Array();
  filteredItems = this.cardTypes;

  ngAfterViewInit(): void {
    if (this.combobox) {
      this.combobox.itemSelected.subscribe(() => {
        this.updateChipArray();
      });
      // ComboboxService provider needed to get unique reference to filteredListEmitter
      this.combobox.filteredListEmitter.subscribe((listItems: ListboxItemComponent[]) => {
        this.extractList(listItems);
      });

      this.comboboxService.autoFilterDisplayedItems(this.combobox);
      // update initial chipArray
      this.updateChipArray();
    }
  }

  updateChipArray() {
    const selectedValues = this.combobox.value?.value || [];
    this.chipArray = selectedValues.map((value: string) =>
      this.cardTypes.find((option) => option && option.value === value)
    );
    this.cdRef.detectChanges(); // required to update the view
  }

  deleteChip(value: string) {
    this.combobox?.listbox?.listItems?.find((item) => item.value === value)?.selectItem();
    if (this.combobox?.chips?.length) {
      this.combobox?.chips.last.button?.el.nativeElement.focus();
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
}
