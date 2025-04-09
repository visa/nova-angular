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
// START GENAI
import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';
import { HtmlSanitizerService } from './safe-html.service';

@Directive({
  selector: '[safeHtml]',
  standalone: true
})
export class SafeHtmlDirective implements OnChanges {
  @Input() safeHtml: string | boolean | null = null;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private htmlSanitizerService: HtmlSanitizerService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    // allow boolean value `false` to be passed if needed
    if (changes['safeHtml'] && this.safeHtml !== null) {
      const sanitizedHtml = this.htmlSanitizerService.sanitizeHtml(this.safeHtml.toString());
      this.renderer.setProperty(this.el.nativeElement, 'innerHTML', sanitizedHtml);
    }
  }
}

// END GENAI
