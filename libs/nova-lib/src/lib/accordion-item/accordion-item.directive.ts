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
import {
  AfterContentInit,
  ContentChild,
  Directive,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output
} from '@angular/core';
import { AccordionHeadingDirective } from '../accordion-heading/accordion-heading.directive';
import { AccordionPanelDirective } from '../accordion-panel/accordion-panel.directive';
import { IconToggleComponent } from '../icon-toggle/icon-toggle.component';
import { IconToggleDirective } from '../icon-toggle/icon-toggle.directive';

@Directive({
  standalone: true,
  // tslint:disable-next-line:directive-selector
  selector: 'details[v-accordion-item]'
})
export class AccordionDetailsDirective implements AfterContentInit {
  @ContentChild(AccordionPanelDirective) panel: AccordionPanelDirective;
  @ContentChild(AccordionHeadingDirective) heading: AccordionHeadingDirective;
  @ContentChild(IconToggleDirective) toggleIcon: IconToggleDirective;
  @ContentChild(IconToggleComponent) toggleIconComponent: IconToggleComponent;

  /**
   * Provides custom class&#40;es&#41; for custom styling.
   * @default .v-accordion
   */
  @Input()
  get class(): string {
    return [this._class, 'v-accordion'].join(' ');
  }
  set class(value: string) {
    this._class = value;
  }
  _class: string = '';
  @HostBinding('class')
  get hostClass(): string {
    return this.class;
  }

  /** @ignore native details/summary prop */
  @Input('open')
  get expanded(): boolean | null {
    return this._expanded;
  }
  set expanded(value: BooleanInput | null) {
    this._expanded = coerceBooleanProperty(value);
    if (this.expanded !== null) this.toggled.emit(this.expanded);
  }
  _expanded: boolean | null = false;
  @HostBinding('open')
  get hostOpen(): boolean | void {
    if (this.expanded !== null) return this.expanded;
  }

  /**
   * Sets custom id.
   * @builtin true
   */
  @Input()
  id: string;
  @HostBinding('attr.id')
  get hostId(): string {
    return this.id;
  }

  /** @ignore */
  @Input()
  get name(): string {
    return this._name;
  }
  set name(value: string) {
    this._name = value;
  }
  _name: string = '';
  @HostBinding('attr.name')
  get hostName(): string {
    return this.name;
  }

  @HostBinding('attr.tabindex')
  get hostTabIndex(): string | void {
    if (this.heading?.hostButton?.disabled) {
      return '-1';
    }
  }

  constructor() {}

  /**
   * Emits expanded state of item when toggled.
   */
  @Output() toggled = new EventEmitter<boolean>();

  @HostListener('toggle', ['$event'])
  toggle(event: { newState: string }) {
    // should be of type ToggleEvent but Angular 16 doesn't recognize ToggleEvent
    this.expanded = event.newState === 'open';
    if (this.toggleIconComponent) this.toggleIconComponent.rotated = this.expanded;
    if (this.toggleIcon)
      this.toggleIcon.icon.icon = this.expanded ? this.toggleIcon.expandedIcon : this.toggleIcon.collapsedIcon;
    this.toggled.emit(this.expanded);
  }

  ngAfterContentInit(): void {
    if (this.panel) this.panel._native = true;

    if (this.heading) {
      if (this.heading.expanded && !this.expanded) this.expanded = true;
      this.heading.toggled.subscribe(() => {
        this.expanded = this.heading.expanded;
      });
    }

    if (this.toggleIcon) {
      this.toggleIcon.class = [this.toggleIcon.class, 'v-accordion-toggle-icon'].join(' ');
      if (!this.toggleIcon._iconSet) {
        if (!this.toggleIcon._expandedSet) this.toggleIcon.expandedIcon = 'chevron-down';
        if (!this.toggleIcon._collapsedSet) this.toggleIcon.collapsedIcon = 'chevron-right';
      }
    } else if (this.toggleIconComponent) {
      this.toggleIconComponent._accordionToggle = true;
      if (this.toggleIconComponent.rotatedTemplate) {
        this.toggleIconComponent.rotatedTemplate.class = 'v-accordion-toggle-icon';
      }
      if (this.toggleIconComponent.defaultTemplate) {
        this.toggleIconComponent.defaultTemplate.class = 'v-accordion-toggle-icon';
      }
    }
  }
}
