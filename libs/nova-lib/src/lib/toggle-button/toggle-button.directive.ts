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
import { Directive, ElementRef, HostBinding, Input } from '@angular/core';
import { BaseInteractiveDirective } from '../_utilities/angular-specific-directives/base-interactive.directive';
import { UUIDService } from '../_utilities/services/uuid.service';

@Directive({
  standalone: true,
  selector: 'button[v-toggle]'
})
export class ToggleButtonDirective extends BaseInteractiveDirective {
  /**
   * Sets the `aria-pressed` attribute to indicate the pressed state of the button.
   * @default false
   */
  @Input()
  get active(): boolean {
    return this._active;
  }
  set active(value: BooleanInput) {
    this._active = coerceBooleanProperty(value);
  }
  private _active: boolean = false;

  @HostBinding('attr.aria-pressed')
  get ariaPressed(): string {
    return this.active.toString();
  }

  /**
   * Disables button when true.
   * @default false
   */
  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value: BooleanInput) {
    this._disabled = coerceBooleanProperty(value);
  }
  _disabled: boolean = false;
  @HostBinding('attr.aria-disabled')
  get hostAriaDisabled(): string | void {
    if (this.disabled) return 'true';
  }
  @HostBinding('disabled')
  @HostBinding('attr.disabled')
  get hostDisabled(): string | void {
    if (this.disabled) return 'disabled';
  }

  /**
   * Sets the value of the button to be used in the toggle container.
   * @default this.uuidService.getUUID('v-toggle-button-')
   */
  @Input()
  get value(): string | number {
    return this._value;
  }
  set value(val: string | number) {
    this._value = val;
  }
  _value: string | number = this.uuidService.getUUID('v-toggle-button-');

  constructor(
    private uuidService: UUIDService,
    el: ElementRef
  ) {
    super(el);
  }
}
