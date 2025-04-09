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
import { BooleanInput, coerceBooleanProperty, coerceNumberProperty, NumberInput } from '@angular/cdk/coercion';
import { CommonModule } from '@angular/common';
import {
  AfterContentInit,
  AfterViewInit,
  Component,
  computed,
  ContentChild,
  ElementRef,
  HostBinding,
  Input,
  signal,
  ViewChild
} from '@angular/core';
import { AppReadyService } from '../_utilities/services/app-stable-check.service';
import { LabelDirective } from '../label/label.directive';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: '[v-progress-circular], [v-circular-progress]',
  templateUrl: './circular-progress.component.html'
})
export class CircularProgressComponent implements AfterContentInit, AfterViewInit {
  _percentageSignal = signal(this.percentage);
  _initialSize = signal(0); // circumference
  _dashOffset = computed(() => {
    if (this._initialSize() > 0) {
      return this._initialSize() - this._initialSize() * (this._percentageSignal() * 0.01);
    } else return 0;
  });

  @ViewChild('progressBar', { static: false }) progressBar: ElementRef;
  @ContentChild(LabelDirective) label: LabelDirective;

  /**
   * Provides custom class&#40;es&#41; for custom styling.
   * @default .v-progress.v-progress-circular
   */
  @Input() class: string = '';
  @HostBinding('class')
  get hostClasses(): string {
    return [
      this.class,
      'v-progress',
      'v-progress-circular',
      this.determinate ? '' : 'v-progress-indeterminate',
      this.small ? 'v-progress-circular-small' : '',
      this.determinate && this.percentage === 100 ? 'v-progress-complete' : '',
      this.invalid ? 'v-progress-error' : ''
    ].join(' ');
  }

  /**
   * Sets progress to determinate when true.
   * @default false
   */
  @Input()
  get determinate(): boolean {
    return this._determinate;
  }
  set determinate(value: BooleanInput) {
    this._determinate = coerceBooleanProperty(value);
  }
  _determinate: boolean = false;

  /**
   * Sets progress to invalid when true.
   * @default false
   */
  @Input()
  get invalid(): boolean {
    return this._invalid;
  }
  set invalid(value: BooleanInput) {
    this._invalid = coerceBooleanProperty(value);
  }
  _invalid: boolean = false;

  /**
   * Sets custom role.
   * @default 'progressbar' when determinate
   * @default null when indeterminate
   * @builtin true
   */
  @Input() role: string | void | null = null;
  @HostBinding('attr.role')
  get hostRole(): string | void | null {
    // If role is set, use it
    if (this.role) {
      return this.role;
    }
    if (this._determinate) {
      return 'progressbar';
    }
    return null;
  }

  /**
   * Sets the percentage for a <code>determinate</code> circular progress.
   * @default 0
   */
  @Input()
  get percentage(): number {
    return this._percentage;
  }
  set percentage(value: NumberInput) {
    this._percentage = coerceNumberProperty(value);
    this._percentageSignal.set(coerceNumberProperty(value));
  }
  _percentage: number = 0;

  /**
   * Sets progress to small variant when true.
   * @default false
   */
  @Input()
  get small(): boolean {
    return this._small;
  }
  set small(value: BooleanInput) {
    this._small = coerceBooleanProperty(value);
  }
  _small: boolean = false;

  /**
   * Aria attribute pointing to id of labelling element.
   * @default &lt;child-label-id&gt;
   * @builtin true
   */
  @Input('aria-labelledby') ariaLabelledby: string;
  @HostBinding('attr.aria-labelledby')
  get hostAriaLabelledby(): string {
    return this.ariaLabelledby;
  }

  constructor(private appReadyService: AppReadyService) {}

  ngAfterContentInit(): void {
    if (this.label) {
      this.label.progressLabel = true;

      if (!this.ariaLabelledby && this.label.id) {
        this.ariaLabelledby = this.label.id;
      }
    }
  }

  ngAfterViewInit(): void {
    if (this.progressBar) {
      let radius: number; // default in case isPlatformBrowser fails
      // best guess of radius if radius is not available
      // by default, small size is 24
      // by default, regular size is 48
      const defaultSize = this.small ? 48 : 72;
      setTimeout(() => {
        // .getPropertyValue('r') not working outside of setTimeout
        if (this.appReadyService.checkIsPlatformBrowser()) {
          radius = parseInt(window.getComputedStyle(this.progressBar.nativeElement).getPropertyValue('r'));
        }
        // by default, radius is half of the default size minus 4 - the stroke width
        radius = isNaN(radius) ? (defaultSize - 4) / 2 : radius;
        this._initialSize.set(2 * Math.PI * radius);
      }, 0);
    }
  }
}
