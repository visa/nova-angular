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
import { AfterContentInit, ContentChild, Directive, HostBinding, HostListener, Input } from '@angular/core';
import { ContentCardTitleLinkDirective } from '../content-card-title-link/content-card-title-link.directive';

@Directive({
  standalone: true,
  selector: '[v-content-card]'
})
export class ContentCardDirective implements AfterContentInit {
  @ContentChild(ContentCardTitleLinkDirective) titleLink: ContentCardTitleLinkDirective;
  /**
   * Displays indicator line at the bottom of the card when true.
   * @default false
   */
  @Input()
  get indicator(): boolean {
    return this._indicator;
  }
  set indicator(value: BooleanInput) {
    this._indicator = coerceBooleanProperty(value);
  }
  _indicator: boolean;

  /**
   * Transforms card into a clickable card when true.
   * @default false
   */
  @Input()
  get clickable(): boolean {
    return this._clickable;
  }
  set clickable(value: BooleanInput) {
    this._clickable = coerceBooleanProperty(value);
  }
  _clickable: boolean;

  /**
   * Sets component as disabled when true.
   * @default false
   */
  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value: BooleanInput) {
    this._disabled = coerceBooleanProperty(value);
  }
  _disabled: boolean = false;

  @HostBinding('attr.aria-disabled')
  get hostDisabled() {
    return this.disabled ? true : false;
  }

  /**
   * Provides custom class&#40;es&#41; for custom styling.
   * @default .v-content-card
   */
  @Input() class: string;
  @HostBinding('class')
  get hostClass(): string {
    return ['v-content-card', this.indicator ? 'v-content-card-border-block-end' : '', this.class].join(' ');
  }

  @HostListener('keydown.space', ['$event'])
  onSpaceKeyDown(event: KeyboardEvent) {
    if (this.clickable) {
      //to prevent unnecessary scrolling
      event.preventDefault();
    }
  }

  @HostListener('click')
  handleClick() {
    if (this.clickable) {
      const mainLink = this.titleLink.el.nativeElement;
      // handle if a mainlink is not found
      if (mainLink) {
        mainLink.click();
      }
    }
  }
  constructor() {}

  ngAfterContentInit(): void {
    if (this.titleLink) {
      this.disabled = this.disabled
        ? this.disabled
        : this.titleLink._disabled
          ? (this.disabled = true)
          : (this.disabled = false);
    }
  }
}
