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
/* eslint-disable no-mixed-spaces-and-tabs */
import { computed, Signal, signal, WritableSignal } from '@angular/core';

/**
 * Generates an array from number to from + length
 * @param {number} from
 * @param {number} length
 * @returns {number[]}
 */
export const generateArray = (from: number, length: number): number[] => Array.from({ length }, (_, i) => i + from);

export type PaginationControlOptions = {
  /** Max block length for all blocks, this gets overwritten by `startBlockMaxLength`, `middleBlockMaxLength`, `endBlockMaxLength` */
  blockMaxLength: number;
  /** Forces pages not to paginate */
  compact: boolean;
  /** Default selected page */
  defaultSelected: number;
  /** Default total amount of page */
  defaultTotalPages: number;
  /** What to separate the pagination array up with, usually this delimiter will be replaced with icon or ellipses when shown in the UI */
  delimiter: number | string;
  /** Maximum length of pages to show on the end pagination block, overwrites `blockMaxLength` for end block */
  endBlockMaxLength: number;
  /** Maximum page number to be shown, (default null for no maximum) */
  maxPageNumber: number | null;
  /** Maximum length of pages to show on the middle pagination block, overwrites `blockMaxLength` for middle block */
  middleBlockMaxLength: number;
  /** Signal to be used for selected page, otherwise control will create one */
  selectedPage?: WritableSignal<number> | null;
  /** Maximum length of pages to show on the start pagination block, overwrites `blockMaxLength` for start block */
  startBlockMaxLength: number;
  /** Start from this page */
  startPage: number;
};

const defaultOptions = {
  blockMaxLength: 3,
  compact: false,
  defaultSelected: 1,
  defaultTotalPages: 1,
  delimiter: -1,
  maxPageNumber: null,
  startPage: 1
} satisfies Partial<PaginationControlOptions>;

/**
 * A signals based approach to handling and controlling pagination components. It is very customizable, re-usable, and even allows you to bring your own signal for selected page.
 * @docs {@link https://design.visa.com/angular/components/pagination | See docs}
 */
export class PaginationControl {
  constructor(options?: Partial<PaginationControlOptions>) {
    const blockMaxLength = options?.blockMaxLength ?? defaultOptions.blockMaxLength;
    // If we have a blockMaxLength, we should set it for all block max lengths, then we override it with all the options provided by the user
    this.options = {
      ...defaultOptions,
      endBlockMaxLength: blockMaxLength,
      middleBlockMaxLength: blockMaxLength,
      startBlockMaxLength: blockMaxLength,
      ...options
    } as PaginationControlOptions;
    this.totalPages.set(this.options.defaultTotalPages);
    const defaultStartPage = Math.min(
      Math.max(this.options.defaultSelected, this.options.startPage),
      this.options.defaultTotalPages
    );
    this.selectedPage = this.options.selectedPage ?? signal(defaultStartPage);
    this.selectedPage.set(defaultStartPage);
  }

  /// STATE:

  private readonly options: PaginationControlOptions;

  private readonly selectedPage: WritableSignal<number>;

  public readonly totalPages: WritableSignal<number> = signal<number>(0);

  /// DERIVED STATE:

  /** Can paginate or just show all pages */
  private readonly canPaginate: Signal<boolean> = computed(
    () =>
      this.totalPages() > Math.max(this.options.endBlockMaxLength, this.options.startBlockMaxLength) + 2 && // 1 for end or start number + 1 for single separator show while in start/end blocks
      this.totalPages() > this.options.middleBlockMaxLength + 4 // 2 for start and end numbers + 2 for separators shown while in middle block
  );

  /** Pages to show at the end */
  private readonly endBlock: Signal<number[]> = computed(() =>
    this.isInEndBlock()
      ? generateArray(this.lastPage() - this.options.endBlockMaxLength + 1, this.options.endBlockMaxLength)
      : [this.lastPage()]
  );

  /** Ideal last page without maxPageNumber interfering */
  private readonly idealLastPage: Signal<number> = computed(() => this.totalPages() + this.options.startPage - 1);

  /** Is first element selected */
  public readonly isFirstPage: Signal<boolean> = computed(() => this.selectedPage() === this.options.startPage);

  /** Selected page is in end block */
  private readonly isInEndBlock: Signal<boolean> = computed(
    () => this.selectedPage() > this.lastPage() - this.options.endBlockMaxLength
  );

  /** Selected page is in middle block */
  private readonly isInMiddleBlock: Signal<boolean> = computed(() => !this.isInStartBlock() && !this.isInEndBlock());

  /** Selected page is in start block */
  private readonly isInStartBlock: Signal<boolean> = computed(
    () => this.selectedPage() < this.options.startPage + this.options.startBlockMaxLength
  );

  /** Is last element selected */
  public readonly isLastPage: Signal<boolean> = computed(() => this.selectedPage() === this.lastPage());

  /** Last page */
  private readonly lastPage: Signal<number> = computed(() =>
    this.options.maxPageNumber === null
      ? this.idealLastPage()
      : Math.min(this.options.maxPageNumber, this.idealLastPage())
  );

  /** Pages to show in the middle */
  private readonly middleBlock: Signal<number[]> = computed(() => {
    if (!this.isInMiddleBlock()) return [];
    const middleBlockPadding = Math.floor(this.options.middleBlockMaxLength / 2);
    if (this.selectedPage() - middleBlockPadding <= this.options.startPage)
      return generateArray(
        this.selectedPage() - (this.selectedPage() - this.options.startPage) + 1,
        this.options.middleBlockMaxLength
      );
    if (this.selectedPage() + middleBlockPadding >= this.lastPage())
      return generateArray(
        this.selectedPage() + (this.lastPage() - this.selectedPage()) - this.options.middleBlockMaxLength,
        this.options.middleBlockMaxLength
      );
    return generateArray(this.selectedPage() - middleBlockPadding, this.options.middleBlockMaxLength);
  });

  /** Array of pages arrays to loop over */
  public readonly pages: Signal<(string | number)[]> = computed(() => {
    if (this.options.compact) return this.compactPages;
    return this.canPaginate()
      ? [this.startBlock(), this.middleBlock(), this.endBlock()]
          .map((block) => (block.length ? [...block, this.options.delimiter] : []))
          .flat()
          .slice(0, -1)
      : generateArray(this.options.startPage, this.lastPage() - this.options.startPage + 1);
  });

  /** Pages to show at the start */
  private readonly startBlock: Signal<number[]> = computed(() =>
    this.isInStartBlock()
      ? generateArray(this.options.startPage, this.options.startBlockMaxLength)
      : [this.options.startPage]
  );

  /// UTILITIES:

  /** Getter for selectedPage, we shouldn't directly manipulate the `selectedPage` signal, use `goToPage` to do this safely */
  public get currentPage(): number {
    return this.selectedPage();
  }

  private get compactPages(): number[] {
    const { blockMaxLength } = this.options;

    // Show all pages if we have less than blockMaxLength
    if (blockMaxLength > this.totalPages())
      return generateArray(this.options.startPage, this.lastPage() - this.options.startPage + 1);

    // Show chunk of blockMaxLength pages
    const padding = Math.floor(blockMaxLength / 2);
    if (this.selectedPage() - padding <= this.options.startPage)
      return generateArray(this.options.startPage, blockMaxLength);
    if (this.selectedPage() + padding >= this.lastPage())
      return generateArray(this.lastPage() - blockMaxLength + 1, blockMaxLength);
    return generateArray(this.selectedPage() - padding, blockMaxLength);
  }

  /**
   * Calculates which range of items that is currently visible from pagination
   * @param {number} items - how many items we have
   * @param {number} itemsPerPage - how many items there are, per page
   * @returns to from object with calculated values
   */
  public getToFrom(items: number, itemsPerPage: number) {
    return PaginationControl.getToFrom(items, itemsPerPage, this.selectedPage(), this.options.startPage);
  }

  /** Helper to calculate total pages */
  public getTotalPages = PaginationControl.getTotalPages;

  /** On first page event */
  public goToFirstPage(): void {
    this.goToPage(this.options.startPage);
  }

  /** On last page event */
  public goToLastPage(): void {
    this.goToPage(this.lastPage());
  }

  /** On next page event */
  public goToNextPage(): void {
    this.goToPage(this.selectedPage() + 1);
  }

  /** On page change event */
  public goToPage(pageNumber: number | string): void {
    if (Number.isNaN(+pageNumber)) throw new Error("Can't go to page, invalid number");
    if ((pageNumber as number) > this.lastPage()) this.selectedPage.set(this.lastPage());
    else if ((pageNumber as number) < this.options.startPage) this.selectedPage.set(this.options.startPage);
    else this.selectedPage.set(pageNumber as number);
  }

  /** On previous page event */
  public goToPreviousPage(): void {
    this.goToPage(this.selectedPage() - 1);
  }

  /** Returns if page is current page */
  public isCurrentPage(page: number | string): boolean {
    return page === this.selectedPage();
  }

  /**
   * In the context where total pages is calculated using items per page (much like tables use) we can use this utility to easily adjust the pagination control automatically.
   * NOTE: by default this resets the pagination to the first page when called.
   */
  public resetPageCount(totalItems: number, itemsPerPage: number, autoResetToFirstPage = true): void {
    const totalPages = this.getTotalPages(totalItems, itemsPerPage);
    this.totalPages.set(totalPages);
    if (autoResetToFirstPage) this.goToFirstPage();
  }

  /// STATIC UTILITIES:

  /**
   * Calculates which range of items that is currently visible from pagination
   * @param {number} items - how many items we have
   * @param {number} itemsPerPage - how many items there are, per page
   * @param {number} currentPage - which page is visible
   * @param {number} startPage - which page we're starting from, defaults to page 1 (optional)
   * @returns to from object with calculated values
   */
  public static getToFrom = (items: number, itemsPerPage: number, currentPage: number, startPage: number = 1) => {
    if (itemsPerPage < 1 || items < 1) return { 0: 0, 1: 0, from: 0, to: 0 };
    const normalizedPageNumber = currentPage - startPage + 1;
    const from = Math.max((normalizedPageNumber - 1) * itemsPerPage + 1, 0);
    const to = Math.max(from + itemsPerPage - 1 > items ? items : from + itemsPerPage - 1, 0);
    return { 0: from, 1: to, from, to };
  };

  /**
   * Calculates how many pages there are
   * @param {number} items - how many items we have
   * @param {number} itemsPerPage - how many items there are, per page
   * @returns {number} how many pages there are in total
   */
  public static getTotalPages(items: number, itemsPerPage: number): number {
    return Math.ceil(items / itemsPerPage);
  }
}
