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
import { MessageType } from './message.constants';

@Directive({
  standalone: true,
  selector: '[v-message]'
})
export class MessageDirective {
  /**
   * Sets message type.
   * @default 'information' / MessageType.INFORMATION
   * @options "error" | MessageType.ERROR | <br> "information" | MessageType.INFORMATION | <br> "success" | MessageType.SUCCESS | <br> "warning" | MessageType.WARNING | <br> "close" | MessageType.CLOSE | <br> "subtle" | MessageType.SUBTLE
   */
  @Input()
  get messageType(): MessageType {
    return this._messageType;
  }
  set messageType(value: MessageType) {
    this._messageType = value;
  }
  _messageType: MessageType = MessageType.INFORMATION;

  /**
   * Provides custom class&#40;es&#41; for custom styling.
   * @default .v-message.v-message-&lt;messageType&gt;
   */
  @Input() class: string;
  @HostBinding('class')
  get hostClasses(): string {
    return [
      this.class,
      'v-message',
      this.messageType != MessageType.INFORMATION ? `v-message-${this.messageType}` : ''
    ].join(' ');
  }

  constructor() {}
}
