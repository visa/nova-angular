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
import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { ButtonDirective, InputDirective, NovaLibModule } from '@visa/nova-angular';
import { VisaClearAltTiny } from '@visa/nova-icons-angular';

/** #docs */
@Component({
  selector: 'nova-workshop-input-with-clear-text-button',
  templateUrl: './with-clear-text-button.docs.html',
  standalone: true,
  imports: [CommonModule, NovaLibModule, VisaClearAltTiny]
})
export class WithClearTextButtonInputComponent {
  @ViewChild(InputDirective) input: InputDirective;
  @ViewChild(ButtonDirective) button: ButtonDirective;
  inFocus: boolean = false;

  clearAndFocus() {
    this.input.value = '';
    this.input.el.nativeElement.focus();
  }

  focus() {
    this.inFocus = true;
  }

  blur(event: FocusEvent) {
    if (event.relatedTarget !== this.button.el.nativeElement && event.relatedTarget !== this.input.el.nativeElement) {
      this.inFocus = false;
    }
  }
}
