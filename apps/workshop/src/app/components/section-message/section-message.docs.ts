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
import { EmptyDefaultSectionMessageComponent } from './empty-default/empty-default.docs';
import { EmptyErrorSectionMessageComponent } from './empty-error/empty-error.docs';
import { EmptySuccessSectionMessageComponent } from './empty-success/empty-success.docs';
import { EmptyWarningSectionMessageComponent } from './empty-warning/empty-warning.docs';
import { NovaDefaultErrorSectionMessageSectionMessageComponent } from './nova-default-error-section-message/nova-default-error-section-message.docs';
import { NovaDefaultInfoSectionMessageSectionMessageComponent } from './nova-default-info-section-message/nova-default-info-section-message.docs';
import { NovaDefaultSuccessSectionMessageSectionMessageComponent } from './nova-default-success-section-message/nova-default-success-section-message.docs';
import { NovaDefaultWarningSectionMessageSectionMessageComponent } from './nova-default-warning-section-message/nova-default-warning-section-message.docs';
import { NovaErrorSectionMessageWithActionButtonSectionMessageComponent } from './nova-error-section-message-with-action-button/nova-error-section-message-with-action-button.docs';
import { NovaErrorSectionMessageWithLinkSectionMessageComponent } from './nova-error-section-message-with-link/nova-error-section-message-with-link.docs';
import { NovaErrorSectionMessageSectionMessageComponent } from './nova-error-section-message/nova-error-section-message.docs';
import { NovaInfoSectionMessageWithActionButtonSectionMessageComponent } from './nova-info-section-message-with-action-button/nova-info-section-message-with-action-button.docs';
import { NovaInfoSectionMessageWithLinkSectionMessageComponent } from './nova-info-section-message-with-link/nova-info-section-message-with-link.docs';
import { NovaPersistentErrorSectionMessageSectionMessageComponent } from './nova-persistent-error-section-message/nova-persistent-error-section-message.docs';
import { NovaPersistentInfoSectionMessageSectionMessageComponent } from './nova-persistent-info-section-message/nova-persistent-info-section-message.docs';
import { NovaPersistentSuccessSectionMessageSectionMessageComponent } from './nova-persistent-success-section-message/nova-persistent-success-section-message.docs';
import { NovaPersistentWarningSectionMessageSectionMessageComponent } from './nova-persistent-warning-section-message/nova-persistent-warning-section-message.docs';
import { NovaSuccessSectionMessageWithActionButtonSectionMessageComponent } from './nova-success-section-message-with-action-button/nova-success-section-message-with-action-button.docs';
import { NovaSuccessSectionMessageWithLinkSectionMessageComponent } from './nova-success-section-message-with-link/nova-success-section-message-with-link.docs';
import { NovaSuccessSectionMessageSectionMessageComponent } from './nova-success-section-message/nova-success-section-message.docs';
import { NovaTitleErrorSectionMessageComponent } from './nova-title-error-section-message/nova-title-error-section-message.docs';
import { NovaTitleInfoSectionMessageComponent } from './nova-title-info-section-message/nova-title-info-section-message.docs';
import { NovaTitleSuccessSectionMessageComponent } from './nova-title-success-section-message/nova-title-success-section-message.docs';
import { NovaTitleWarningSectionMessageComponent } from './nova-title-warning-section-message/nova-title-warning-section-message.docs';
import { NovaWarningSectionMessageWithActionButtonSectionMessageComponent } from './nova-warning-section-message-with-action-button/nova-warning-section-message-with-action-button.docs';
import { NovaWarningSectionMessageWithLinkSectionMessageComponent } from './nova-warning-section-message-with-link/nova-warning-section-message-with-link.docs';
import { NovaWarningSectionMessageSectionMessageComponent } from './nova-warning-section-message/nova-warning-section-message.docs';
import { EmptySubtleSectionMessageComponent } from './empty-subtle/empty-subtle.docs';
import { NovaDefaultSubtleSectionMessageSectionMessageComponent } from './nova-default-subtle-section-message/nova-default-subtle-section-message.docs';
import { NovaTitleSubtleSectionMessageComponent } from './nova-title-subtle-section-message/nova-title-subtle-section-message.docs';
import { NovaSubtleSectionMessageWithLinkSectionMessageComponent } from './nova-subtle-section-message-with-link/nova-subtle-section-message-with-link.docs';
import { NovaPersistentSubtleSectionMessageSectionMessageComponent } from './nova-persistent-subtle-section-message/nova-persistent-subtle-section-message.docs';
import { NovaSubtleSectionMessageWithActionButtonSectionMessageComponent } from './nova-subtle-section-message-with-action-button/nova-subtle-section-message-with-action-button.docs';

@Component({
  imports: [
    CommonModule,
    NovaLibModule,
    NovaSharedModule,
    NovaDefaultInfoSectionMessageSectionMessageComponent,
    NovaTitleInfoSectionMessageComponent,
    NovaSuccessSectionMessageSectionMessageComponent,
    NovaWarningSectionMessageSectionMessageComponent,
    NovaErrorSectionMessageSectionMessageComponent,
    NovaDefaultWarningSectionMessageSectionMessageComponent,
    NovaDefaultErrorSectionMessageSectionMessageComponent,
    NovaDefaultSuccessSectionMessageSectionMessageComponent,
    NovaTitleSuccessSectionMessageComponent,
    NovaTitleWarningSectionMessageComponent,
    NovaTitleErrorSectionMessageComponent,
    NovaPersistentErrorSectionMessageSectionMessageComponent,
    NovaPersistentInfoSectionMessageSectionMessageComponent,
    NovaPersistentSuccessSectionMessageSectionMessageComponent,
    NovaPersistentWarningSectionMessageSectionMessageComponent,
    NovaInfoSectionMessageWithLinkSectionMessageComponent,
    NovaSuccessSectionMessageWithLinkSectionMessageComponent,
    NovaWarningSectionMessageWithLinkSectionMessageComponent,
    NovaErrorSectionMessageWithLinkSectionMessageComponent,
    NovaInfoSectionMessageWithActionButtonSectionMessageComponent,
    NovaSuccessSectionMessageWithActionButtonSectionMessageComponent,
    NovaWarningSectionMessageWithActionButtonSectionMessageComponent,
    NovaErrorSectionMessageWithActionButtonSectionMessageComponent,
    EmptyDefaultSectionMessageComponent,
    EmptyErrorSectionMessageComponent,
    EmptySuccessSectionMessageComponent,
    EmptyWarningSectionMessageComponent,
    EmptySubtleSectionMessageComponent,
    NovaDefaultSubtleSectionMessageSectionMessageComponent,
    NovaTitleSubtleSectionMessageComponent,
    NovaSubtleSectionMessageWithLinkSectionMessageComponent,
    NovaPersistentSubtleSectionMessageSectionMessageComponent,
    NovaSubtleSectionMessageWithActionButtonSectionMessageComponent
  ],
  standalone: true,
  selector: 'vds-docs-nova-section-message',
  templateUrl: './section-message.docs.html'
})
export class SectionMessageDocsComponent {
  constructor(public workshopService: WorkshopService) {
    this.workshopService.componentName.set('Section message');
    this.workshopService.neededAPI.set([
      { name: 'SectionMessageDirective' },
      { name: 'MessageDirective' },
      { name: 'MessageContentDirective' },
      { name: 'MessageIconDirective' },
      { name: 'MessageType', type: APITypes.CONSTANT }
    ]);
  }

  ngAfterViewInit(): void {
    this.workshopService.isLoadingExamples.set(false);
  }

  ngOnInit(): void {
    this.workshopService.isLoadingExamples.set(true);
  }
}
