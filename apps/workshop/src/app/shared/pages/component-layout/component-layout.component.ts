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
import { AfterViewInit, Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AnchorLinkMenuDirective, ButtonDirective, NovaLibModule } from '@visa/nova-angular';
import { WorkshopService } from '../../../shared/services/workshop.service';
import { HeroComponent } from '../../app-components/hero/hero.component';
import { PageHeroComponent } from '../../app-components/page-hero/page-hero.docs';
import { APITableDocsComponent } from '../../app-components/api-table/api-table.docs';
import { TabPanelComponent } from '../../app-components/tab-panel/tab-panel.component';
import { OnThisPageComponent } from '../../app-components/on-this-page-alm/on-this-page-alm.docs';

@Component({
  imports: [
    NovaLibModule,
    HeroComponent,
    TabPanelComponent,
    APITableDocsComponent,
    PageHeroComponent,
    CommonModule,
    RouterModule,
    OnThisPageComponent
  ],
  standalone: true,
  selector: 'nova-workshop-component-layout',
  templateUrl: './component-layout.component.html',
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
        min-block-size: 100%;

        .examples-panel {
          > .examples-list {
            inline-size: 75%;
            flex-grow: 3;
          }
        }
      }
    `
  ]
})
export class ComponentLayoutComponent implements AfterViewInit {
  @ViewChildren(ButtonDirective) tabButtons: QueryList<ButtonDirective>;
  @ViewChild(AnchorLinkMenuDirective) alm: AnchorLinkMenuDirective;

  constructor(public workshopService: WorkshopService) {}

  selectedTab = this.workshopService.selectedHeroTab;
  examples = this.workshopService.examples;

  updateTab(index: number) {
    this.workshopService.setHeroTab(index);
  }

  navigateTo(id: string) {
    this.workshopService.navigateTo(id, id + '-link');
  }

  ngAfterViewInit(): void {
    if (this.workshopService.urlFragment) {
      // find example corresponding to url fragment
      const startingExample = this.workshopService
        .examples()
        ?.find(
          (example) =>
            example.id.includes(this.workshopService.urlFragment) || example.id === this.workshopService.urlFragment
        );

      if (startingExample) {
        startingExample.loading.subscribe(() => {
          this.workshopService.navigateTo(startingExample.id, startingExample.id + '-link');
        });
      }
    }
  }
}
