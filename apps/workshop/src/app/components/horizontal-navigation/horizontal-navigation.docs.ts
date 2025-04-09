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
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NovaLibModule } from '@visa/nova-angular';
import { MarkdownModule } from 'ngx-markdown';
import { WorkshopService } from '../../shared/services/workshop.service';
import { NovaSharedModule } from '../../shared/nova-shared.module';
import { AlternateHorizontalNavComponent } from './alternate/alternate.docs';
import { AlternateWithActiveElementHorizontalNavComponent } from './alternate-with-active-element/alternate-with-active-element.docs';
import { AlternateWithIconsHorizontalNavComponent } from './alternate-with-icons/alternate-with-icons.docs';
import { DefaultHorizontalNavComponent } from './default/default.docs';
import { PersistentSearcgHorizontalNavComponent } from './persistent-search/persistent-search.docs';
import { StackedHorizontalNavComponent } from './stacked/stacked.docs';
import { StackedWithPersistentSearchHorizontalNavComponent } from './stacked-with-persistent-search/stacked-with-persistent-search.docs';
import { WithActiveElementHorizontalNavComponent } from './with-active-element/with-active-element.docs';
import { WithIconsHorizontalNavComponent } from './with-icons/with-icons.docs';
import { RouterLinkMessageComponent } from '../../shared/app-components/dev-messages/router-link/router-link.docs';

@Component({
  imports: [
    CommonModule,
    NovaLibModule,
    NovaSharedModule,
    RouterModule,
    MarkdownModule,
    RouterLinkMessageComponent,
    AlternateHorizontalNavComponent,
    AlternateWithActiveElementHorizontalNavComponent,
    AlternateWithIconsHorizontalNavComponent,
    DefaultHorizontalNavComponent,
    PersistentSearcgHorizontalNavComponent,
    StackedHorizontalNavComponent,
    StackedWithPersistentSearchHorizontalNavComponent,
    WithActiveElementHorizontalNavComponent,
    WithIconsHorizontalNavComponent
  ],
  standalone: true,
  selector: 'nova-workshop-nav-horizontal',
  templateUrl: './horizontal-navigation.docs.html',
  styles: [
    `
      .app-container {
        min-block-size: 700px;
        display: grid;
        grid-template-columns: fit-content(250px) 1fr;

        @media (max-width: 750px) {
          display: block;
          min-block-size: auto;
        }
      }

      .app-container > *:has(> .v-nav) {
        padding: 0;
      }
      .main-content {
        background-color: whitesmoke;
        padding: 12px;
      }
    `
  ]
})
export class HorizontalNavigationDocsComponent {
  constructor(public workshopService: WorkshopService) {
    this.workshopService.componentName.set('Horizontal navigation');
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
  grid-template-columns: fit-content(250px) 1fr;

  @media(max-width: 750px) {
    display: block;
    min-block-size: auto;
  }
}
.main-content {
  background-color: whitesmoke;
  padding: 12px;
}`;
}
