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
import { PaginationService } from './pagination.service';

describe('PaginationService', () => {
  let service: PaginationService;

  beforeEach(() => {
    service = new PaginationService();
    service.totalPages = 20;
    service.isFirst.set(false);
    service.isLast.set(false);
    service.initializePages(1);
  });

  it('should initialize pages correctly', () => {
    expect(service.currentPage).toBe(1);
    expect(service.isFirst()).toBe(true);
    expect(service.isLast()).toBe(false);
    expect(service.visiblePages()).toStrictEqual([2, 3, 4, 5, 6, 7]);
  });

  it('should change pages correctly', () => {
    service.changePage(0);
    expect(service.currentPage).toBe(1);

    service.changePage(1);
    expect(service.currentPage).toBe(1);
    expect(service.isFirst()).toBe(true);
    expect(service.isLast()).toBe(false);

    service.changePage(20);
    expect(service.currentPage).toBe(20);
    expect(service.isFirst()).toBe(false);
    expect(service.isLast()).toBe(true);
  });

  describe('set pages', () => {
    it('should set start block correctly', () => {
      service.changePage(3);
      // show first 7 pages (first page is always visible)
      expect(service.visiblePages()).toStrictEqual([2, 3, 4, 5, 6, 7]);
    });

    it('should set end block correctly', () => {
      service.changePage(18);
      // show last 7 pages (last page is always visible)
      expect(service.visiblePages()).toStrictEqual([14, 15, 16, 17, 18, 19]);
    });

    it('should set middle block correctly', () => {
      service.changePage(10);
      // show 5 pages surrounding middle page
      expect(service.visiblePages()).toStrictEqual([8, 9, 10, 11, 12]);
    });

    it('should set visible pages correctly if total pages is less than middle limit', () => {
      service.totalPages = 5;
      service.initializePages(1);
      // should show all pages
      expect(service.visiblePages()).toStrictEqual([2, 3, 4]);
    });

    it('should set visible pages correctly if total pages is less than start end limit', () => {
      service.totalPages = 3;
      service.initializePages(1);
      expect(service.visiblePages()).toStrictEqual([2]);
    });

    it('should set visible pages correctly if total pages is less than middle limit and start end limit', () => {
      service.totalPages = 3;
      service.initializePages(1);
      expect(service.visiblePages()).toStrictEqual([2]);
    });
  });
});
