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
import { Component, HostBinding, Input, ViewChild, ElementRef } from '@angular/core';
import { NovaLibModule } from '@visa/nova-angular';
import { VisaCopyTiny } from '@visa/nova-icons-angular';
import { ClipboardService } from 'ngx-clipboard';
import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { MarkdownModule } from 'ngx-markdown';

@Component({
  selector: 'nova-workshop-code-snippet-single',
  templateUrl: './code-snippet-single.component.html',
  standalone: true,
  imports: [CommonModule, NovaLibModule, MarkdownModule, VisaCopyTiny]
})
export class CodeSnippetSingleComponent {
  @Input() copyData: string;
  @Input() analyticsCategory: string = 'Nova Angular';
  @Input() analyticsLabel: string;
  @Input() ariaLabelText: string = '';
  @Input() codeLanguage: string = 'html';

  /**
   * Add your own styling class.
   */
  @Input() class: string = '';
  @ViewChild('copyButton') copyButton: ElementRef;
  @HostBinding('class')
  get hostClasses(): string {
    return [this.class, 'w-code-snippet', 'v-mt-12'].join(' ');
  }

  onCopyToClipboard(event: Event) {
    this._clipboardService.copy(this.copyData);
    this.copyButton.nativeElement.focus();
    this.$gaService.event('copy_code', this.analyticsCategory, this.analyticsLabel);
  }

  constructor(private $gaService: GoogleAnalyticsService, private _clipboardService: ClipboardService) {}
}
