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
import { NovaLibModule } from '@visa/nova-angular';
import { MockDataService } from '../../../shared/services/mock-data.service';

/**
 * @see [getColData, getRowData]
 */
@Component({
  imports: [CommonModule, NovaLibModule],
  standalone: true,
  selector: 'nova-workshop-table-large-padding-banded-rows',
  templateUrl: './large-padding-banded-rows.docs.html'
})
export class LargePaddingBandedRowsTableComponent implements OnInit {
  columnData: Array<any>;
  rowData: Array<any>;

  constructor(private mockDataService: MockDataService) {}

  ngOnInit() {
    this.getMockData();
  }

  getMockData() {
    this.mockDataService.getColData().subscribe((data: Array<any>) => {
      this.columnData = data;
    });
    this.mockDataService.getRowData().subscribe((data: Array<any>) => {
      this.rowData = data;
    });
  }
}
