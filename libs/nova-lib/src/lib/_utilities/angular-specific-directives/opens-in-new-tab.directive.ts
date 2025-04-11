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
import { Directive, ElementRef, HostBinding, Input } from '@angular/core';

@Directive({
  standalone: true,
  // tslint:disable-next-line:directive-selector
  selector: '[vOpensInNewTab], '
})
export class OpensInNewTabDirective {
  constructor(private el: ElementRef) {}

  /**
   * Allows user to set custom rel attribute.
   * @default 'noopener noreferrer'
   * @builtin true
   */
  @Input()
  get rel(): string {
    return this._rel;
  }
  set rel(value: string) {
    this._rel = value;
  }
  _rel: string;

  /**
   * Allows user to set custom target attribute.
   * @default '_blank'
   * @builtin true
   */
  @Input()
  get target(): string {
    return this._target;
  }
  set target(value: string) {
    this._target = value;
  }
  _target: string;

  /**
   * Allows user to set custom aria-label attribute.
   * @default '&lt;inner-text-of-link&gt; (opens in new tab)'
   */
  @Input('aria-label')
  get ariaLabel(): string {
    return this._ariaLabel;
  }
  set ariaLabel(value: string) {
    this._ariaLabel = value;
  }
  _ariaLabel: string;

  @HostBinding('attr.rel')
  get attrRel(): string | null {
    return this._rel ? this._rel : 'noopener noreferrer';
  }
  @HostBinding('attr.target')
  get attrTarget(): string | null {
    return this._target ? this._target : '_blank';
  }
  @HostBinding('attr.aria-label')
  get attrAriaLabel(): string | null {
    return this._ariaLabel ? this._ariaLabel : `${this.el.nativeElement.innerText.trim()} (opens in new tab)`;
  }
}
