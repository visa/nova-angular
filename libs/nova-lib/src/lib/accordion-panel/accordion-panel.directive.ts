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
import { Directive, HostBinding, Input, signal } from '@angular/core';

@Directive({
  standalone: true,
  // tslint:disable-next-line:directive-selector
  selector: '[v-accordion-panel]'
})
export class AccordionPanelDirective {
  _index: number;
  _expanded: boolean = false;
  _subtle = signal(false);

  /**
   * Provides custom class&#40;es&#41; for custom styling.
   * @default .v-accordion-panel
   */
  @Input()
  get class(): string {
    return [this._class, 'v-accordion-panel'].join(' ');
  }
  set class(value: string) {
    this._class = value;
  }
  _class: string = '';
  @HostBinding('class')
  get hostClass(): string {
    return this.class;
  }

  /**
   * Sets custom id.
   * @default this.uuidService.getUUID('v-accordion-panel-')
   * @builtin true
   */
  @Input()
  id: string;
  @HostBinding('attr.id')
  get hostId(): string {
    return this.id;
  }

  /** @ignore @TODO deprecate? */
  @Input()
  get native(): boolean {
    return this._native;
  }
  set native(value: boolean) {
    this._native = value;
  }
  _native: boolean = false;
  @HostBinding('attr.aria-hidden')
  get hostAriaHidden(): boolean | null {
    return this._native ? null : !this._expanded;
  }

  @HostBinding('style.--v-accordion-panel-background-color')
  get hostBackground(): string | void {
    if (this._subtle()) {
      return 'transparent';
    }
  }

  @HostBinding('style.--v-accordion-panel-border-size')
  get hostGap(): string | void {
    if (this._subtle()) {
      return '0px';
    }
  }

  @HostBinding('style.--v-accordion-panel-padding-inline')
  get hostForeground(): string | void {
    if (this._subtle()) {
      return '32px';
    }
  }
}
