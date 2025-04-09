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
import {
  Directive,
  Input,
  HostBinding,
  Optional,
  AfterContentInit,
  ContentChild,
  ContentChildren,
  QueryList,
  ChangeDetectorRef
} from '@angular/core';
import { AccordionDetailsDirective } from '../accordion-item/accordion-item.directive';
import { ButtonDirective } from '../button/button.directive';

@Directive({
  standalone: true,
  selector: '[v-wizard-step] '
})
export class WizardStepDirective implements AfterContentInit {
  @ContentChildren(ButtonDirective) buttons: QueryList<ButtonDirective>;
  /**
   * Provides custom class&#40;es&#41; for custom styling.
   * @default .v-wizard-step
   */
  @Input()
  get class(): string {
    return [this._class, 'v-wizard-step'].join(' ');
  }
  set class(value: string) {
    this._class = value;
  }
  _class: string = '';
  @HostBinding('class')
  get hostClass(): string {
    return this.class;
  }

  constructor(
    @Optional() private accordion: AccordionDetailsDirective,
    private cdRef: ChangeDetectorRef
  ) {}

  /**
   * Marks the step as current step when true.
   * @default false
   */
  @Input()
  get active(): boolean {
    return this._active;
  }
  set active(value: BooleanInput) {
    this._active = coerceBooleanProperty(value);
  }
  _active: boolean = false;
  @HostBinding('attr.aria-current')
  get hostAriaCurrent(): string | void {
    if (this.active) {
      return 'step';
    }
  }

  /**
   * Marks the step as completed when true.
   * @default false
   */
  @Input()
  get complete(): boolean {
    return this._complete;
  }
  set complete(value: BooleanInput) {
    this._complete = coerceBooleanProperty(value);
  }
  _complete: boolean = false;

  /**
   * Marks the step as invalid when true.
   * @default false
   */
  @Input()
  get invalid(): boolean {
    return this._invalid;
  }
  set invalid(value: BooleanInput) {
    this._invalid = coerceBooleanProperty(value);
  }
  _invalid: boolean = false;

  ngAfterContentInit(): void {
    if (this.accordion) {
      this.active = this.accordion.expanded;

      this.accordion.toggled.subscribe((expanded) => {
        this.active = expanded;
      });
    }

    if (this.buttons) {
      this.buttons.forEach((button) => (button.class = [button.class, 'v-wizard-step'].join(' ')));

      this.buttons.changes.subscribe(() => {
        this.buttons.forEach((button) => (button.class = [button.class, 'v-wizard-step'].join(' ')));
        this.cdRef.detectChanges();
      });
    }
  }
}
