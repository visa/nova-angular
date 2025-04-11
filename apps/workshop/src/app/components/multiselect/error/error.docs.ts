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
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {
  ComboboxDirective,
  InputDirective,
  ListboxDirective,
  ListboxItemComponent,
  NovaLibModule
} from '@visa/nova-angular';
import { VisaChevronDownTiny, VisaChevronUpTiny, VisaClearAltTiny, VisaErrorTiny } from '@visa/nova-icons-angular';

/** #docs */
@Component({
  selector: 'nova-workshop-multiselect-error',
  templateUrl: './error.docs.html',
  standalone: true,
  imports: [CommonModule, NovaLibModule, VisaChevronDownTiny, VisaErrorTiny, VisaChevronUpTiny, VisaClearAltTiny]
})
export class ErrorMultiselectComponent implements AfterViewInit {
  @ViewChild(ComboboxDirective) combobox: ComboboxDirective;
  @ViewChildren(ListboxItemComponent) listboxItems: QueryList<ListboxItemComponent>;
  @ViewChild(ListboxDirective) listbox: ListboxDirective;
  @ViewChild(InputDirective) input: InputDirective;

  chipArray = Array();
  isInvalid = false;
  isSubmitted = false;

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

  onChange(event: any) {
    if (event && event.length > 0) {
      this.isInvalid = false;
    }
  }

  submit() {
    this.isInvalid = this.chipArray.length === 0;
    if (this.isInvalid) this.combobox.input.el.nativeElement.focus();
    this.isSubmitted = true;
  }

  reset() {
    this.isInvalid = false;
    this.isSubmitted = false;
    this.combobox.value = '';
    this.chipArray = [];
  }

  constructor(
    private el: ElementRef,
    private cdr: ChangeDetectorRef
  ) {}
}
