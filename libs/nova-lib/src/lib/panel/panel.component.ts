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
import { AfterContentInit, Component, ContentChild, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { UUIDService } from '../_utilities/services/uuid.service';
import { PanelContentDirective } from '../panel-content/panel-content.directive';
import { PanelToggleDirective } from '../panel-toggle-button/panel-toggle-button.directive';

@Component({
  standalone: true,
  imports: [CommonModule],
  // tslint:disable-next-line:component-selector
  selector: '[v-panel]',
  templateUrl: './panel.component.html'
})
export class PanelComponent implements AfterContentInit {
  @ContentChild(PanelContentDirective) panelContent: PanelContentDirective;
  @ContentChild(PanelToggleDirective) toggleButton: PanelToggleDirective;

  /**
   * Provides custom class&#40;es&#41; for custom styling.
   * @default .v-panel
   */
  @Input()
  get class(): string {
    return [
      this._class,
      'v-panel',
      this.responsive ? 'v-panel-responsive' : '',
      this.expandable || this.toggleButton ? 'v-panel-expandable' : '',
      this.skrim ? 'v-panel-skrim' : ''
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

  /**
   * Sets custom id.
   * @default uuidService.getUUID('v-panel-')
   * @builtin true
   */
  @Input()
  id: string = this.uuidService.getUUID('v-panel-');
  @HostBinding('attr.id')
  get hostId(): string {
    return this.id;
  }

  /**
   * Sets custom role.
   * @default 'dialog' if panel is not responsive.
   * @builtin true
   */
  @Input()
  role: string | void;
  @HostBinding('attr.role')
  get hostRole(): string | void {
    if (this.role) {
      return this.role;
    }
  }

  /**
   * Adds skrim (shadow overlay) to modal variant (responsive="false") when true.
   * @default false
   */
  @Input()
  get skrim(): boolean {
    return this._skrim;
  }
  set skrim(value: BooleanInput) {
    this._skrim = coerceBooleanProperty(value);
  }
  _skrim: boolean = false;

  /**
   * Sets panel to responsive variant when true and places panel on same layer as content around it.
   * @default false
   */
  @Input()
  get responsive(): boolean {
    return this._responsive;
  }
  set responsive(value: BooleanInput) {
    this._responsive = coerceBooleanProperty(value);
  }
  _responsive: boolean = false;

  /**
   * Sets panel to expandable variant when true.
   * @default false
   * @default true if panel contains a <code>PanelToggleDirective</code>.
   */
  @Input()
  get expandable(): boolean {
    return this._expandable;
  }
  set expandable(value: BooleanInput) {
    this._expandable = coerceBooleanProperty(value);
  }
  _expandable: boolean = false;

  /**
   * Expands panel by default when true. <br />
   * To be used when <code>expandable</code> is true.
   * @default false
   */
  @Input()
  get expanded(): boolean {
    return this._expanded;
  }
  set expanded(value: BooleanInput) {
    this._expanded = coerceBooleanProperty(value);
    this.handleToggle();
    this.panelToggled.emit(this.expanded);
  }
  _expanded: boolean = false;

  /**
   * Emits expanded state when panel is toggled (collapsed and expanded).
   */
  @Output() panelToggled = new EventEmitter<boolean>();

  @HostBinding('attr.aria-modal')
  get hostAriaModal(): string | void {
    if (!this.responsive) {
      return 'true';
    }
  }

  constructor(private uuidService: UUIDService) {}

  ngAfterContentInit(): void {
    if (!this.responsive && !this.role) {
      this.role = 'dialog';
    }
    if (this.toggleButton && this.toggleButton.button) {
      this.toggleButton.button.ariaExpanded = this.expanded;
      this.toggleButton._expanded = this.expanded;

      this.toggleButton.button.clicked.subscribe(() => {
        this.expanded = !this.expanded;
      });

      if (this.panelContent) {
        this.toggleButton.button.ariaControls = this.panelContent.id;
      }
    }
  }

  handleToggle() {
    if (this.toggleButton && this.toggleButton.button) {
      this.toggleButton.button.ariaExpanded = this.expanded;
      this.toggleButton._expanded = this.expanded;
    }
  }
}
