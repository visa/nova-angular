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
import { CompactPaddingBandedRowsTableComponent } from './compact-padding-banded-rows/compact-padding-banded-rows.docs';
import { FixedFirstColumnComponent } from './fixed-first-column/fixed-first-column.docs';
import { GroupHeadersWithEmptyCellTableComponent } from './group-headers-with-empty-cell/group-headers-with-empty-cell.docs';
import { GroupHeadersTableComponent } from './group-headers/group-headers.docs';
import { KeyValueTableBandedTableComponent } from './key-value-table-banded/key-value-table-banded.docs';
import { KeyValueTableLinedTableComponent } from './key-value-table-lined/key-value-table-lined.docs';
import { LargePaddingBandedRowsTableComponent } from './large-padding-banded-rows/large-padding-banded-rows.docs';
import { LinedRowsTableComponent } from './lined-rows/lined-rows.docs';
import { MediumPaddingBandedRowsTableComponent } from './medium-padding-banded-rows/medium-padding-banded-rows.docs';
import { OuterBorderColumnAndRowDividersTableComponent } from './outer-border-column-and-row-dividers/outer-border-column-and-row-dividers.docs';
import { OuterBorderSubtleHeadersTableComponent } from './outer-border-subtle-headers/outer-border-subtle-headers.docs';
import { ScrollTableComponent } from './scroll/scroll.docs';
import { VisaInformationLow } from '@visa/nova-icons-angular';
import { TableKeyboardScrollMessageComponent } from '../../shared/app-components/dev-messages/table-keyboard-scroll/table-keyboard-scroll.docs';

@Component({
  imports: [
    CommonModule,
    NovaLibModule,
    NovaSharedModule,
    LargePaddingBandedRowsTableComponent,
    MediumPaddingBandedRowsTableComponent,
    CompactPaddingBandedRowsTableComponent,
    LinedRowsTableComponent,
    OuterBorderColumnAndRowDividersTableComponent,
    OuterBorderSubtleHeadersTableComponent,
    ScrollTableComponent,
    GroupHeadersTableComponent,
    GroupHeadersWithEmptyCellTableComponent,
    KeyValueTableBandedTableComponent,
    KeyValueTableLinedTableComponent,
    TableKeyboardScrollMessageComponent,
    FixedFirstColumnComponent
  ],
  standalone: true,
  selector: 'vds-docs-nova-table',
  templateUrl: './table.docs.html'
})
export class TableDocsComponent {
  constructor(public workshopService: WorkshopService) {
    this.workshopService.componentName.set('Table');
    this.workshopService.neededAPI.set([
      { name: 'TableWrapperDirective' },
      { name: 'TableDirective' },
      { name: 'TbodyDirective' },
      { name: 'TdDirective' },
      { name: 'ThDirective' },
      { name: 'TrDirective' },
      { name: 'TableSize', type: APITypes.CONSTANT }
    ]);
  }

  ngAfterViewInit(): void {
    this.workshopService.isLoadingExamples.set(false);
  }

  ngOnInit(): void {
    this.workshopService.isLoadingExamples.set(true);
  }
}
