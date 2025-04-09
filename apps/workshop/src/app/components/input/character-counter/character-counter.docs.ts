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
import { Component, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NovaLibModule } from '@visa/nova-angular';
import { VisaErrorTiny } from '@visa/nova-icons-angular';

/** #docs */
@Component({
  selector: 'nova-workshop-input-character-counter',
  templateUrl: './character-counter.docs.html',
  standalone: true,
  imports: [CommonModule, NovaLibModule, VisaErrorTiny]
})
export class CharacterCounterInputComponent {
  maxLength: number = 400;
  isInvalid: boolean = false;
  empty: boolean = true;
  overLimit: boolean | number = false;

  constructor(private renderer: Renderer2) {}

  handleInput(input: HTMLTextAreaElement) {
    this.empty = !input.value;
    this.overLimit = input.value.length > this.maxLength ? input.value.length - this.maxLength : false;
    this.isInvalid = this.empty || !!this.overLimit;
  }

  handleSubmit(input: HTMLTextAreaElement) {
    this.isInvalid = !input.value || input.value.length > this.maxLength;

    if (this.isInvalid) {
      this.renderer.selectRootElement('#character-counter-error').focus();
    }
  }

  handleReset(input: HTMLTextAreaElement) {
    this.isInvalid = false;
    input.value = '';
    this.empty = true;
    this.overLimit = false;
  }
}
