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
import { Component, computed, signal } from '@angular/core';
import {
  ButtonDirective,
  ButtonDisabledDirective,
  ButtonIconDirective,
  FlexDirective,
  PaginationControl,
  PaginationDirective,
  PaginationOverflowDirective
} from '@visa/nova-angular';
import { VisaChevronLeftTiny, VisaChevronRightTiny, VisaOptionHorizontalTiny } from '@visa/nova-icons-angular';

/** @ignore */
@Component({
  selector: 'nova-workshop-pagination-control-slim-with-count',
  templateUrl: './slim-with-count.docs.html',
  standalone: true,
  imports: [
    ButtonDirective,
    ButtonDisabledDirective,
    ButtonIconDirective,
    FlexDirective,
    PaginationDirective,
    PaginationOverflowDirective,
    VisaChevronLeftTiny,
    VisaOptionHorizontalTiny,
    VisaChevronRightTiny
  ]
})
export class PaginationControlSlimWithCountComponent {
  readonly paginationControl = new PaginationControl({
    blockMaxLength: 5, // The max amount of pages you want to show in the pagination
    compact: true,
    defaultSelected: 1,
    defaultTotalPages: 10
  });

  readonly pagesToFrom = computed(() =>
    this.paginationControl.getToFrom(
      this.totalItems(), // Total amount of items
      3 // Items per page
    )
  );

  readonly totalItems = signal(30);
}
