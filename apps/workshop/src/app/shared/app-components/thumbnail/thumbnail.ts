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
//src: https://stackoverflow.com/questions/53066823/how-do-i-import-svg-from-file-to-a-component-in-angular-5
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, HostBinding, Input, OnChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NovaLibModule } from '@visa/nova-angular';
import { HtmlSanitizerService } from '../safe-html/safe-html.service';
import { SafeHtmlDirective } from '../safe-html/safe-html.directive';

@Component({
  selector: 'nova-workshop-thumbnail',
  template: `<span [safeHtml]="svgIcon"></span>`,
  standalone: true,
  imports: [CommonModule, NovaLibModule, SafeHtmlDirective]
})
export class ThumbnailComponent implements OnChanges {
  @Input()
  public name?: string;

  @Input() componentsGraphic: boolean;

  public svgIcon: any;

  constructor(
    private httpClient: HttpClient,
    private htmlSanitizerService: HtmlSanitizerService
  ) {}

  public ngOnChanges(): void {
    if (!this.name && !this.componentsGraphic) {
      this.svgIcon = '';
      return;
    }
    const assetUrl = this.componentsGraphic
      ? 'assets/imgs/components-graphic.svg'
      : `assets/thumbnails/${this.name}-graphic.svg`;
    this.httpClient.get(assetUrl, { responseType: 'text' }).subscribe((value) => {
      this.svgIcon = this.htmlSanitizerService.sanitizeHtml(value);
    });
  }
}
