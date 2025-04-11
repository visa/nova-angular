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
import { Component } from '@angular/core';
import { WorkshopService } from '../../shared/services/workshop.service';
import { CommonModule } from '@angular/common';
import { NovaLibModule } from '@visa/nova-angular';
import { MarkdownModule } from 'ngx-markdown';
import { NovaSharedModule } from '../../shared/nova-shared.module';
import { WithProgrammaticExpansionAccordionComponent } from './with-programmatic-expansion/with-programmatic-expansion.docs';
import { SingleSelectWithDisabledAccordionComponent } from './single-select-with-disabled-accordion/single-select-with-disabled-accordion.docs';
import { MultiSelectWithDisabledAccordionComponent } from './multi-select-with-disabled-accordion/multi-select-with-disabled-accordion.docs';
import { WithCustomToggleIconsAccordionComponent } from './with-custom-toggle-icons/with-custom-toggle-icons.docs';
import { ArrowKeysAndNoTabNavAccordionComponent } from './with-arrow-keys-and-no-tab-navigation/with-arrow-keys-and-no-tab-navigation.docs';
import { SingleSelectExpandedAccordionComponent } from './single-select-expanded/single-select-expanded.docs';
import { SingleSelectDefaultAccordionComponent } from './single-select-default/single-select-default.docs';
import { MultiSelectExpandedAccordionComponent } from './multi-select-expanded/multi-select-expanded.docs';
import { SingleSelectSubtleAccordionComponent } from './single-select-subtle/single-select-subtle.docs';
import { MultiSelectDefaultAccordionComponent } from './multi-select-default/multi-select-default.docs';
import { MultiSelectSubtleAccordionComponent } from './multi-select-subtle/multi-select-subtle.docs';
import { WithArrowKeyNavAccordionComponent } from './with-arrow-key-navigation/with-arrow-key-navigation.docs';
import { SubtleWithIconAccordionComponent } from './subtle-with-icon/subtle-with-icon.docs';
import { SubtleAccordionComponent } from './subtle/subtle.docs';
import { DefaultAccordionComponent } from './default/default.docs';
import { DisabledAccordionComponent } from './disabled/disabled.docs';
import { WithIconAccordionComponent } from './with-icon/with-icon.docs';
import { SubtleDisabledAccordionComponent } from './subtle-disabled/subtle-disabled.docs';
import { CustomA11yMarkupAccordionComponent } from './with-custom-accessible-markup/with-custom-accessible-markup.docs';
import { WithBadgeAccordionComponent } from './with-badge/with-badge.docs';

@Component({
  imports: [
    CommonModule,
    MarkdownModule,
    NovaLibModule,
    NovaSharedModule,
    WithProgrammaticExpansionAccordionComponent,
    SingleSelectWithDisabledAccordionComponent,
    MultiSelectWithDisabledAccordionComponent,
    WithCustomToggleIconsAccordionComponent,
    ArrowKeysAndNoTabNavAccordionComponent,
    SingleSelectExpandedAccordionComponent,
    SingleSelectDefaultAccordionComponent,
    MultiSelectExpandedAccordionComponent,
    SingleSelectSubtleAccordionComponent,
    MultiSelectDefaultAccordionComponent,
    MultiSelectSubtleAccordionComponent,
    WithArrowKeyNavAccordionComponent,
    SubtleWithIconAccordionComponent,
    SubtleAccordionComponent,
    DefaultAccordionComponent,
    DisabledAccordionComponent,
    WithIconAccordionComponent,
    SubtleDisabledAccordionComponent,
    CustomA11yMarkupAccordionComponent,
    WithBadgeAccordionComponent
  ],
  selector: 'nova-workshop-accordion',
  standalone: true,
  templateUrl: './accordion.docs.html'
})
export class AccordionDocsComponent {
  constructor(public workshopService: WorkshopService) {
    this.workshopService.componentName.set('Accordion');
    this.workshopService.neededAPI.set([
      { name: 'AccordionDirective' },
      { name: 'AccordionHeadingDirective' },
      { name: 'AccordionPanelDirective' },
      { name: 'AccordionDetailsDirective' },
      { name: 'ButtonDirective' },
      { name: 'IconToggleComponent', type: 'component' },
      { name: 'AccordionService', type: 'service-source' },
      { name: 'UUIDService', type: 'service-source' },
      { name: 'NovaLibService', type: 'service-source' },
      { name: 'IconToggle', type: 'constant' }
    ]);
  }

  ngAfterViewInit(): void {
    this.workshopService.isLoadingExamples.set(false);
  }

  ngOnInit(): void {
    this.workshopService.isLoadingExamples.set(true);
  }
}
