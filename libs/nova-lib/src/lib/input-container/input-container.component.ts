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
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { CommonModule } from '@angular/common';
import {
  AfterContentInit,
  Component,
  ContentChild,
  ContentChildren,
  HostBinding,
  Input,
  QueryList
} from '@angular/core';
import { ButtonDirective } from '../button/button.directive';
import { CheckboxDirective } from '../checkbox/checkbox.directive';
import { IconToggleComponent } from '../icon-toggle/icon-toggle.component';
import { InputMessageDirective } from '../input-message/input-message.directive';
import { InputDirective } from '../input/input.directive';
import { LabelDirective } from '../label/label.directive';
import { RadioDirective } from '../radio/radio.directive';
import { SelectDirective } from '../select/select.directive';

@Component({
  standalone: true,
  imports: [CommonModule, IconToggleComponent],
  selector: '[v-input-container]',
  templateUrl: './input-container.component.html'
})
export class InputContainerComponent implements AfterContentInit {
  @ContentChild(SelectDirective) select: SelectDirective;
  @ContentChildren(ButtonDirective) buttons: QueryList<ButtonDirective>;
  @ContentChild(InputDirective) input: InputDirective;
  @ContentChild(InputMessageDirective) message: InputMessageDirective;
  @ContentChild(CheckboxDirective) checkbox: CheckboxDirective;
  @ContentChild(RadioDirective) radio: RadioDirective;
  @ContentChild(LabelDirective) label: LabelDirective;

  /**
   * Provides custom class&#40;es&#41; for custom styling.
   * @default .v-input-container
   * @default .v-surface if contains input or select directive.
   */
  @Input() class: string = '';
  @HostBinding('class')
  get hostClasses(): string {
    this.class = ['v-input-container', this.input || this.select ? 'v-surface' : ''].join(' ');
    return this.class;
  }

  /**
   * Removes the default toggle icon when true, allowing you to provide your own. <br>
   * After the closing <code>select</code> tag, provide your custom icon inside a <code>&lt;div class=&#8220;v-input-control&#8221;&gt;</code>.
   * @default false
   */
  @Input()
  get useCustomIcon(): boolean {
    return this._useCustomIcon;
  }
  set useCustomIcon(value: BooleanInput) {
    this._useCustomIcon = coerceBooleanProperty(value);
  }
  _useCustomIcon: boolean;

  constructor() {}

  ngAfterContentInit(): void {
    if (this.buttons.length > 0 && (this.input || this.select)) {
      const directive = this.input ? this.input : this.select;

      // disabled child buttons if input or select is disabled or readonly
      // must call out input readonly specifically since this is not a shared prop with select
      if (directive.disabled || (this.input && this.input.readonly)) {
        this.setButtonDisabledState(true);
      }

      // disabled or enable buttons as appropriate depending on input/select readonly and disabled state
      directive.communicateState.subscribe((state) => {
        if (state.disabled || state.readonly) {
          this.setButtonDisabledState(true);
        } else {
          this.setButtonDisabledState(false);
        }
      });
    }
    if (this.label) {
      if (this.checkbox?.id) {
        this.label.for = this.checkbox.id;
      } else if (this.radio?.id) {
        this.label.for = this.radio.id;
      }
    }
  }

  setButtonDisabledState(isDisabled: boolean) {
    this.buttons.forEach((button) => {
      button.disabled = isDisabled;
    });
  }
}
