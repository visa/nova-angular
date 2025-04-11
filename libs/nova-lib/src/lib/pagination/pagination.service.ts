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
import { Injectable, WritableSignal, signal } from '@angular/core';

/**
 * Service to create pagination behavior. Intended for use with pagination component.
 */
@Injectable({
  providedIn: 'root'
})
export class PaginationService {
  constructor() {}
  /**
   * Array of page numbers.
   */
  pageItems: number[] = <number[]>[];
  /**
   * Array of visible page numbers, set by <code>setPages()</code>.
   */
  visiblePages: WritableSignal<number[]> = signal<number[]>([]);
  /**
   * Current page number, set by <code>changePage()</code>.
   */
  currentPage: number = 1;
  /**
   * Number of pages to show in the middle section of the pagination, between ellipses.
   */
  middleLimit: number = 5;
  /**
   * Number of pages to show at the start and end of the pagination, before and after ellipses.
   */
  startEndLimit: number = 7;
  /**
   * First page number to start pagination with.
   */
  startPage: number = 1;
  /**
   * Total number of pages.
   */
  totalPages: number = 1;
  /**
   * Last page number, calculated as (this.totalPages + this.startPage - 1).
   */
  lastPage: WritableSignal<number> = signal(this.totalPages);
  /**
   * Signal to indicate if current page is the first page.
   */
  isFirst: WritableSignal<boolean> = signal<boolean>(false);
  /**
   * Signal to indicate if current page is the last page.
   */
  isLast: WritableSignal<boolean> = signal<boolean>(false);

  /**
   * The range method creates an array containing a sequence of numbers within a specified range, typically used for generating page numbers in pagination.
   * @param start Starting number of range.
   * @param size Size of array to return.
   * @returns Array with numbers from start to start + size.
   */
  range(start: number, size: number) {
    return [...Array(size).keys()].map((el) => el + start);
  }

  /**
   * The setPages method sets the visible page block based on the current page, ensuring that the correct sequence of pages is displayed.
   */
  setPages() {
    if (this.currentPage < this.startEndLimit + this.startPage) {
      if (this.totalPages <= this.startEndLimit) {
        // sets the visible pages if total pages is less than the middle limit (removes start and end page)
        this.visiblePages.set(this.pageItems.slice(1, this.totalPages - 1));
      } else {
        //sets the start block if current page is in the start limit
        this.visiblePages.set(this.pageItems.slice(1, this.startEndLimit));
      }
    }
    //sets the end block if current page is in the end limit
    else if (this.currentPage > this.pageItems[this.pageItems.length - 1] - this.startEndLimit) {
      this.visiblePages.set(this.pageItems.slice(-this.startEndLimit, -1));
    } else {
      if (this.totalPages <= this.middleLimit) {
        // sets the visible pages if total pages is less than the middle limit (removes start and end blocks)
        this.visiblePages.set(this.pageItems.slice(1, this.totalPages - 1));
      } else {
        //sets the middle block if current page is in the middle limit
        const startIndex = this.currentPage - Math.floor(this.middleLimit / 2) - this.startPage;
        const endIndex = this.currentPage + Math.floor(this.middleLimit / 2) - this.startPage;
        this.visiblePages.set(this.pageItems.slice(startIndex, endIndex + 1));
      }
    }
  }

  /**
   * The changepage method sets the currentPage to the specified page and updates the visible pages, resetting to the starting page if the specified currentPage is out of the valid range.
   * @param page Number to set as new current page.
   * @returns New current page.
   */
  changePage(page: number) {
    if (page == 0 || page > this.lastPage()) {
      return (this.currentPage = this.startPage);
    } else {
      this.currentPage = page;
      this.isFirst.set(this.currentPage === this.startPage);
      this.isLast.set(this.currentPage === this.lastPage());

      this.setPages();
    }
    return this.currentPage;
  }

  /**
   * The initializePages method sets variables and visible pages for pagination. It should be called during initialization and will use default values unless values are set beforehand by assigning them directly to <code>PaginationService.variableName</code>.
   * @param currentPage Current starting page to initialize pagination with.
   */
  initializePages(currentPage: number) {
    this.currentPage = currentPage;
    this.pageItems = this.range(this.startPage, this.totalPages);
    this.isFirst.set(currentPage === this.startPage);
    this.lastPage.set(this.totalPages + this.startPage - 1);
    this.isLast.set(currentPage === this.lastPage());
    this.setPages();
  }
}
