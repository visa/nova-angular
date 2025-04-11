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
import { Injectable } from '@angular/core';

import { generateArray, PaginationControl } from './pagination.control';

describe('generateArray', () => {
  it('should generate array from 0 to 4', () => {
    const result = generateArray(0, 5);
    expect(result).toEqual([0, 1, 2, 3, 4]);
  });
  it('should generate array from 9 to 14', () => {
    const result = generateArray(9, 6);
    expect(result).toEqual([9, 10, 11, 12, 13, 14]);
  });
});

// We need this because signals have to be inside a "injectable" context (component, directive, service, etc)
@Injectable({ providedIn: 'root' })
class TestPaginationService {
  public paginationControl = new PaginationControl();
}

describe('PaginationControl', () => {
  let service: TestPaginationService;

  beforeEach(() => {
    service = new TestPaginationService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    expect(service.paginationControl).toBeDefined();
  });

  describe('getTotalPages', () => {
    it('should correctly calculate pages with perfect items length', () => {
      const result = PaginationControl.getTotalPages(100, 10);
      expect(result).toBe(10);
    });
    it('should correctly calculate pages with overflow items length', () => {
      const result = PaginationControl.getTotalPages(101, 10);
      expect(result).toBe(11);
    });
  });

  describe('getToFrom', () => {
    it('should correctly to/from all zeros', () => {
      const result = PaginationControl.getToFrom(0, 0, 0, 0);
      expect(result.to).toEqual(0);
      expect(result.from).toEqual(0);
    });
    it('should correctly to/from on page zero', () => {
      const result = PaginationControl.getToFrom(100, 10, 0, 0);
      expect(result.from).toEqual(1);
      expect(result.to).toEqual(10);
    });

    it('should correctly to/from with firstPage 1000', () => {
      const result = PaginationControl.getToFrom(100, 10, 100, 99);
      expect(result.from).toEqual(11);
      expect(result.to).toEqual(20);
    });
    it('should correctly to/from on first page', () => {
      const result = PaginationControl.getToFrom(100, 10, 1);
      expect(result.from).toBe(1);
      expect(result.to).toBe(10);
    });
    it('should correctly to/from on middle page', () => {
      const result = PaginationControl.getToFrom(100, 10, 5);
      expect(result.from).toBe(41);
      expect(result.to).toBe(50);
    });
    it('should correctly to/from on last page', () => {
      const result = PaginationControl.getToFrom(100, 10, 10);
      expect(result.from).toBe(91);
      expect(result.to).toBe(100);
    });

    it('should correctly to/from on with last page overflow', () => {
      const result = PaginationControl.getToFrom(101, 10, 11);
      expect(result.from).toBe(101);
      expect(result.to).toBe(101);
    });
  });

  describe('props', () => {
    it('should have proper results with default props', () => {
      service.paginationControl = new PaginationControl({ defaultTotalPages: 10 });
      expect(service.paginationControl.isFirstPage()).toBe(true);
      expect(service.paginationControl.isLastPage()).toBe(false);
      expect(service.paginationControl.pages()).toEqual([1, 2, 3, -1, 10]);
    });
    it('should allow for custom delimiter', () => {
      service.paginationControl = new PaginationControl({ defaultTotalPages: 10, delimiter: '*' });
      expect(service.paginationControl.pages()).toEqual([1, 2, 3, '*', 10]);
    });
    it('should allow for custom startBlockMaxLength', () => {
      service.paginationControl = new PaginationControl({ startBlockMaxLength: 2, defaultTotalPages: 10 });
      expect(service.paginationControl.pages()).toEqual([1, 2, -1, 10]);
    });
    it('should allow for custom middleBlockMaxLength', () => {
      service.paginationControl = new PaginationControl({
        defaultSelected: 5,
        middleBlockMaxLength: 2,
        defaultTotalPages: 10
      });
      expect(service.paginationControl.pages()).toEqual([1, -1, 4, 5, -1, 10]);
    });
    it('should allow for custom endBlockMaxLength', () => {
      service.paginationControl = new PaginationControl({
        defaultSelected: 9,
        endBlockMaxLength: 2,
        defaultTotalPages: 10
      });
      expect(service.paginationControl.pages()).toEqual([1, -1, 9, 10]);
    });
    it('should allow for endBlockMaxLength to overwrite blockMaxLength', () => {
      service.paginationControl = new PaginationControl({
        blockMaxLength: 3,
        defaultSelected: 9,
        endBlockMaxLength: 2,
        defaultTotalPages: 10
      });
      expect(service.paginationControl.pages()).toEqual([1, -1, 9, 10]);
    });
    it('should allow for custom blockMaxLength', () => {
      service.paginationControl = new PaginationControl({
        defaultSelected: 1,
        blockMaxLength: 2,
        defaultTotalPages: 10
      });
      expect(service.paginationControl.pages()).toEqual([1, 2, -1, 10]);
      service.paginationControl.goToPage(3);
      expect(service.paginationControl.pages()).toEqual([1, -1, 2, 3, -1, 10]);
      service.paginationControl.goToPage(9);
      expect(service.paginationControl.pages()).toEqual([1, -1, 9, 10]);
    });
    it('should render correctly if minPageNumber is larger than defaultSelected', () => {
      service.paginationControl = new PaginationControl({ defaultSelected: 1, startPage: 3, defaultTotalPages: 10 });
      expect(service.paginationControl.currentPage).toEqual(3);
    });
    it('should render correctly with zero pages', () => {
      service.paginationControl = new PaginationControl({ defaultTotalPages: 0 });
      expect(service.paginationControl.currentPage).toEqual(0);
    });
  });

  describe('events', () => {
    describe('onFirstPage', () => {
      it('should navigate to first page', () => {
        service.paginationControl = new PaginationControl({ defaultSelected: 8, defaultTotalPages: 10 });
        service.paginationControl.goToFirstPage();
        expect(service.paginationControl.currentPage).toEqual(1);
      });
    });
    describe('onLastPage', () => {
      it('should navigate to first page', () => {
        service.paginationControl = new PaginationControl({ defaultSelected: 8, defaultTotalPages: 10 });
        service.paginationControl.goToLastPage();
        expect(service.paginationControl.currentPage).toEqual(10);
      });
    });
    describe('onNextPage', () => {
      it('should navigate to next page with default props', () => {
        service.paginationControl = new PaginationControl({ defaultTotalPages: 10 });
        service.paginationControl.goToNextPage();
        expect(service.paginationControl.currentPage).toEqual(2);
      });
      it("shouldn't navigate to next page when on last page", () => {
        service.paginationControl = new PaginationControl({ defaultSelected: 10, defaultTotalPages: 10 });
        service.paginationControl.goToNextPage();
        expect(service.paginationControl.currentPage).toEqual(10);
      });
    });
    describe('onPreviousPage', () => {
      it("shouldn't navigate to prev page with default props", () => {
        service.paginationControl = new PaginationControl({ defaultTotalPages: 10 });
        service.paginationControl.goToPreviousPage();
        expect(service.paginationControl.currentPage).toEqual(1);
      });
      it('should navigate to prev page with default props', () => {
        service.paginationControl = new PaginationControl({ defaultSelected: 5, defaultTotalPages: 10 });
        service.paginationControl.goToPreviousPage();
        expect(service.paginationControl.currentPage).toEqual(4);
      });
      it("shouldn't navigate to prev page when on first page", () => {
        service.paginationControl = new PaginationControl({ defaultSelected: 1, defaultTotalPages: 10 });
        service.paginationControl.goToPreviousPage();
        expect(service.paginationControl.currentPage).toEqual(1);
      });
    });
    describe('onPageChange', () => {
      it('should navigate to page when possible', () => {
        service.paginationControl = new PaginationControl({ defaultTotalPages: 10 });
        service.paginationControl.goToPage(5);
        expect(service.paginationControl.currentPage).toEqual(5);
      });
      it("shouldn't navigate to page when larger than total pages", () => {
        service.paginationControl = new PaginationControl({ defaultTotalPages: 10 });
        service.paginationControl.goToPage(11);
        expect(service.paginationControl.currentPage).toEqual(10);
      });
      it("shouldn't navigate to page when less than first page", () => {
        service.paginationControl = new PaginationControl({ defaultTotalPages: 10 });
        service.paginationControl.goToPage(0);
        expect(service.paginationControl.currentPage).toEqual(1);
      });

      it('should throw error when page is not a number', () => {
        service.paginationControl = new PaginationControl({ defaultTotalPages: 10 });
        expect(() => service.paginationControl.goToPage('a')).toThrow();
      });
    });

    describe('resetPageCount', () => {
      it('should reset page count', () => {
        service.paginationControl = new PaginationControl({ defaultTotalPages: 10 });
        service.paginationControl.goToLastPage();
        service.paginationControl.resetPageCount(10, 1);
        expect(service.paginationControl.currentPage).toEqual(1);
      });
      it('should reset page count with accurate total pages, then go to the first page', () => {
        service.paginationControl = new PaginationControl({ defaultTotalPages: 2 });
        service.paginationControl.goToLastPage();
        service.paginationControl.resetPageCount(100, 10);
        expect(service.paginationControl.totalPages()).toEqual(10);
        expect(service.paginationControl.currentPage).toEqual(1);
      });
      it('should reset page count with accurate total pages, then not go to the first page', () => {
        service.paginationControl = new PaginationControl({ defaultTotalPages: 2 });
        service.paginationControl.goToLastPage();
        service.paginationControl.resetPageCount(100, 10, false);
        expect(service.paginationControl.totalPages()).toEqual(10);
        expect(service.paginationControl.currentPage).toEqual(2);
      });
    });
  });

  describe('derived state', () => {
    describe('getToFrom', () => {
      it('should correctly to/from all zeros', () => {
        service.paginationControl = new PaginationControl({ defaultSelected: 0, defaultTotalPages: 0 });
        const result = service.paginationControl.getToFrom(0, 0);
        expect(result.to).toEqual(0);
        expect(result.from).toEqual(0);
      });
      it('should correctly to/from on page zero', () => {
        service.paginationControl = new PaginationControl({ defaultSelected: 0, defaultTotalPages: 10 });
        const result = service.paginationControl.getToFrom(0, 0);
        expect(result.from).toEqual(0);
        expect(result.to).toEqual(0);
      });
    });
    describe('isCurrentPage', () => {
      it('should be true if is current page', () => {
        service.paginationControl = new PaginationControl({ defaultSelected: 5, defaultTotalPages: 10 });
        expect(service.paginationControl.isCurrentPage(5)).toBe(true);
      });
      it('should be false if is not current page', () => {
        service.paginationControl = new PaginationControl({ defaultSelected: 5, defaultTotalPages: 10 });
        expect(service.paginationControl.isCurrentPage(6)).toBe(false);
      });
    });
    describe('isFirst', () => {
      it('should be true if first page selected', () => {
        service.paginationControl = new PaginationControl({ defaultTotalPages: 10 });
        expect(service.paginationControl.isFirstPage()).toBe(true);
      });
      it('should be false if last page selected', () => {
        service.paginationControl = new PaginationControl({ defaultSelected: 10, defaultTotalPages: 10 });
        expect(service.paginationControl.isFirstPage()).toBe(false);
      });
    });
    describe('isLast', () => {
      it('should be true if first page selected', () => {
        service.paginationControl = new PaginationControl({ defaultSelected: 10, defaultTotalPages: 10 });
        expect(service.paginationControl.isLastPage()).toBe(true);
      });
      it('should be false if first page selected', () => {
        service.paginationControl = new PaginationControl({ defaultTotalPages: 10 });
        expect(service.paginationControl.isLastPage()).toBe(false);
      });
    });
    describe('pages', () => {
      it('should show all pages if not enough pages', () => {
        service.paginationControl = new PaginationControl({ defaultTotalPages: 3 });
        expect(service.paginationControl.pages()).toEqual([1, 2, 3]);
      });
      it('should show all pages if just enough pages', () => {
        service.paginationControl = new PaginationControl({ defaultTotalPages: 5 });
        expect(service.paginationControl.pages()).toEqual([1, 2, 3, 4, 5]);
      });
      it('should paginate if just enough pages', () => {
        service.paginationControl = new PaginationControl({ defaultTotalPages: 8 });
        expect(service.paginationControl.pages()).toEqual([1, 2, 3, -1, 8]);
      });
      it('should be in first block if first page selected', () => {
        service.paginationControl = new PaginationControl({ defaultTotalPages: 8 });
        expect(service.paginationControl.pages()).toEqual([1, 2, 3, -1, 8]);
      });
      it('should be in first block if third page selected', () => {
        service.paginationControl = new PaginationControl({ defaultTotalPages: 8, defaultSelected: 3 });
        expect(service.paginationControl.pages()).toEqual([1, 2, 3, -1, 8]);
      });

      it('should be in middle block if fourth page selected', () => {
        service.paginationControl = new PaginationControl({ defaultSelected: 4, defaultTotalPages: 8 });
        expect(service.paginationControl.pages()).toEqual([1, -1, 3, 4, 5, -1, 8]);
      });
      it('should be in middle block if 5th page selected', () => {
        service.paginationControl = new PaginationControl({ defaultSelected: 5, defaultTotalPages: 8 });
        expect(service.paginationControl.pages()).toEqual([1, -1, 4, 5, 6, -1, 8]);
      });
      it('should be in last block if 6th page selected', () => {
        service.paginationControl = new PaginationControl({ defaultSelected: 6, defaultTotalPages: 8 });
        expect(service.paginationControl.pages()).toEqual([1, -1, 6, 7, 8]);
      });
      it('should be in last block if last page selected', () => {
        service.paginationControl = new PaginationControl({ defaultSelected: 8, defaultTotalPages: 8 });
        expect(service.paginationControl.pages()).toEqual([1, -1, 6, 7, 8]);
      });

      it('should be offset by min page number', () => {
        service.paginationControl = new PaginationControl({ startPage: 20, defaultTotalPages: 11 });
        expect(service.paginationControl.pages()).toEqual([20, 21, 22, -1, 30]);
      });

      it('should be offset by min page number, allowing for max page number', () => {
        service.paginationControl = new PaginationControl({ maxPageNumber: 30, startPage: 20, defaultTotalPages: 100 });
        expect(service.paginationControl.pages()).toEqual([20, 21, 22, -1, 30]);
      });
      it('should show one page', () => {
        service.paginationControl = new PaginationControl({ defaultTotalPages: 1 });
        expect(service.paginationControl.pages()).toEqual([1]);
      });
      it('should show no pages', () => {
        service.paginationControl = new PaginationControl({ defaultTotalPages: 0 });
        expect(service.paginationControl.pages()).toEqual([]);
      });
      it('should show middle range pages within bounds of last page', () => {
        service.paginationControl = new PaginationControl({
          defaultSelected: 9,
          middleBlockMaxLength: 5,
          startBlockMaxLength: 1,
          endBlockMaxLength: 1,
          defaultTotalPages: 10
        });
        expect(service.paginationControl.pages()).toEqual([1, -1, 5, 6, 7, 8, 9, -1, 10]);
      });
      it('should show middle range pages within bounds of last page, with second from last middle index', () => {
        service.paginationControl = new PaginationControl({
          defaultSelected: 8,
          middleBlockMaxLength: 5,
          startBlockMaxLength: 1,
          endBlockMaxLength: 1,
          defaultTotalPages: 10
        });
        expect(service.paginationControl.pages()).toEqual([1, -1, 5, 6, 7, 8, 9, -1, 10]);
      });

      it('should show middle range pages within bounds of last page', () => {
        service.paginationControl = new PaginationControl({
          defaultSelected: 2,
          middleBlockMaxLength: 5,
          startBlockMaxLength: 1,
          endBlockMaxLength: 1,
          defaultTotalPages: 10
        });
        expect(service.paginationControl.pages()).toEqual([1, -1, 2, 3, 4, 5, 6, -1, 10]);
      });
      it('should show middle range pages within bounds of last page, with second selected middle index', () => {
        service.paginationControl = new PaginationControl({
          defaultSelected: 3,
          middleBlockMaxLength: 5,
          startBlockMaxLength: 1,
          endBlockMaxLength: 1,
          defaultTotalPages: 10
        });
        expect(service.paginationControl.pages()).toEqual([1, -1, 2, 3, 4, 5, 6, -1, 10]);
      });
    });
  });

  describe('compact', () => {
    it('should navigate correctly', () => {
      service.paginationControl = new PaginationControl({
        compact: true,
        defaultTotalPages: 10,
        blockMaxLength: 5
      });
      expect(service.paginationControl.pages()).toEqual([1, 2, 3, 4, 5]);
      service.paginationControl.goToPreviousPage();
      expect(service.paginationControl.pages()).toEqual([1, 2, 3, 4, 5]);

      service.paginationControl.goToNextPage();
      expect(service.paginationControl.pages()).toEqual([1, 2, 3, 4, 5]);

      service.paginationControl.goToPage(4);
      expect(service.paginationControl.pages()).toEqual([2, 3, 4, 5, 6]);

      service.paginationControl.goToPage(8);
      expect(service.paginationControl.pages()).toEqual([6, 7, 8, 9, 10]);

      service.paginationControl.goToPage(10);
      expect(service.paginationControl.pages()).toEqual([6, 7, 8, 9, 10]);
    });

    it('should default navigate correctly', () => {
      service.paginationControl = new PaginationControl({
        compact: true,
        defaultTotalPages: 10
      });
      expect(service.paginationControl.pages()).toEqual([1, 2, 3]);
      service.paginationControl.goToPreviousPage();
      expect(service.paginationControl.pages()).toEqual([1, 2, 3]);

      service.paginationControl.goToNextPage();
      expect(service.paginationControl.pages()).toEqual([1, 2, 3]);

      service.paginationControl.goToPage(4);
      expect(service.paginationControl.pages()).toEqual([3, 4, 5]);

      service.paginationControl.goToPage(8);
      expect(service.paginationControl.pages()).toEqual([7, 8, 9]);

      service.paginationControl.goToPage(10);
      expect(service.paginationControl.pages()).toEqual([8, 9, 10]);
    });

    it('should navigate single block correctly', () => {
      service.paginationControl = new PaginationControl({
        blockMaxLength: 1,
        compact: true,
        defaultTotalPages: 10
      });
      expect(service.paginationControl.pages()).toEqual([1]);
      service.paginationControl.goToPreviousPage();
      expect(service.paginationControl.pages()).toEqual([1]);

      service.paginationControl.goToNextPage();
      expect(service.paginationControl.pages()).toEqual([2]);

      service.paginationControl.goToPage(4);
      expect(service.paginationControl.pages()).toEqual([4]);

      service.paginationControl.goToPage(8);
      expect(service.paginationControl.pages()).toEqual([8]);

      service.paginationControl.goToPage(10);
      expect(service.paginationControl.pages()).toEqual([10]);
    });

    it('should should show all pages if page count is less than blockMaxSize', () => {
      service.paginationControl = new PaginationControl({
        blockMaxLength: 4,
        compact: true,
        defaultTotalPages: 3
      });
      expect(service.paginationControl.pages()).toEqual([1, 2, 3]);
    });
  });
});
