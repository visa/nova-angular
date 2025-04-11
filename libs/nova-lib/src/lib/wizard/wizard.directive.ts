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
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { AfterContentInit, ContentChildren, Directive, HostBinding, Input, QueryList } from '@angular/core';
import { WizardStepDirective } from '../wizard-step/wizard-step.directive';

@Directive({
  standalone: true,
  selector: '[v-wizard]'
})
export class WizardDirective implements AfterContentInit {
  @ContentChildren(WizardStepDirective) steps: QueryList<WizardStepDirective>;
  _activeIndex: number = 0;
  /**
   * Provides custom class&#40;es&#41; for custom styling.
   * @default .v-wizard
   */
  @Input()
  get class(): string {
    return [
      this._class,
      'v-wizard',
      this.vertical ? 'v-wizard-vertical' : '',
      this.compact ? 'v-wizard-compact' : ''
    ].join(' ');
  }
  set class(value: string) {
    this._class = value;
  }
  _class: string = '';
  @HostBinding('class')
  get hostClass(): string {
    return this.class;
  }

  constructor() {}

  /**
   * Sets wizard to vertical orientation when true.
   * @default false
   */
  @Input()
  get vertical(): boolean {
    return this._vertical;
  }
  set vertical(value: BooleanInput) {
    this._vertical = coerceBooleanProperty(value);
  }
  _vertical: boolean = false;

  /**
   * Sets wizard to compact variant when true.
   * @default false
   */
  @Input()
  get compact(): boolean {
    return this._compact;
  }
  set compact(value: BooleanInput) {
    this._compact = coerceBooleanProperty(value);
  }
  _compact: boolean = false;

  /**
   * Sets the aria-live attribute for the wizard. <br />
   * This attribute is used to inform assistive technologies, like screen readers, about updates to wizard.
   * @default 'polite'
   */
  @Input('aria-live')
  get ariaLive(): string {
    return this._ariaLive;
  }
  set ariaLive(value: string) {
    this._ariaLive = value;
  }
  _ariaLive: string = 'polite';

  ngAfterContentInit(): void {
    this._activeIndex = this.steps.toArray().findIndex((step) => step.active);
    if (this._activeIndex > 0) {
      this.steps.toArray().forEach((step, index) => {
        if (index < this._activeIndex) {
          step.complete = true;
        }
      });
    }
  }

  @HostBinding('attr.aria-live')
  get hostAriaLive(): string {
    return this.ariaLive;
  }
}
