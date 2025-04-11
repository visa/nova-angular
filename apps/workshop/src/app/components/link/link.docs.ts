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
import { Component } from '@angular/core';
import { NovaLibModule } from '@visa/nova-angular';
import { VisaInformationLow, VisaWarningLow } from '@visa/nova-icons-angular';
import { NovaSharedModule } from '../../shared/nova-shared.module';
import { WorkshopService } from '../../shared/services/workshop.service';
import { AlternateLinkComponent } from './alternate/alternate.docs';
import { ButtonAsDisabledLinkLinkComponent } from './button-as-disabled-link/button-as-disabled-link.docs';
import { ButtonAsLinkLinkComponent } from './button-as-link/button-as-link.docs';
import { DefaultLinkComponent } from './default/default.docs';
import { DisabledLinkComponent } from './disabled/disabled.docs';
import { InlineLinkComponent } from './inline/inline.docs';
import { LinkWithLeadingIconComponent } from './link-with-leading-icon/link-with-leading-icon.docs';
import { LinkWithTrailingIconComponent } from './link-with-trailing-icon/link-with-trailing-icon.docs';
import { LinkOpenInNewTab } from './open-in-new-tab/open-in-new-tab.docs';
import { WithoutUnderlineLinkComponent } from './without-underline/without-underline.docs';

@Component({
  imports: [
    CommonModule,
    NovaLibModule,
    NovaSharedModule,
    ButtonAsDisabledLinkLinkComponent,
    WithoutUnderlineLinkComponent,
    LinkWithLeadingIconComponent,
    LinkWithTrailingIconComponent,
    ButtonAsLinkLinkComponent,
    DisabledLinkComponent,
    AlternateLinkComponent,
    LinkOpenInNewTab,
    DefaultLinkComponent,
    InlineLinkComponent,
    DisabledLinkComponent,
    VisaInformationLow
  ],
  standalone: true,
  selector: 'nova-docs-link',
  templateUrl: './link.docs.html'
})
export class LinkDocsComponent {
  constructor(public workshopService: WorkshopService) {
    this.workshopService.componentName.set('Link');
    this.workshopService.neededAPI.set([{ name: 'LinkDirective' }, { name: 'OpensInNewTabDirective' }]);
  }

  ngAfterViewInit(): void {
    this.workshopService.isLoadingExamples.set(false);
  }

  ngOnInit(): void {
    this.workshopService.isLoadingExamples.set(true);
  }
}
