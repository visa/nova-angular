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
import { CommonModule, KeyValue } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NovaLibModule } from '@visa/nova-angular';
import { MockDataService } from '../../../shared/services/mock-data.service';

/** #custom */
@Component({
  imports: [CommonModule, NovaLibModule],
  standalone: true,
  selector: 'nova-workshop-table-fixed-first-column',
  templateUrl: './fixed-first-column.docs.html'
})
export class FixedFirstColumnComponent implements OnInit {
  columnData: Array<any>;
  rowData: Array<any>;
  alternate = false;
  constructor(private mockDataService: MockDataService) {}

  ngOnInit() {
    this.getMockData();
  }

  getMockData() {
    this.mockDataService.getExtendedColData().subscribe((data: Array<any>) => {
      this.columnData = data;
    });
    this.mockDataService.getExtendedRowData().subscribe((data: Array<any>) => {
      this.rowData = data;
    });
  }
  originalOrder = (a: KeyValue<number, string>, b: KeyValue<number, string>): number => {
    return 0;
  };
  handleAlternate() {
    this.alternate = !this.alternate;
  }
}
