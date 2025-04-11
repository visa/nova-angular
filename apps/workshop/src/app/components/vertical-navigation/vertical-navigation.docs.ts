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
import { RouterModule } from '@angular/router';
import { NovaLibModule } from '@visa/nova-angular';
import { VisaInformationLow } from '@visa/nova-icons-angular';
import { MarkdownModule } from 'ngx-markdown';
import { NovaSharedModule } from '../../shared/nova-shared.module';
import { WorkshopService } from '../../shared/services/workshop.service';
import { AlternateVerticalNavComponent } from './alternate/alternate.docs';
import { AlternateWithIconsVerticalNavComponent } from './alternate-with-icons/alternate-with-icons.docs';
import { DefaultVerticalNavComponent } from './default/default.docs';
import { LinksOnlyVerticalNavComponent } from './links-only/links-only.docs';
import { NestedVerticalNavComponent } from './nested/nested.docs';
import { NestedWithSectionTitleVerticalNavComponent } from './nested-with-section-titles/nested-with-section-titles.docs';
import { VerticalAlternateWithActiveElementNavComponent } from './alternate-with-active-element/alternate-with-active-element.docs';
import { VerticalWithActiveElementNavComponent } from './active-element/active-element.docs';
import { WithIconsVerticalNavComponent } from './with-icons/with-icons.docs';
import { WithSectionTitleVerticalNavComponent } from './with-section-titles/with-section-titles.docs';
import { RouterLinkMessageComponent } from '../../shared/app-components/dev-messages/router-link/router-link.docs';

@Component({
  imports: [
    CommonModule,
    NovaLibModule,
    NovaSharedModule,
    RouterModule,
    MarkdownModule,
    RouterLinkMessageComponent,
    VisaInformationLow,
    AlternateVerticalNavComponent,
    AlternateWithIconsVerticalNavComponent,
    DefaultVerticalNavComponent,
    LinksOnlyVerticalNavComponent,
    NestedVerticalNavComponent,
    NestedWithSectionTitleVerticalNavComponent,
    VerticalAlternateWithActiveElementNavComponent,
    VerticalWithActiveElementNavComponent,
    WithIconsVerticalNavComponent,
    WithSectionTitleVerticalNavComponent
  ],
  standalone: true,
  selector: 'nova-workshop-nav-vertical',
  templateUrl: './vertical-navigation.docs.html'
})
export class VerticalNavDocsComponent {
  constructor(public workshopService: WorkshopService) {
    this.workshopService.componentName.set('Vertical navigation');
    this.workshopService.neededAPI.set([
      { name: 'NavDirective' },
      { name: 'SurfaceDirective' },
      { name: 'SkipToContentDirective' },
      { name: 'TabListDirective' },
      { name: 'TabItemDirective' },
      { name: 'ButtonDirective' },
      { name: 'ButtonIconDirective' },
      { name: 'TabItemDisclosureDirective' },
      { name: 'LinkDirective' },
      { name: 'VisaLogoComponent', type: 'component' },
      { name: 'FloatingUIContainer', type: 'directive' },
      { name: 'DropdownMenuDirective' },
      { name: 'IconToggleComponent', type: 'component' },
      { name: 'FloatingUITriggerDirective', type: 'directive' },
      { name: 'AvatarDirective' },
      { name: 'VisaLogoComponent', type: 'component' },
      { name: 'FloatingUIService', type: 'service-source' },
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

  htmlLayout = `<div class="app-container">
  <div v-nav ..> ... </div>
  <div class="main-content"></div>
</div>`;

  css = `.app-container {
  min-block-size: 700px;
  display: grid;
  grid-template-columns: auto 1fr;

  &:has(.v-nav .v-tabs) {
    // the open navigation should be 242px
    grid-template-columns: 242px 1fr;
  }

  @container (max-width: 500px) {
    grid-template-columns: 1fr;
  }
}

.main-content {
  background-color: whitesmoke;
  min-block-size: 300px;
  padding: 12px;
}`;
}
