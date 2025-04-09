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
import { AfterContentInit, ContentChild, Directive, EventEmitter, Input, Output } from '@angular/core';
import { ButtonDirective } from '../button/button.directive';

/**
 * Directive for creating a disclosure tab item. This directive is used in conjunction with the `v-tab-item` directive. <br />
 * It is used to create a tab item that can be expanded or collapsed. This item cannot be set as active.
 */
@Directive({
  standalone: true,
  // tslint:disable-next-line:directive-selector
  selector: '[v-tab-item][disclosureTab]'
})
export class TabItemDisclosureDirective implements AfterContentInit {
  @ContentChild(ButtonDirective) button: ButtonDirective;

  /**
   * Sets expanded state of disclosure tab item.
   * @default false
   */
  @Input()
  get expanded(): boolean {
    return this._expanded;
  }
  set expanded(value: BooleanInput) {
    this._expanded = coerceBooleanProperty(value);
  }
  _expanded: boolean = false;

  /**
   * Emits expanded state when the child button is clicked.
   */
  @Output() disclosureTabToggled = new EventEmitter<boolean>();

  constructor() {}

  ngAfterContentInit(): void {
    if (this.button) {
      this.button.ariaExpanded = this.expanded;

      if (this.button.toggleIconComponent) {
        if (this.button.toggleIconComponent.rotatedTemplate) this.button.toggleIconComponent.rotated = this.expanded;
      }

      this.button.clicked.subscribe((event) => {
        this.expanded = !this.expanded;
        this.button.ariaExpanded = this.expanded;
        if (this.button.toggleIconComponent) this.button.toggleIconComponent.rotated = this.expanded;
        this.disclosureTabToggled.emit(this.expanded);
      });
    }
  }
}
