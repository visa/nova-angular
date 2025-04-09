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
import { A11yModule } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { UUIDService } from '../_utilities/services/uuid.service';
import { FlexDirective } from '../flex/flex.directive';
import { MessageType } from '../message/message.constants';

@Component({
  standalone: true,
  imports: [CommonModule, A11yModule, FlexDirective],
  selector: '[v-dialog]',
  templateUrl: './dialog.component.html'
})
export class DialogComponent implements OnInit {
  dialogElement: HTMLDialogElement;

  /**
   * Sets custom id.
   * @default uuidService.getUUID('v-dialog-')
   * @builtin true
   */
  @Input() id: string;
  @HostBinding('attr.id')
  get hostId(): string {
    return this.id;
  }

  /**
   * @ignore
   */
  @Input()
  get messageType() {
    return this._messageType;
  }
  set messageType(value) {
    this._messageType = value;
  }
  _messageType: string;

  public isOpen = false;

  @HostBinding('attr.aria-modal')
  get ariaModal(): string {
    return 'true';
  }
  @HostBinding('attr.role')
  get ariaRole(): string {
    return 'dialog';
  }

  /**
   * Aria attribute pointing to id of labelling element.
   * @default '&lt;this.id&gt;-title'
   * @builtin true
   */
  @Input('aria-labelledby') label: string;
  @HostBinding('attr.aria-labelledby')
  get ariaLabelledBy(): string {
    return `${this.label}`;
  }

  /**
   * Aria attribute pointing to id of descriptive element.
   * @default '&lt;this.id&gt;-description'
   * @builtin true
   */
  @Input('aria-describedby') descriptionLabel: string;
  @HostBinding('attr.aria-describedby')
  get ariaDescribedBy(): string {
    return `${this.descriptionLabel}`;
  }

  /**
   * Provides custom class&#40;es&#41; for custom styling.
   * @default .v-dialog
   * @default .v-dialog-default
   */
  @Input() class: string;
  @HostBinding('class')
  get hostClass(): string {
    return [
      this.class,
      'v-dialog',
      this.messageType ? (this.messageType === MessageType.INFORMATION ? 'v-dialog-default' : '') : 'v-dialog-default'
    ].join(' ');
  }

  constructor(private uuidService: UUIDService) {}

  ngOnInit() {
    this.id = this.id ? this.id : this.uuidService.getUUID('v-dialog-');
    this.label = this.label ? this.label : `${this.id}-title`;
    this.descriptionLabel = this.descriptionLabel ? this.descriptionLabel : `${this.id}-description`;
  }
}
