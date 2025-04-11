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
import { Directive, ElementRef, EventEmitter, HostListener, OnDestroy, Output } from '@angular/core';

@Directive({
  selector: '[v-interactive]',
  standalone: true
})
export class BaseInteractiveDirective implements OnDestroy {
  listeners: any[] = [];

  constructor(public el: ElementRef) {}

  ngOnDestroy(): void {
    this.listeners = [];
  }

  /**
   * Emits event when host interactive element is blurred.
   */
  @Output() blurred = new EventEmitter<any>();

  @HostListener('blur', ['$event'])
  hostBlur(event: Event) {
    this.blurred.emit(event);
  }

  /**
   * Emits event when host interactive element is focused.
   */
  @Output() focused = new EventEmitter<any>();

  @HostListener('focus', ['$event'])
  hostFocus(event: Event) {
    this.focused.emit(event);
  }

  /**
   * Emits event when host interactive element is clicked.
   */
  @Output() clicked = new EventEmitter<any>();

  @HostListener('click', ['$event'])
  hostClick(event: Event) {
    this.clicked.emit(event);
  }
}
