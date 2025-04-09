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
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarkdownModule } from 'ngx-markdown';
import { NovaLibModule } from '@visa/nova-angular';
import { NovaSharedModule } from '../../shared/nova-shared.module';
import { NegativeLabelOnlyBadgeComponent } from './negative-label-only/negative-label-only.docs';
import { NegativeWithIconBadgeComponent } from './negative-with-icon/negative-with-icon.docs';
import { NegativeWithEllipseBadgeComponent } from './negative-with-ellipse/negative-with-ellipse.docs';
import { LongNumberBadgeComponent } from './long-number/long-number.docs';
import { NeutralLabelOnlyBadgeComponent } from './neutral-label-only/neutral-label-only.docs';
import { NeutralWithEllipseBadgeComponent } from './neutral-with-ellipse/neutral-with-ellipse.docs';
import { NeutralWithIconBadgeComponent } from './neutral-with-icon/neutral-with-icon.docs';
import { NumberBadgeComponent } from './number/number.docs';
import { StableLabelOnlyBadgeComponent } from './stable-label-only/stable-label-only.docs';
import { StableWithEllipseBadgeComponent } from './stable-with-ellipse/stable-with-ellipse.docs';
import { StableWithIconBadgeComponent } from './stable-with-icon/stable-with-icon.docs';
import { SubtleLabelOnlyBadgeComponent } from './subtle-label-only/subtle-label-only.docs';
import { SubtleWithEllipseBadgeComponent } from './subtle-with-ellipse/subtle-with-ellipse.docs';
import { SubtleWithIconBadgeComponent } from './subtle-with-icon/subtle-with-icon.docs';
import { WarningLabelOnlyBadgeComponent } from './warning-label-only/warning-label-only.docs';
import { WarningWithEllipseBadgeComponent } from './warning-with-ellipse/warning-with-ellipse.docs';
import { WarningWithIconBadgeComponent } from './warning-with-icon/warning-with-icon.docs';
import { DefaultBadgeComponent } from './default/default.docs';
import { SubtleNoBackgroundBadgeComponent } from './subtle-no-background/subtle-no-background.docs';
import { SubtleNumberNoBackgroundBadgeComponent } from './subtle-number-no-background/subtle-number-no-background.docs';
import { SubtleNumberBadgeComponent } from './subtle-number/subtle-number.docs';
import { SubtleIconOnlyBadgeComponent } from './subtle-icon-only/subtle-icon-only.docs';
import { SubtleIconNoBackgroundBadgeComponent } from './subtle-icon-no-background/subtle-icon-no-background.docs';
import { NeutralNoBackgroundBadgeComponent } from './neutral-no-background/neutral-no-background.docs';
import { NeutralNumberBadgeComponent } from './neutral-number/neutral-number.docs';
import { NeutralNumberNoBackgroundBadgeComponent } from './neutral-number-no-background/neutral-number-no-background.docs';
import { StableNoBackgroundBadgeComponent } from './stable-no-background/stable-no-background.docs';
import { NeutralIconNoBackgroundBadgeComponent } from './neutral-icon-no-background/neutral-icon-no-background.docs';
import { NeutralIconOnlyBadgeComponent } from './neutral-icon-only/neutral-icon-only.docs';
import { StableIconNoBackgroundBadgeComponent } from './stable-icon-no-background/stable-icon-no-background.docs';
import { StableIconOnlyBadgeComponent } from './stable-icon-only/stable-icon-only.docs';
import { StableNumberBadgeComponent } from './stable-number/stable-number.docs';
import { StableNumberNoBackgroundBadgeComponent } from './stable-number-no-background/stable-number-no-background.docs';
import { WarningNoBackgroundBadgeComponent } from './warning-no-background/warning-no-background.docs';
import { WarningNumberBadgeComponent } from './warning-number/warning-number.docs';
import { WarningNumberNoBackgroundBadgeComponent } from './warning-number-no-background/warning-number-no-background.docs';
import { WarningIconOnlyBadgeComponent } from './warning-icon-only/warning-icon-only.docs';
import { WarningIconNoBackgroundBadgeComponent } from './warning-icon-no-background/warning-icon-no-background.docs';
import { NegativeNoBackgroundBadgeComponent } from './negative-no-background/negative-no-background.docs';
import { NegativeNumberBadgeComponent } from './negative-number/negative-number.docs';
import { NegativeNumberNoBackgroundBadgeComponent } from './negative-number-no-background/negative-number-no-background.docs';
import { NegativeIconOnlyBadgeComponent } from './negative-icon-only/negative-icon-only.docs';
import { NegativeIconNoBackgroundBadgeComponent } from './negative-icon-no-background/negative-icon-no-background.docs';
import { NumberNoBackgroundBadgeComponent } from './number-no-background/number-no-background.docs';
import { WorkshopService } from '../../shared/services/workshop.service';

@Component({
  imports: [
    CommonModule,
    MarkdownModule,
    NovaLibModule,
    NovaSharedModule,
    NegativeLabelOnlyBadgeComponent,
    NegativeWithEllipseBadgeComponent,
    NegativeNoBackgroundBadgeComponent,
    NegativeNumberBadgeComponent,
    NegativeNumberNoBackgroundBadgeComponent,
    DefaultBadgeComponent,
    NeutralLabelOnlyBadgeComponent,
    NeutralNoBackgroundBadgeComponent,
    NeutralWithEllipseBadgeComponent,
    NeutralNumberBadgeComponent,
    NeutralNumberNoBackgroundBadgeComponent,
    StableLabelOnlyBadgeComponent,
    StableWithEllipseBadgeComponent,
    StableNoBackgroundBadgeComponent,
    StableNumberBadgeComponent,
    StableNumberNoBackgroundBadgeComponent,
    WarningLabelOnlyBadgeComponent,
    WarningWithEllipseBadgeComponent,
    WarningNoBackgroundBadgeComponent,
    WarningNumberBadgeComponent,
    WarningNumberNoBackgroundBadgeComponent,
    SubtleLabelOnlyBadgeComponent,
    SubtleWithEllipseBadgeComponent,
    SubtleNoBackgroundBadgeComponent,
    SubtleNumberBadgeComponent,
    SubtleNumberNoBackgroundBadgeComponent,
    NumberBadgeComponent,
    NumberNoBackgroundBadgeComponent,
    LongNumberBadgeComponent,
    NegativeWithIconBadgeComponent,
    NegativeIconOnlyBadgeComponent,
    NegativeIconNoBackgroundBadgeComponent,
    NeutralWithIconBadgeComponent,
    NeutralIconNoBackgroundBadgeComponent,
    NeutralIconOnlyBadgeComponent,
    StableIconNoBackgroundBadgeComponent,
    StableIconOnlyBadgeComponent,
    StableWithIconBadgeComponent,
    WarningWithIconBadgeComponent,
    SubtleWithIconBadgeComponent,
    WarningIconOnlyBadgeComponent,
    WarningIconNoBackgroundBadgeComponent,
    SubtleWithIconBadgeComponent,
    SubtleIconOnlyBadgeComponent,
    SubtleIconNoBackgroundBadgeComponent
  ],
  standalone: true,
  selector: 'nova-workshop-badge',
  templateUrl: './badge.docs.html'
})
export class BadgeDocsComponent {
  constructor(public workshopService: WorkshopService) {
    this.workshopService.componentName.set('Badge');
    this.workshopService.neededAPI.set([
      { name: 'BadgeDirective', type: 'directive' },
      { name: 'BadgeType', type: 'constant' },
      { name: 'UUIDService', type: 'service-source' }
    ]);
  }

  ngAfterViewInit(): void {
    this.workshopService.isLoadingExamples.set(false);
  }

  ngOnInit(): void {
    this.workshopService.isLoadingExamples.set(true);
  }
}
