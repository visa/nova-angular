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
import { Component, HostBinding, Input } from '@angular/core';
import { NovaLibModule } from '@visa/nova-angular';
import { VisaChevronDownTiny, VisaChevronRightTiny, VisaCodeForkAltTiny, VisaCopyTiny } from '@visa/nova-icons-angular';
import { CodeSnippetSingleComponent } from '../code-snippet-single/code-snippet-single.component';

@Component({
  selector: 'nova-workshop-code-snippet',
  templateUrl: './code-snippet.component.html',
  standalone: true,
  imports: [
    CommonModule,
    NovaLibModule,
    CodeSnippetSingleComponent,
    VisaCodeForkAltTiny,
    VisaCopyTiny,
    VisaChevronRightTiny,
    VisaChevronDownTiny
  ]
})
export class CodeSnippetComponent {
  @Input() templateData: string;
  @Input() sourceCode: string;
  @Input() exampleData: string;
  @Input() selector = '';
  @Input() ariaLabel: string = '';
  @Input() exampleTitle: string = '';
  example: string;
  NOVA_ANGULAR = 'nova-workshop-';

  /**
   * Add your own styling class.
   */
  @Input() class: string = '';
  @HostBinding('class')
  get hostClasses(): string {
    return [this.class, 'w-code-snippet', 'v-mt-12'].join(' ');
  }

  ngOnInit() {
    this.example = this.selector.split(this.NOVA_ANGULAR)[1];
  }
}
