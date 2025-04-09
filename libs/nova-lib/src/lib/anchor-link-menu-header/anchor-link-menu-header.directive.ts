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
import { Directive, HostBinding, Input } from '@angular/core';
import { UUIDService } from '../_utilities/services/uuid.service';

@Directive({
  standalone: true,
  selector: '[v-anchor-link-menu-header]'
})
export class AnchorLinkMenuHeaderDirective {
  /**
   * Provides custom class&#40;es&#41; for custom styling.
   * @default .v-anchor-link-menu-header
   */
  @Input() class: string;
  @HostBinding('class')
  get hostClass(): string {
    return [this.class, 'v-anchor-link-menu-header'].join(' ');
  }

  /**
   * Sets custom id.
   * @default uuidService.getUUID('v-anchor-link-menu-')
   * @builtin true
   */
  @Input() id: string = this.uuidService.getUUID('v-anchor-link-menu-');
  @HostBinding('attr.id')
  get hostId(): string {
    return this.id;
  }

  constructor(private uuidService: UUIDService) {}
}
