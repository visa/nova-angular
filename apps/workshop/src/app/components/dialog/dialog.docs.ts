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
import { APITypes } from '../../shared/services/workshop.constants';
import { WorkshopService } from '../../shared/services/workshop.service';
import { NovaSharedModule } from '../../shared/nova-shared.module';
import { NovaConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.docs';
import { NovaDefaultDialogComponent } from './default/default.docs';
import { NovaErrorDialogComponent } from './error/error.docs';
import { NovaSuccessDialogComponent } from './success/success.docs';
import { NovaTouringTipsDialogComponent } from './touring-tips/touring-tips.docs';
import { NovaWarningDialogComponent } from './warning/warning.docs';
import { NovaWithoutCloseButtonDialogComponent } from './without-close-button/without-close-button.docs';
@Component({
  imports: [
    NovaLibModule,
    NovaSharedModule,
    CommonModule,
    NovaConfirmationDialogComponent,
    NovaDefaultDialogComponent,
    NovaSuccessDialogComponent,
    NovaErrorDialogComponent,
    NovaWarningDialogComponent,
    NovaTouringTipsDialogComponent,
    NovaWithoutCloseButtonDialogComponent
  ],
  standalone: true,
  selector: 'nova-docs-dialog',
  templateUrl: './dialog.docs.html'
})
export class DialogDocsComponent {
  constructor(public workshopService: WorkshopService) {
    this.workshopService.componentName.set('Dialog');
    this.workshopService.neededAPI.set([
      { name: 'DialogComponent' },
      { name: 'DialogHeaderDirective' },
      { name: 'DialogTextDirective' },
      { name: 'MessageDirective' },
      { name: 'MessageContentDirective' },
      { name: 'MessageIconDirective' },
      { name: 'MessageType', type: APITypes.CONSTANT },
      { name: 'UUIDService', type: APITypes.SERVICESOURCE }
    ]);
  }

  ngAfterViewInit(): void {
    this.workshopService.isLoadingExamples.set(false);
  }

  ngOnInit(): void {
    this.workshopService.isLoadingExamples.set(true);
  }
}
