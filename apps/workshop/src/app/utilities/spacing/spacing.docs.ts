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
import { VisaMaximizeTiny } from '@visa/nova-icons-angular';
import { MarkdownModule } from 'ngx-markdown';
import { WorkshopService } from '../../shared/services/workshop.service';
import { NovaSharedModule } from '../../shared/nova-shared.module';
import { ColumnGapComponent } from './column-gap/column-gap.docs';
import { GapComponent } from './gap/gap.docs';
import { GapInheritComponent } from './gap-inherit/gap-inherit.docs';
import { GapNormalComponent } from './gap-normal/gap-normal.docs';
import { MarginBottomComponent } from './margin-bottom/margin-bottom.docs';
import { MarginComponent } from './margin/margin.docs';
import { MarginHorizontalComponent } from './margin-horizontal/margin-horizontal.docs';
import { MarginInheritComponent } from './margin-inherit/margin-inherit.docs';
import { MarginLeftComponent } from './margin-left/margin-left.docs';
import { MarginRightComponent } from './margin-right/margin-right.docs';
import { MarginTopComponent } from './margin-top/margin-top.docs';
import { MarginVerticalComponent } from './margin-vertical/margin-vertical.docs';
import { PaddingBottomComponent } from './padding-bottom/padding-bottom.docs';
import { PaddingComponent } from './padding/padding.docs';
import { PaddingHorizontalComponent } from './padding-horizontal/padding-horizontal.docs';
import { PaddingInheritComponent } from './padding-inherit/padding-inherit.docs';
import { PaddingLeftComponent } from './padding-left/padding-left.docs';
import { PaddingRightComponent } from './padding-right/padding-right.docs';
import { PaddingTopComponent } from './padding-top/padding-top.docs';
import { PaddingVerticalComponent } from './padding-vertical/padding-vertical.docs';
import { RowGapComponent } from './row-gap/row-gap.docs';

@Component({
  imports: [
    CommonModule,
    NovaLibModule,
    NovaSharedModule,
    MarkdownModule,
    VisaMaximizeTiny,
    ColumnGapComponent,
    GapComponent,
    GapInheritComponent,
    GapNormalComponent,
    MarginBottomComponent,
    MarginComponent,
    MarginHorizontalComponent,
    MarginInheritComponent,
    MarginLeftComponent,
    MarginRightComponent,
    MarginTopComponent,
    MarginVerticalComponent,
    PaddingBottomComponent,
    PaddingComponent,
    PaddingHorizontalComponent,
    PaddingInheritComponent,
    PaddingLeftComponent,
    PaddingRightComponent,
    PaddingTopComponent,
    PaddingVerticalComponent,
    RowGapComponent
  ],
  standalone: true,
  selector: 'nova-workshop-spacing',
  templateUrl: './spacing.docs.html'
})
export class SpacingComponent {
  constructor(private workshopService: WorkshopService) {
    this.workshopService.componentName.set('Spacing');
    this.workshopService.neededAPI.set([
      { name: 'MarginDirective' },
      { name: 'PaddingDirective' },
      { name: 'SpacingProperties', type: 'constant' }
    ]);
  }
}
