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
import { BreakpointType, NovaLibModule, PaginationService } from '@visa/nova-angular';
import {
  VisaArrowEndTiny,
  VisaArrowStartTiny,
  VisaChevronLeftTiny,
  VisaChevronRightTiny,
  VisaOptionHorizontalTiny
} from '@visa/nova-icons-angular';
/** @ignore */
@Component({
  selector: 'nova-workshop-pagination-selected-in-middle',
  templateUrl: './selected-in-middle.docs.html',
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
export class PaginationSelectedInMiddleComponent {
  BreakpointType = BreakpointType;
  currentPage: number = 1;
  startPageSize = 3;
  endPageSize = 3;
  midPageSize = 5;
  items: Array<number> = [];
  showPages: Array<number> = [];

  constructor(private pagingationService: PaginationService) {
    this.items = this.pagingationService.range(1, 15);
    this.pagesToShow();
  }

  next() {
    if (this.currentPage + 1 <= this.items.length) {
      this.currentPage++;
    }
    this.pagesToShow();
  }

  previous() {
    if (this.currentPage - 1 > 0) {
      this.currentPage--;
    }
    this.pagesToShow();
  }

  goTo(index: number) {
    this.currentPage = index;
    this.pagesToShow();
  }

  start() {
    this.currentPage = 1;
    this.pagesToShow();
  }

  end() {
    this.currentPage = this.items.length;
    this.pagesToShow();
  }

  pagesToShow() {
    if (this.currentPage <= this.startPageSize) {
      this.showPages = this.items.slice(0, this.startPageSize);
    } else if (this.currentPage > this.items.length - this.endPageSize) {
      this.showPages = this.items.slice(-this.endPageSize);
    } else {
      const startPage = this.currentPage - Math.floor(this.midPageSize / 2) - 1;
      const endPage = this.currentPage + Math.floor(this.midPageSize / 2) - 1;
      this.showPages = this.items.slice(startPage, endPage + 1);
    }
  }
}
