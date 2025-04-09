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
import { Component, ViewChild, ViewChildren, AfterViewInit, QueryList } from '@angular/core';
import {
  ComboboxDirective,
  InputDirective,
  ListboxDirective,
  RadioDirective,
  SelectDirective,
  SwitchDirective
} from '@visa/nova-angular';
import { CheckboxDirective, NovaLibModule } from '@visa/nova-angular';
import { VisaChevronRightTiny, VisaChevronDownTiny, VisaChevronUpTiny } from '@visa/nova-icons-angular';

/** @ignore */
@Component({
  selector: 'nova-workshop-form-control-values',
  templateUrl: './form-control-values.docs.html',
  standalone: true,
  imports: [CommonModule, NovaLibModule, VisaChevronRightTiny, VisaChevronDownTiny, VisaChevronUpTiny]
})
export class FormControlValuesComponent implements AfterViewInit {
  @ViewChild(CheckboxDirective) checkbox: CheckboxDirective;
  @ViewChild(ComboboxDirective) combobox: ComboboxDirective;
  @ViewChildren(ListboxDirective) listbox: QueryList<ListboxDirective>;
  @ViewChildren(InputDirective) input: QueryList<InputDirective>;
  @ViewChildren(RadioDirective) radios: RadioDirective[];
  @ViewChild(SelectDirective) select: SelectDirective;
  @ViewChild(SwitchDirective) switch: SwitchDirective;

  ngAfterViewInit(): void {
    this.printValues('all');
  }

  printValues(type: 'combobox' | 'checkbox' | 'switch' | 'input' | 'radio' | 'select' | 'listbox' | 'all') {
    if (type === 'all' || type === 'combobox') console.log('Combobox:', this.combobox.value);
    if (type === 'all' || type === 'listbox') console.log('Listbox:', this.listbox.toArray()[0].value);
    if (type === 'all' || type === 'checkbox') console.log('checkbox:', this.checkbox.checked);
    if (type === 'all' || type === 'switch') console.log('switch:', this.switch.checked);
    if (type === 'all' || type === 'input') console.log('Input:', this.input.toArray()[0].value);
    if (type === 'all' || type === 'radio')
      this.radios.forEach((radio, index) => {
        console.log(`Radio ${index + 1}:`, radio.checked);
      });
    if (type === 'all' || type === 'select') console.log('Select:', this.select.value);
  }
}
