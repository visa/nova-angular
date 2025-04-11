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
import { Component, effect } from '@angular/core';
import { WorkshopService } from '../../../shared/services/workshop.service';
import { NovaLibModule } from '@visa/nova-angular';
import { CommonModule } from '@angular/common';
import {
  VisaChevronDownTiny,
  VisaChevronRightTiny,
  VisaCodeForkAltTiny,
  VisaInformationTiny,
  VisaMaximizeTiny
} from '@visa/nova-icons-angular';
import { MarkdownModule } from 'ngx-markdown';
import { RouterModule } from '@angular/router';
import { APITypes, ReturnAPI } from '../../../shared/services/workshop.constants';
import { OnThisPageComponent } from '../on-this-page-alm/on-this-page-alm.docs';
import { ChipDocsComponent } from '../../../components/chip/chip.docs';
import { SafeHtmlDirective } from '../safe-html/safe-html.directive';

@Component({
  selector: 'nova-workshop-api-table',
  templateUrl: './api-table.docs.html',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NovaLibModule,
    MarkdownModule,
    VisaCodeForkAltTiny,
    VisaMaximizeTiny,
    VisaInformationTiny,
    VisaChevronDownTiny,
    VisaChevronRightTiny,
    OnThisPageComponent,
    SafeHtmlDirective
  ],
  styles: [
    `
      :host {
        display: flex;
        flex-direction: row-reverse;
        flex-wrap: wrap;
        inline-size: 100%;

        .api-list {
          .v-typography-headline-2 {
            color: var(--palette-default-text);
          }
        }
        > .v-anchor-link-menu {
          min-inline-size: 20%;
          flex-grow: 1;

          :is(section) {
            max-block-size: 100vh;
            overflow-y: auto;
            padding: 2px;
            padding-inline-start: 0;
          }
        }

        > .api-list {
          inline-size: 75%;
          flex-grow: 3;
        }
      }
    `
  ]
})
export class APITableDocsComponent {
  APITypes = APITypes;
  APIData: ReturnAPI[] = [];
  almData: { name: string; id: string }[] = [];
  nova_repo = 'https://stash.trusted.visa.com:7990/projects/VC/repos/nova-angular/browse/';

  constructor(private workshopService: WorkshopService) {
    effect(
      () => {
        this.APIData = [];
        this.almData = [];
        if (this.workshopService.libJsonDataReady()) {
          this.workshopService.neededAPI()?.forEach((api) => {
            const result = this.workshopService.getAPI(api['name'], api['type'] ? api['type'] : APITypes.DIRECTIVE);
            if (result) {
              this.APIData.push(result);
              const name = result.component ? result.component : result.name;
              this.almData.push({ name: name, id: name });
            }
          });
        }
      },
      { allowSignalWrites: true }
    );
  }

  neededAPI = this.workshopService.neededAPI;
}
