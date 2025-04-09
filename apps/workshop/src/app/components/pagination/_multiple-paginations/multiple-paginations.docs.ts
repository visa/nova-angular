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
import { Component } from '@angular/core';
import {
  ButtonDirective,
  ButtonDisabledDirective,
  ButtonIconDirective,
  FlexDirective,
  PaginationControl,
  PaginationDirective,
  PaginationOverflowDirective
} from '@visa/nova-angular';
import {
  VisaArrowEndTiny,
  VisaArrowStartTiny,
  VisaChevronLeftTiny,
  VisaChevronRightTiny,
  VisaOptionHorizontalTiny
} from '@visa/nova-icons-angular';

/** @ignore */
@Component({
  selector: 'nova-workshop-pagination-control-with-multiple-paginations',
  templateUrl: './multiple-paginations.docs.html',
  standalone: true,
  imports: [
    ButtonDirective,
    ButtonDisabledDirective,
    ButtonIconDirective,
    FlexDirective,
    PaginationDirective,
    PaginationOverflowDirective,
    VisaArrowStartTiny,
    VisaChevronLeftTiny,
    VisaOptionHorizontalTiny,
    VisaChevronRightTiny,
    VisaArrowEndTiny
  ]
})
export class _MultiplePaginationsComponent {
  readonly paginationControl1 = new PaginationControl({
    blockMaxLength: 5,
    defaultSelected: 5,
    defaultTotalPages: 15
  });

  readonly paginationControl2 = new PaginationControl({
    blockMaxLength: 3,
    defaultSelected: 7,
    defaultTotalPages: 35
  });

  readonly paginationControls = [this.paginationControl1, this.paginationControl2];
}
