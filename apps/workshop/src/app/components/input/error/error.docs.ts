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
import { CommonModule } from '@angular/common';
import { Component, Renderer2, ViewChild } from '@angular/core';
import { InputDirective, NovaLibModule } from '@visa/nova-angular';
import { VisaErrorTiny } from '@visa/nova-icons-angular';
import { MarkdownModule } from 'ngx-markdown';

/** #docs */
@Component({
  selector: 'nova-workshop-input-error',
  templateUrl: './error.docs.html',
  standalone: true,
  imports: [CommonModule, MarkdownModule, NovaLibModule, VisaErrorTiny]
})
export class ErrorInputComponent {
  @ViewChild(InputDirective) input: InputDirective;
  isInvalid = false;

  constructor(private renderer: Renderer2) {}

  handleSubmit(input: HTMLInputElement) {
    this.isInvalid = !input.value;

    if (this.isInvalid) {
      this.renderer.selectRootElement('#default-error').focus();
    }
  }

  handleReset() {
    this.isInvalid = false;
    this.input.value = '';
  }
}
