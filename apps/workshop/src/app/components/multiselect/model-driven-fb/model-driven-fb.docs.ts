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
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ComboboxDirective, NovaLibModule } from '@visa/nova-angular';
import { VisaChevronDownTiny, VisaChevronUpTiny, VisaClearAltTiny, VisaErrorTiny } from '@visa/nova-icons-angular';

/** #framework-specific */
@Component({
  selector: 'nova-workshop-multiselect-model-driven-fb',
  templateUrl: './model-driven-fb.docs.html',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NovaLibModule,
    VisaClearAltTiny,
    VisaErrorTiny,
    VisaChevronDownTiny,
    VisaChevronUpTiny
  ]
})
export class ModelDrivenFbMultiselectComponent {
  @ViewChild(ComboboxDirective) combobox: ComboboxDirective;

  multiselectForm = this.fb.group({
    multiselectFormControl: this.fb.control<{ label: string; value: string[] } | null | ''>(null, Validators.required)
  });
  isSubmitted = false;
  isInvalid = false;

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
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {}

  submit() {
    this.isSubmitted = true;
    this.isInvalid = this.multiselectForm.controls.multiselectFormControl.invalid;
    if (this.isInvalid) this.combobox.input.el.nativeElement.focus();
  }

  reset() {
    this.isInvalid = false;
    this.isSubmitted = false;
  }
}
