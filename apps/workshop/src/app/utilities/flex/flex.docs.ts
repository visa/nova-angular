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
import { AlignContentAroundComponent } from './align-content-around/align-content-around.docs';
import { AlignContentCenterComponent } from './align-content-center/align-content-center.docs';
import { AlignContentEndComponent } from './align-content-end/align-content-end.docs';
import { AlignContentEvenlyComponent } from './align-content-evenly/align-content-evenly.docs';
import { AlignContentBetweenComponent } from './align-content-space-between/align-content-space-between.docs';
import { AlignContentStartComponent } from './align-content-start/align-content-start.docs';
import { AlignItemsBaselineComponent } from './align-items-baseline/align-items-baseline.docs';
import { AlignItemsCenterComponent } from './align-items-center/align-items-center.docs';
import { AlignItemsEndComponent } from './align-items-end/align-items-end.docs';
import { AlignItemsStartComponent } from './align-items-start/align-items-start.docs';
import { AlignItemsStretchComponent } from './align-items-stretch/align-items-stretch.docs';
import { AlignSelfAutoComponent } from './align-self-auto/align-self-auto.docs';
import { AlignSelfCenterComponent } from './align-self-center/align-self-center.docs';
import { AlignSelfEndComponent } from './align-self-end/align-self-end.docs';
import { AlignSelfStartComponent } from './align-self-start/align-self-start.docs';
import { AlignSelfStretchComponent } from './align-self-stretch/align-self-stretch.docs';
import { ColumnReverseComponent } from './column-reverse/column-reverse.docs';
import { ColumnComponent } from './column/column.docs';
import { ContainerComponent } from './container/container.docs';
import { Grow0Component } from './grow-0/grow-0.docs';
import { GrowComponent } from './grow/grow.docs';
import { InlineContainerComponent } from './inline-container/inline-container.docs';
import { JustifyContentAroundComponent } from './justify-content-around/justify-content-around.docs';
import { JustifyContentBetweenComponent } from './justify-content-between/justify-content-between.docs';
import { JustifyContentCenterComponent } from './justify-content-center/justify-content-center.docs';
import { JustifyContentEndComponent } from './justify-content-end/justify-content-end.docs';
import { JustifyContentEvenlyComponent } from './justify-content-evenly/justify-content-evenly.docs';
import { JustifyContentStartComponent } from './justify-content-start/justify-content-start.docs';
import { NoWrapComponent } from './no-wrap/no-wrap.docs';
import { RowReverseComponent } from './row-reverse/row-reverse.docs';
import { RowComponent } from './row/row.docs';
import { Shrink0Component } from './shrink-0/shrink-0.docs';
import { ShrinkComponent } from './shrink/shrink.docs';
import { WrapReverseComponent } from './wrap-reverse/wrap-reverse.docs';
import { WrapComponent } from './wrap/wrap.docs';

@Component({
  imports: [
    CommonModule,
    NovaLibModule,
    NovaSharedModule,
    MarkdownModule,
    VisaMaximizeTiny,
    AlignContentAroundComponent,
    AlignContentCenterComponent,
    AlignContentEndComponent,
    AlignContentEvenlyComponent,
    AlignContentBetweenComponent,
    AlignContentStartComponent,
    AlignItemsBaselineComponent,
    AlignItemsCenterComponent,
    AlignItemsEndComponent,
    AlignItemsStartComponent,
    AlignItemsStretchComponent,
    AlignSelfAutoComponent,
    AlignSelfCenterComponent,
    AlignSelfEndComponent,
    AlignSelfStartComponent,
    AlignSelfStretchComponent,
    ColumnReverseComponent,
    ColumnComponent,
    ContainerComponent,
    Grow0Component,
    GrowComponent,
    InlineContainerComponent,
    JustifyContentAroundComponent,
    JustifyContentBetweenComponent,
    JustifyContentCenterComponent,
    JustifyContentEndComponent,
    JustifyContentEvenlyComponent,
    JustifyContentStartComponent,
    NoWrapComponent,
    RowReverseComponent,
    RowComponent,
    Shrink0Component,
    ShrinkComponent,
    WrapReverseComponent,
    WrapComponent
  ],
  standalone: true,
  selector: 'nova-workshop-flex',
  templateUrl: './flex.docs.html'
})
export class FlexComponent {
  constructor(private workshopService: WorkshopService) {
    this.workshopService.componentName.set('Flex');
    this.workshopService.neededAPI.set([{ name: 'FlexDirective' }, { name: 'SpacingProperties', type: 'constant' }]);
  }
}
