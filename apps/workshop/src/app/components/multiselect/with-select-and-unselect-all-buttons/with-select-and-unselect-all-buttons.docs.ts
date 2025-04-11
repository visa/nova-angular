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
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { ComboboxDirective, FloatingUIService, NovaLibModule } from '@visa/nova-angular';
import { VisaChevronDownTiny, VisaChevronUpTiny, VisaClearAltTiny } from '@visa/nova-icons-angular';

/** #docs */
@Component({
  selector: 'nova-workshop-multiselect-with-select-and-unselect-all-buttons',
  templateUrl: './with-select-and-unselect-all-buttons.docs.html',
  standalone: true,
  imports: [CommonModule, NovaLibModule, VisaChevronDownTiny, VisaChevronUpTiny, VisaClearAltTiny],
  providers: [FloatingUIService]
})
export class SelectAndUnselectAllMenuMultiselectComponent implements AfterViewInit {
  @ViewChild(ComboboxDirective) combobox: ComboboxDirective;

  chipArray = Array();

  public optionTypes = [
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
  filteredItems = this.optionTypes;

  ngAfterViewInit(): void {
    if (this.combobox) {
      this.combobox.itemSelected.subscribe((event) => {
        this.updateChipArray();
      });
    }
    this.updateChipArray();
  }

  updateChipArray() {
    const selectedValues = this.combobox.value?.value || [];
    this.chipArray = selectedValues.map((value: string) =>
      this.optionTypes.find((option) => option && option.value === value)
    );
    this.cdr.detectChanges(); // required to update the view
  }

  deleteChip(value: string) {
    this.combobox?.listbox?.listItems?.find((item) => item.value === value)?.selectItem();
    if (this.combobox?.chips?.length) {
      this.combobox?.chips.last.button?.el.nativeElement.focus();
    }
  }

  constructor(
    private el: ElementRef,
    private cdr: ChangeDetectorRef
  ) {}

  selectAll() {
    this.chipArray = this.optionTypes;
    this.combobox?.listbox?.listItems.forEach((item) => {
      item.active = true;
    });

    this.combobox.input.value = '';
    this.cdr.detectChanges();
  }
  clearAll() {
    this.chipArray = [];
    this.combobox?.listbox?.listItems.forEach((item) => {
      item.active = false;
    });

    this.combobox.input.value = '';
    this.cdr.detectChanges();
  }
}
