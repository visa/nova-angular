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
import { AfterContentInit, ContentChild, Directive, ElementRef, HostBinding, Input } from '@angular/core';
import { UUIDService } from '../_utilities/services/uuid.service';
import { TabListDirective } from '../tab-list/tab-list.directive';

@Directive({
  standalone: true,
  // tslint:disable-next-line:directive-selector
  selector: '[v-panel-content]'
})
export class PanelContentDirective implements AfterContentInit {
  @ContentChild(TabListDirective) tabs: TabListDirective;

  /**
   * Provides custom class&#40;es&#41; for custom styling.
   * @default .v-panel-content.v-surface
   */
  @Input()
  get class(): string {
    return [this._class, 'v-panel-content', 'v-surface'].join(' ');
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
   * @default uuidService.getUUID('v-panel-content-')
   * @builtin true
   */
  @Input()
  id: string = this.uuidService.getUUID('v-panel-content-');
  @HostBinding('attr.id')
  get hostId(): string {
    return this.id;
  }

  constructor(
    public el: ElementRef,
    private uuidService: UUIDService
  ) {}

  ngAfterContentInit(): void {
    if (this.tabs) {
      this.tabs.class = [this.tabs.class, 'v-panel-tabs'].join(' ');
    }
  }
}
