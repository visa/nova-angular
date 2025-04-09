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
import { Directive, ElementRef, Input, Renderer2, OnChanges, SimpleChanges } from '@angular/core';
import { UrlSanitizerService } from './safe-url.service';

@Directive({
  selector: '[safeUrl]',
  standalone: true
})
export class SafeUrlDirective implements OnChanges {
  @Input() safeUrl: string;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private urlSanitizerService: UrlSanitizerService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['safeUrl'] && this.safeUrl) {
      const sanitizedUrl = this.urlSanitizerService.sanitizeUrl(this.safeUrl);
      this.renderer.setAttribute(this.el.nativeElement, 'src', sanitizedUrl);
    }
  }
}

// END GENAI
