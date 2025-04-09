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
import { AfterViewInit, Component, ViewChild, computed } from '@angular/core';
import { NovaLibModule, PaginationDirective, PaginationService } from '@visa/nova-angular';
import {
  VisaArrowEndTiny,
  VisaArrowStartTiny,
  VisaChevronLeftTiny,
  VisaChevronRightTiny,
  VisaOptionHorizontalTiny
} from '@visa/nova-icons-angular';
@Component({
  selector: 'nova-workshop-pagination-default-first-page',
  templateUrl: './default-first-page.docs.html',
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
export class PaginationDefaultFirstPageComponent implements AfterViewInit {
  @ViewChild(PaginationDirective) pagination: PaginationDirective;

  constructor() {}

  //SET YOUR OWN VARIABLES HERE
  currentPage: number = 1;
  middleLimit: number = 5;
  startEndLimit: number = 5;
  startPage: number = 1;
  totalPages: number = 100;
  lastPage = this.totalPages + this.startPage - 1;
  visiblePages = computed(() => this.pagination?.paginationService.visiblePages());
  isFirst = computed(() => this.pagination?.paginationService.isFirst());
  isLast = computed(() => this.pagination?.paginationService.isLast());
  pagesExceedBlockLimit = true;
  showStartingEllipses: boolean = false;
  showEndingEllipses: boolean = true;

  changePage(page: number) {
    this.currentPage = this.pagination.paginationService.changePage(page);
    this.showStartingEllipses = this.currentPage >= this.startEndLimit + this.startPage;
    this.showEndingEllipses = this.currentPage <= this.lastPage - this.startEndLimit;
  }

  ngAfterViewInit() {
    if (this.pagination) {
      this.pagination.paginationService.currentPage = this.currentPage;
      this.pagination.paginationService.middleLimit = this.middleLimit;
      this.pagination.paginationService.startEndLimit = this.startEndLimit;
      this.pagination.paginationService.startPage = this.startPage;
      this.pagination.paginationService.totalPages = this.totalPages;
      if (this.totalPages <= this.startEndLimit) {
        this.pagesExceedBlockLimit = false;
      }

      this.visiblePages = computed(() => this.pagination.paginationService.visiblePages());
      this.isFirst = computed(() => this.pagination.paginationService.isFirst());
      this.isLast = computed(() => this.pagination.paginationService.isLast());

      this.pagination.paginationService.initializePages(this.currentPage);
    }
  }
}
