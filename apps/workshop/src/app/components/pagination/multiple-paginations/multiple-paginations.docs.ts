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
import { AfterViewInit, Component, QueryList, Signal, ViewChildren, computed } from '@angular/core';
import { NovaLibModule, PaginationDirective, PaginationService } from '@visa/nova-angular';
import {
  VisaArrowEndTiny,
  VisaArrowStartTiny,
  VisaChevronLeftTiny,
  VisaChevronRightTiny,
  VisaOptionHorizontalTiny
} from '@visa/nova-icons-angular';
/**#custom*/
@Component({
  selector: 'nova-workshop-pagination-with-multiple-paginations',
  templateUrl: './multiple-paginations.docs.html',
  providers: [PaginationService],
  standalone: true,
  imports: [
    CommonModule,
    NovaLibModule,
    VisaArrowStartTiny,
    VisaChevronLeftTiny,
    VisaOptionHorizontalTiny,
    VisaChevronRightTiny,
    VisaArrowEndTiny
  ]
})
export class MultiplePaginationsComponent implements AfterViewInit {
  @ViewChildren(PaginationDirective) pagination: QueryList<PaginationDirective>;

  constructor() {}

  paginationInfo: {
    visiblePages: Signal<number[]>;
    currentPage: number;
    middleLimit: number;
    startEndLimit: number;
    startPage: number;
    totalPages: number;
    lastPage: number;
    isFirst: Signal<boolean>;
    isLast: Signal<boolean>;
    pagesExceedBlockLimit: boolean;
    showStartingEllipses: boolean;
    showEndingEllipses: boolean;
  }[] = [
    {
      visiblePages: computed(() => this.pagination?.first?.paginationService.visiblePages()),
      currentPage: 5,
      middleLimit: 5,
      startEndLimit: 5,
      startPage: 1,
      totalPages: 15,
      lastPage: 15,
      isFirst: computed(() => this.pagination?.first?.paginationService.isFirst()),
      isLast: computed(() => this.pagination?.first?.paginationService.isLast()),
      pagesExceedBlockLimit: true,
      showStartingEllipses: false,
      showEndingEllipses: true
    },
    {
      visiblePages: computed(() => this.pagination?.toArray()[1]?.paginationService.visiblePages()),
      currentPage: 7,
      middleLimit: 3,
      startEndLimit: 4,
      startPage: 1,
      totalPages: 35,
      lastPage: 35,
      isFirst: computed(() => this.pagination?.toArray()[1]?.paginationService.isFirst()),
      isLast: computed(() => this.pagination?.toArray()[1]?.paginationService.isLast()),
      pagesExceedBlockLimit: true,
      showStartingEllipses: true,
      showEndingEllipses: true
    }
  ];

  changePage(page: number, paginationIndex: number) {
    this.paginationInfo[paginationIndex].currentPage = this.pagination
      .toArray()
      [paginationIndex].paginationService.changePage(page);

    this.paginationInfo[paginationIndex].showStartingEllipses =
      this.paginationInfo[paginationIndex].currentPage >=
      this.paginationInfo[paginationIndex].startEndLimit + this.paginationInfo[paginationIndex].startPage;

    this.paginationInfo[paginationIndex].showEndingEllipses =
      this.paginationInfo[paginationIndex].currentPage <=
      this.paginationInfo[paginationIndex].lastPage - this.paginationInfo[paginationIndex].startEndLimit;
  }

  ngAfterViewInit() {
    this.pagination?.forEach((pagination, index) => {
      if (pagination) {
        pagination.paginationService.currentPage = this.paginationInfo[index].currentPage;
        pagination.paginationService.middleLimit = this.paginationInfo[index].middleLimit;
        pagination.paginationService.startEndLimit = this.paginationInfo[index].startEndLimit;
        pagination.paginationService.startPage = this.paginationInfo[index].startPage;
        pagination.paginationService.totalPages = this.paginationInfo[index].totalPages;
        if (this.paginationInfo[index].totalPages <= this.paginationInfo[index].startEndLimit) {
          this.paginationInfo[index].pagesExceedBlockLimit = false;
        }

        this.paginationInfo[index].visiblePages = computed(() =>
          this.pagination?.toArray()[index]?.paginationService.visiblePages()
        );
        this.paginationInfo[index].isFirst = computed(() =>
          this.pagination?.toArray()[index]?.paginationService.isFirst()
        );
        this.paginationInfo[index].isLast = computed(() =>
          this.pagination?.toArray()[index]?.paginationService.isLast()
        );

        pagination.paginationService.initializePages(this.paginationInfo[index].currentPage);
        // since this pagination does not update number of pages, we can get the last page number once
        // alternatively, just set the lastPage variable locally
        this.paginationInfo[index].lastPage = this.pagination?.toArray()[index]?.paginationService.lastPage();
      }
    });
  }
}
