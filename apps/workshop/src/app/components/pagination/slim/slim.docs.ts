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
import { Component, OnInit } from '@angular/core';
import { BreakpointType, NovaLibModule } from '@visa/nova-angular';
import {
  VisaArrowEndTiny,
  VisaArrowStartTiny,
  VisaChevronLeftTiny,
  VisaChevronRightTiny,
  VisaOptionHorizontalTiny
} from '@visa/nova-icons-angular';
@Component({
  selector: 'nova-workshop-pagination-slim',
  templateUrl: './slim.docs.html',
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
export class PaginationSlimComponent implements OnInit {
  BreakpointType = BreakpointType;

  pageBlock: number[] = [];
  firstBlockPage: number;
  lastBlockPage: number;
  isLast: boolean = false;
  isFirst: boolean = false;
  //SET YOUR VARIABLES HERE
  currentPage: number = 1;
  limit: number = 5;
  startPage: number = 1;
  totalPages: number = 15;

  changePage(page: number) {
    if (page == 0 || page > this.totalPages) {
      return;
    } else {
      this.currentPage = page;
      //checks to disable prev/next buttons
      if (this.currentPage === this.startPage) {
        this.isFirst = true;
      } else this.isFirst = false;
      if (this.currentPage === this.totalPages) {
        this.isLast = true;
      } else this.isLast = false;
    }
  }

  previousPage() {
    if (this.currentPage === this.firstBlockPage) {
      this.setSlimPages(this.currentPage - 1);
    }
    this.changePage(this.currentPage - 1);
  }

  nextPage() {
    if (this.currentPage === this.lastBlockPage) {
      this.setSlimPages(this.currentPage + 1);
    }
    this.changePage(this.currentPage + 1);
  }

  setSlimPages(currentPage: number) {
    //range function returns currentPage as first page
    //and a new pageBlock with size based on the limit set.
    this.pageBlock = [...Array(this.limit).keys()].map((el) => el + currentPage);
    this.lastBlockPage = this.pageBlock[this.pageBlock.length - 1];
    this.firstBlockPage = currentPage;
  }

  ngOnInit() {
    this.changePage(this.startPage);
    this.setSlimPages(this.currentPage);
  }
}
