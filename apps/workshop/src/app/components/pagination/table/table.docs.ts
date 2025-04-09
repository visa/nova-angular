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
import { AfterViewInit, Component, computed, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ComboboxService, NovaLibModule, PaginationDirective, PaginationService } from '@visa/nova-angular';
import {
  VisaArrowEndTiny,
  VisaArrowStartTiny,
  VisaChevronDownTiny,
  VisaChevronLeftTiny,
  VisaChevronRightTiny,
  VisaOptionHorizontalTiny
} from '@visa/nova-icons-angular';

/**#custom */
@Component({
  selector: 'nova-workshop-pagination-table',
  templateUrl: './table.docs.html',
  providers: [ComboboxService, PaginationService],
  standalone: true,
  imports: [
    CommonModule,
    NovaLibModule,
    ReactiveFormsModule,
    VisaArrowStartTiny,
    VisaChevronDownTiny,
    VisaChevronLeftTiny,
    VisaOptionHorizontalTiny,
    VisaChevronRightTiny,
    VisaArrowEndTiny
  ]
})
export class PaginationTableComponent implements AfterViewInit {
  @ViewChild(PaginationDirective) pagination: PaginationDirective;
  selectFormControl = new FormControl('10');

  constructor() {}

  public numberOfTableItems = [
    {
      label: '5 items',
      value: 5
    },
    {
      label: '10 items',
      value: 10
    },
    {
      label: '15 items',
      value: 15
    },
    {
      label: '20 items',
      value: 20
    }
  ];

  rowData: Array<any> = [];
  colData = ['Catergory', 'Name', 'Type'];
  comboboxValue = '5';
  visiblePages = computed(() => this.pagination?.paginationService.visiblePages());
  //SET YOUR OWN VARIABLES HERE
  currentPage: number = 5;
  middleLimit: number = 5;
  startEndLimit: number = 5;
  startPage: number = 1;
  isFirst = computed(() => this.pagination?.paginationService.isFirst());
  isLast = computed(() => this.pagination?.paginationService.isLast());
  pagesExceedBlockLimit = true;
  dataLength = 100;
  resultsPerPage = 10;
  resultsEndIndex =
    this.dataLength < this.resultsPerPage * this.currentPage ? this.dataLength : this.resultsPerPage * this.currentPage;
  resultsStartIndex = this.resultsPerPage * (this.currentPage - 1) + 1;
  totalPages: number = Math.ceil(this.dataLength / this.resultsPerPage);
  lastPage = computed(() => this.pagination?.paginationService.lastPage());
  showStartingEllipses: boolean = false;
  showEndingEllipses: boolean = true;

  ngAfterViewInit() {
    if (this.pagination) {
      this.pagination.paginationService.currentPage = this.currentPage;
      this.pagination.paginationService.middleLimit = this.middleLimit;
      this.pagination.paginationService.startEndLimit = this.startEndLimit;
      this.pagination.paginationService.startPage = this.startPage;
      this.pagination.paginationService.totalPages = this.totalPages;

      this.pagination.paginationService.initializePages(this.currentPage);

      this.visiblePages = computed(() => this.pagination.paginationService.visiblePages());
      this.isFirst = computed(() => this.pagination.paginationService.isFirst());
      this.isLast = computed(() => this.pagination.paginationService.isLast());
      this.lastPage = computed(() => this.pagination.paginationService.lastPage());
    }

    this.checkBlockLimit();
  }

  changePage(page: number) {
    this.currentPage = this.pagination.paginationService.changePage(page);
    this.resultsStartIndex = this.resultsPerPage * (this.currentPage - 1) + 1;
    this.resultsEndIndex =
      this.dataLength < this.resultsPerPage * this.currentPage
        ? this.dataLength
        : this.resultsPerPage * this.currentPage;

    this.checkBlockLimit();

    this.showStartingEllipses = this.currentPage >= this.startEndLimit + this.startPage;
    this.showEndingEllipses = this.currentPage <= this.lastPage() - this.startEndLimit;
  }

  changePageSize(resultsPerPage: any) {
    resultsPerPage = <number>resultsPerPage.target.value;
    this.totalPages = Math.ceil(this.dataLength / resultsPerPage);
    this.resultsPerPage = resultsPerPage;
    this.pagination.paginationService.totalPages = this.totalPages;

    this.pagination.paginationService.initializePages(this.currentPage);

    //ensures that if user is on a page that no longer exists after page reselection, it goes to the last available page
    this.changePage(this.startPage);
  }

  checkBlockLimit() {
    //Ensures that if totalPages is too small to have an overflow, it removes it entirely.
    if (this.totalPages <= this.startEndLimit + this.middleLimit - 1) {
      this.pagesExceedBlockLimit = false;
      this.pagination.paginationService.visiblePages.set(this.pagination.paginationService.pageItems);
    } else {
      this.pagesExceedBlockLimit = true;
    }
  }
}
