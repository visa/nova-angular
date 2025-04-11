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
import { AfterContentInit, ContentChild, Directive, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { AppReadyService } from '../_utilities/services/app-stable-check.service';
import { ButtonStackedDirective } from '../button-stacked/button-stacked.directive';
import { ButtonColor, ButtonSize } from '../button/button.constants';
import { ButtonDirective } from '../button/button.directive';
import { FloatingUITriggerDirective } from '../floating-ui-trigger/floating-ui-trigger.directive';

@Directive({
  standalone: true,
  // tslint:disable-next-line:directive-selector
  selector: '[v-tab-item]'
})
export class TabItemDirective implements AfterContentInit {
  @ContentChild(ButtonDirective) button: ButtonDirective;
  @ContentChild(ButtonStackedDirective) stackedButton: ButtonStackedDirective;
  @ContentChild(FloatingUITriggerDirective) trigger: FloatingUITriggerDirective;
  _roleSetByUser: boolean = false; // prevents parent component from overriding if role if role is given directly by user
  _roleSetByTab: boolean = false; // prevents parent component from overriding if role is only set by TabItemDirective (allowing nav to override)
  _sizeSetByTab: boolean = false; // prevents parent component from overriding if size is only set by TabItemDirective (allowing nav to override)
  _nestedTab: boolean = false; // aria is different when nested tabs are present

  /**
   * Provides custom class&#40;es&#41; for custom styling.
   * @default .v-tab
   */
  @Input()
  get class(): string {
    return [this._class, 'v-tab'].join(' ');
  }
  set class(value: string) {
    this._class = value;
  }
  _class: string = '';
  @HostBinding('class')
  get hostClass(): string {
    const internalClass = [this.class, 'v-tab', this.sectionTitle ? 'v-tab-section-title' : ''].join(' ');
    return internalClass;
  }

  /**
   * Sets role of tab item. <br />
   * If no custom role is set, role may be set by a parent component (nav, tabs, etc.).
   * @builtin true
   */
  @Input()
  get role(): string | null {
    return this._role;
  }
  set role(value: string | null) {
    this._role = value;
    this._roleSetByUser = true;
  }
  _role: string | null;
  @HostBinding('attr.role')
  get hostRole(): string | null {
    return this.role;
  }

  /**
   * Marks tab as active when true. <br />
   * Not to be used with navigational tabs. To set a navigational tab as active, view [Angular's tutorial on identifying the active route](https://angular.dev/guide/routing/router-tutorial#identify-the-active-route).
   * @default false
   */
  @Input()
  get active(): boolean {
    return this._active;
  }
  set active(value: BooleanInput) {
    this._active = coerceBooleanProperty(value);
    if (this.active) this.tabActive.emit(true);
    if (this.button && !this.disclosureTab && !this.trigger && !this.button._isInNavOrNested) {
      if (this._nestedTab) {
        this.button.ariaCurrent = this._active ? 'page' : null;
      } else {
        this.button.ariaSelected = this._active;
      }
    }
  }
  _active: boolean = false;

  /**
   * Marks the tab as a disclosure item when true. <br />
   * This item cannot be active and should expand and collapse when pressed.
   * @default false
   */
  @Input()
  get disclosureTab(): boolean {
    return this._disclosureTab;
  }
  set disclosureTab(value: BooleanInput) {
    this._disclosureTab = coerceBooleanProperty(value);
  }
  _disclosureTab: boolean = false;

  /**
   * Marks the tab as a section title when true. <br />
   * This item titles a subset of tabs and is not interactive.
   * @default false
   */
  @Input()
  get sectionTitle(): boolean {
    return this._sectionTitle;
  }
  set sectionTitle(value: BooleanInput) {
    this._sectionTitle = coerceBooleanProperty(value);
  }
  _sectionTitle: boolean = false;

  /**
   * Emits true when this tab is set to active.
   */
  @Output() tabActive = new EventEmitter<boolean>();

  /**
   * Emits true when this tab's child button is clicked.
   */
  @Output() clicked = new EventEmitter<boolean>();

  constructor(private appReady: AppReadyService) {}

  ngAfterContentInit(): void {
    if (this.button) {
      if (!this._roleSetByUser) {
        this.role = this.trigger || this.disclosureTab ? null : 'none';
        this._roleSetByTab = true;
      }

      this.button.buttonColor = this.button._buttonColorSetByUser ? this.button.buttonColor : ButtonColor.TERTIARY;
      if (this.appReady.isBrowserAndDomAvailable()) {
        if (this.stackedButton && this.stackedButton.el.nativeElement === this.button.el.nativeElement) return;
        if (!this.button._buttonSizeSetByUser) {
          this.button.buttonSize = ButtonSize.LARGE;
          this._sizeSetByTab = true;
        }
      }

      if (this.button.toggleIconComponent) {
        this.button.toggleIconComponent.class = [this.button.toggleIconComponent.class, 'v-tab-suffix'].join(' ');
        if (this.button.toggleIconComponent.defaultTemplate)
          this.button.toggleIconComponent.defaultTemplate.class = [
            this.button.toggleIconComponent.defaultTemplate.class,
            'v-tab-suffix'
          ].join(' ');
        if (this.button.toggleIconComponent.rotatedTemplate)
          this.button.toggleIconComponent.rotatedTemplate.class = [
            this.button.toggleIconComponent.rotatedTemplate.class,
            'v-tab-suffix'
          ].join(' ');
      } else if (this.button.icons.length > 0) {
        this.button.icons.last.class = [this.button.icons.last.class, 'v-tab-suffix'].join(' ');
      }

      this.button.clicked.subscribe(() => {
        if (this.button._isInNavOrNested || this.disclosureTab || this.button.toggleIcon || this.trigger) return;
        this.clicked.emit(true);
      });
    }
  }
}
