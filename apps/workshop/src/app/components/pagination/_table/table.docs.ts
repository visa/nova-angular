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
import { Component, computed, effect, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  ButtonDirective,
  ButtonDisabledDirective,
  ButtonIconDirective,
  FlexDirective,
  IconToggleComponent,
  IconToggleDefaultTemplateDirective,
  IconToggleRotatedTemplateDirective,
  InputContainerComponent,
  PaginationControl,
  PaginationDirective,
  PaginationOverflowDirective,
  SelectDirective,
  TypographyDirective
} from '@visa/nova-angular';
import {
  VisaArrowEndTiny,
  VisaArrowStartTiny,
  VisaChevronDownTiny,
  VisaChevronLeftTiny,
  VisaChevronRightTiny,
  VisaOptionHorizontalTiny
} from '@visa/nova-icons-angular';

/** @ignore */
@Component({
  selector: 'nova-workshop-pagination-control-table',
  templateUrl: './table.docs.html',
  standalone: true,
  imports: [
    ButtonDirective,
    ButtonDisabledDirective,
    ButtonIconDirective,
    FlexDirective,
    FormsModule,
    IconToggleComponent,
    IconToggleDefaultTemplateDirective,
    IconToggleRotatedTemplateDirective,
    InputContainerComponent,
    PaginationDirective,
    PaginationOverflowDirective,
    SelectDirective,
    TypographyDirective,
    VisaArrowStartTiny,
    VisaChevronDownTiny,
    VisaChevronLeftTiny,
    VisaOptionHorizontalTiny,
    VisaChevronRightTiny,
    VisaArrowEndTiny
  ]
})
export class PaginationControlTableComponent {
  constructor() {
    // Sync selectedPage signal to page control
    this.paginationControl = new PaginationControl({ selectedPage: this.selectedPage });

    // Reset when items per page changes
    effect(
      () => {
        const itemsPerPage = this.itemsPerPage();
        const totalItems = this.totalItems();
        this.paginationControl.resetPageCount(totalItems, itemsPerPage);
      },
      { allowSignalWrites: true }
    );
  }

  readonly itemsPerPage = signal(10);
  readonly itemsPerPageOptions = signal([5, 10, 15, 20]);
  readonly paginationControl: PaginationControl;
  readonly selectedPage = signal<number>(1);
  readonly totalItems = signal(100);
  readonly toFrom = computed(() => this.paginationControl.getToFrom(this.totalItems(), this.itemsPerPage()));

  handleItemsPerPageChange(value: number | string) {
    this.itemsPerPage.set(+value);
  }
}
