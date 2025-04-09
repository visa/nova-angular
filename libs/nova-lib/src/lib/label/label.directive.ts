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
import { Directive, Input, HostBinding, ElementRef, HostListener } from '@angular/core';
import { UUIDService } from '../_utilities/services/uuid.service';

@Directive({
  standalone: true,
  selector: '[v-label]'
})
export class LabelDirective {
  /**
   * Attribute set to the id of the element it's labeling. <br />
   * This property is set by default for radio and checkbox components when used within <code>v-input-container</code> as directed.
   */
  @Input()
  get for(): string {
    return this._for;
  }
  set for(value: string) {
    this._for = value;
  }
  private _for: string;

  @HostBinding('attr.for')
  get labelFor(): string {
    return this._for;
  }

  /**
   * Sets custom id.
   * @default uuidService.getUUID('v-label-')
   * @builtin true
   */
  @Input() id: string = this.uuidService.getUUID('v-label-');
  @HostBinding('attr.id')
  get hostId(): string {
    return this.id;
  }

  /**
   * Provides custom class&#40;es&#41; for custom styling.
   * @default .v-label - when <code>progressLabel</code> is false and not used within a Circular Progress component.
   * @default .v-progress-label when <code>progressLabel</code> is true or when used within a Circular Progress component.
   */
  @Input() class: string = '';
  @HostBinding('class')
  get hostClasses(): string {
    this.class = [this.progressLabel ? 'v-progress-label' : 'v-label'].join(' ');
    return this.class;
  }

  /**
   * Swaps <code>v-label</code> class for <code>v-progress-label</code> when true. <br />
   * Intended for use when label is describing a progress component. <br />
   * Automatically set to true when used within a Circular Progress component.
   * @default false
   */
  @Input()
  get progressLabel(): boolean {
    return this._progressLabel;
  }
  set progressLabel(value: BooleanInput) {
    this._progressLabel = coerceBooleanProperty(value);
  }
  private _progressLabel: boolean = false;

  constructor(
    public el: ElementRef,
    private uuidService: UUIDService
  ) {} // needed for vdsChip styling

  @HostListener('click', ['$event'])
  onClick(event: Event) {
    // stops click event for firing for label **and** input.
    // event will still fire for input
    event.stopPropagation();
  }
}
