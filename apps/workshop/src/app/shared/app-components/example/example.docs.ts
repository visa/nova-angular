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
import { Component, HostBinding, Input, OnInit, effect, output } from '@angular/core';
import { WorkshopService } from '../../../shared/services/workshop.service';
import { BooleanInput, NumberInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { VisaMaximizeTiny } from '@visa/nova-icons-angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NovaLibModule } from '@visa/nova-angular';
import { CodeSnippetComponent } from '../code-snippet/code-snippet.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MockDataKeys } from '../../../shared/services/mock-data.service';
import { SafeUrlDirective } from '../safe-url/safe-url.directive';
@Component({
  selector: 'nova-workshop-example',
  templateUrl: './example.docs.html',
  standalone: true,
  imports: [CommonModule, NovaLibModule, VisaMaximizeTiny, RouterModule, CodeSnippetComponent, SafeUrlDirective],
  styles: [
    `
      .example-title {
        color: var(--palette-default-text);
      }
    `
  ]
})
export class ExampleComponent implements OnInit {
  @Input() exampleTitle: string;

  @Input()
  get headingLevel(): number {
    return this._headingLevel;
  }
  set headingLevel(value: NumberInput) {
    this._headingLevel = Number(value);
  }
  _headingLevel: number = 3;

  @Input() selector = '';
  @Input() codeSnippetsOnly = false;
  loading = true;
  exampleTitleID: string;
  iframeUrl: string;

  @Input()
  get iframe(): boolean {
    return this._iframe;
  }
  set iframe(value: BooleanInput) {
    this._iframe = coerceBooleanProperty(value);
  }
  _iframe: boolean = false;

  /**
   * Add your own styling class.
   */
  @Input() class: string = '';
  @HostBinding('class')
  get hostClasses(): string {
    return [this.class].join(' ');
  }

  loadingFinished = output();

  // @HostBinding('attr.id')
  // get hostID(): string {
  //   return this.exampleTitleID + '-example';
  // }

  constructor(
    private workshopService: WorkshopService,
    private sanitizer: DomSanitizer
  ) {
    effect(() => {
      if (this.workshopService.docsJsonDataReady()) {
        const match = this.workshopService.docsJsonData.filter(
          (component: { selector: string }) => component.selector === this.selector.trim()
        )[0];
        if (!match) {
          this.loading = false;
          this.loadingFinished.emit();
          return;
        }
        this.templateData = match.templateData || match.template;
        this.exampleType = match.description.match(/#[a-zA-Z|\-]*/g);
        const matchingKeys = Object.keys(MockDataKeys).filter((key) => match.sourceCode.includes(key));
        if (matchingKeys.length > 0) {
          matchingKeys?.forEach((dataSet) => {
            fetch(`assets/mock-data/${MockDataKeys[dataSet]}.json`)
              .then((res) => res.json())
              .then((data) => {
                if (!Array.isArray(data)) {
                  throw new Error('Invalid data format');
                }
                if (data.length > 3) {
                  data = data.slice(0, 3);
                  this.exampleData =
                    this.exampleData +
                    `\n\n// ${dataSet}\n${JSON.stringify(data, null, 2).replace(/\]$/g, '  ...\n]\n')}`;
                } else {
                  this.exampleData = this.exampleData + `\n\n// ${dataSet}\n${JSON.stringify(data, null, 2)}`;
                }
              })
              .catch((error) => {
                console.error('Error:', error);
              });
          });
        }
        this.exampleLink = match.file.split('/').slice(-4, -1).join('/'); // components/<component>/<example>
        this.iframeUrl = 'examples/' + this.exampleLink;
        this.sourceCode = match.sourceCode;
        if (!this.iframe) {
          this.loading = false;
          this.loadingFinished.emit();
        }
      }
    });
  }

  component = this.workshopService.componentName;

  ngOnInit(): void {
    if (this.exampleTitle && !this.codeSnippetsOnly) {
      this.exampleTitleID = this.exampleTitle
        .replace(/\s+/g, '-')
        .toLowerCase()
        .replace(/\(|\)|,/g, '');
      const exampleData = { name: this.exampleTitle, id: this.exampleTitleID, loading: this.loadingFinished };
      this.workshopService.examples.update((values) => (values ? [...values, exampleData] : [exampleData]));
    }
  }

  templateData: string;
  sourceCode: string;
  exampleData: string = '';
  exampleType: RegExpMatchArray | null = null;
  exampleLink = '';

  navigateTo(id: string) {
    this.workshopService.navigateTo(id);
  }

  handleiFrameLoad() {
    setTimeout(() => {
      this.loading = false;
      this.loadingFinished.emit();
    }, 2000); // delay of 2 seconds
  }
}
