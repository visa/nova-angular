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
import { AfterViewInit, Component, ElementRef, Renderer2 } from '@angular/core';
import { NovaLibModule } from '@visa/nova-angular';
import { VisaMaximizeTiny } from '@visa/nova-icons-angular';
import { MarkdownModule } from 'ngx-markdown';

@Component({
  selector: 'nova-workshop-changelog',
  templateUrl: './changelog.docs.html',
  standalone: true,
  imports: [CommonModule, NovaLibModule, VisaMaximizeTiny, MarkdownModule],
  styles: `
    .w-changelog-markdown {
      word-break: break-word;
    }
  `
})
export class ChangeLogComponent implements AfterViewInit {
  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {}
  isLoading: boolean = false;
  ngOnInit(): void {
    this.isLoading = true;
  }
  ngAfterViewInit() {
    const markdown = this.el.nativeElement.getElementsByTagName('markdown')[0];
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          const h2Elements = markdown.getElementsByTagName('h2');
          const h3Elements = markdown.getElementsByTagName('h3');
          const liElements = markdown.getElementsByTagName('li');
          const ulElements = markdown.getElementsByTagName('ul');
          const aElements = markdown.getElementsByTagName('a');
          Array.from(h2Elements).forEach((h2) => {
            this.renderer.addClass(h2 as HTMLElement, 'v-typography-headline-2');
            this.renderer.setStyle(h2 as HTMLElement, 'marginTop', '12px');
          });
          Array.from(h3Elements).forEach((h3) => {
            this.renderer.addClass(h3 as HTMLElement, 'v-typography-subtitle-1');
            this.renderer.setStyle(h3 as HTMLElement, 'marginBlock', '12px');
          });
          Array.from(ulElements).forEach((ul, index) => {
            this.renderer.setStyle(ul as HTMLElement, 'display', 'flex');
            this.renderer.setStyle(ul as HTMLElement, 'flexDirection', 'column');
            this.renderer.setStyle(ul as HTMLElement, 'gap', '12px');
          });
          Array.from(liElements).forEach((li, index) => {
            this.renderer.addClass(li as HTMLElement, 'v-typography-body-1');
          });
          Array.from(aElements).forEach((a) => {
            this.renderer.setStyle(a as HTMLElement, 'color', 'var(--v-link-foreground)');
            this.renderer.setStyle((a as HTMLElement).parentElement, 'marginBlock', '8px');
            this.renderer.setAttribute(
              a as HTMLElement,
              'aria-label',
              (a as HTMLElement).textContent + '; opens in new tab'
            );
          });
        }
      });
      this.isLoading = false;
    });

    observer.observe(this.el.nativeElement, { childList: true, subtree: true });
  }
}
