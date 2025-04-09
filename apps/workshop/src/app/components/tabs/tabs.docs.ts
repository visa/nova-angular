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
import { NovaLibModule } from '@visa/nova-angular';
import { WorkshopService } from '../../shared/services/workshop.service';
import { NovaSharedModule } from '../../shared/nova-shared.module';
import { AutomaticActivationTabsComponent } from './automatic-activation/automatic-activation.docs';
import { HorizontalAlternateTabsComponent } from './horizontal-alternate/horizontal-alternate.docs';
import { HorizontalDefaultTabsComponent } from './horizontal-default/horizontal-default.docs';
import { HorizontalDisabledTabsComponent } from './horizontal-disabled/horizontal-disabled.docs';
import { HorizontalWithIconTabsComponent } from './horizontal-with-icon/horizontal-with-icon.docs';
import { HorizontalWithMenuTabsComponent } from './horizontal-with-menu/horizontal-with-menu.docs';
import { StackedAlternateTabsComponent } from './stacked-alternate/stacked-alternate.docs';
import { StackedDefaultTabsComponent } from './stacked-default/stacked-default.docs';
import { StackedDisabledTabsComponent } from './stacked-disabled/stacked-disabled.docs';
import { TabPanelTabsComponent } from './tab-panel/tab-panel.docs';
import { VerticalAlternateTabsComponent } from './vertical-alternate/vertical-alternate.docs';
import { VerticalDefaultTabsComponent } from './vertical-default/vertical-default.docs';
import { VerticalDisabledTabsComponent } from './vertical-disabled/vertical-disabled.docs';
import { VerticalWithIconTabsComponent } from './vertical-with-icon/vertical-with-icon.docs';
import { WithoutArrowNavigationTabsComponent } from './without-arrow-navigation/without-arrow-navigation.docs';
import { StackedWithNotificationsTabsComponent } from './stacked-with-notifications/stacked-with-notifications.docs';
import { VerticalWithMenuTabsComponent } from './vertical-with-menu/vertical-with-menu.docs';

@Component({
  imports: [
    CommonModule,
    NovaLibModule,
    NovaSharedModule,
    AutomaticActivationTabsComponent,
    HorizontalAlternateTabsComponent,
    HorizontalDefaultTabsComponent,
    HorizontalDisabledTabsComponent,
    HorizontalWithIconTabsComponent,
    HorizontalWithMenuTabsComponent,
    StackedAlternateTabsComponent,
    StackedDefaultTabsComponent,
    StackedDisabledTabsComponent,
    StackedWithNotificationsTabsComponent,
    TabPanelTabsComponent,
    VerticalAlternateTabsComponent,
    VerticalDefaultTabsComponent,
    VerticalDisabledTabsComponent,
    VerticalWithIconTabsComponent,
    WithoutArrowNavigationTabsComponent,
    VerticalWithMenuTabsComponent
  ],
  standalone: true,
  selector: 'nova-workshop-tabs',
  templateUrl: './tabs.docs.html'
})
export class TabsDocsComponent {
  constructor(public workshopService: WorkshopService) {
    this.workshopService.componentName.set('Tabs');
    this.workshopService.neededAPI.set([
      { name: 'TabListDirective' },
      { name: 'TabItemDirective' },
      { name: 'TabItemDisclosureDirective' },
      { name: 'ButtonDirective' },
      { name: 'ButtonStackedDirective' },
      { name: 'NovaLibService', type: 'service-source' },
      { name: 'AppReadyService', type: 'service-source' },
      { name: 'ButtonColor', type: 'constant' },
      { name: 'ButtonSize', type: 'constant' }
    ]);
  }

  ngAfterViewInit(): void {
    this.workshopService.isLoadingExamples.set(false);
  }

  ngOnInit(): void {
    this.workshopService.isLoadingExamples.set(true);
  }
}
