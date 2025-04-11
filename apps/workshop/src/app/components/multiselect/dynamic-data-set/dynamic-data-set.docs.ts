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
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ComboboxDirective, ComboboxService, NovaLibModule } from '@visa/nova-angular';
import { VisaChevronDownTiny, VisaChevronUpTiny, VisaErrorTiny } from '@visa/nova-icons-angular';
import { MockDataService } from '../../../shared/services/mock-data.service';

/** @ignore */
@Component({
  selector: 'nova-workshop-multiselect-dynamic-data-set',
  templateUrl: './dynamic-data-set.docs.html',
  providers: [ComboboxService],
  standalone: true,
  imports: [CommonModule, NovaLibModule, VisaErrorTiny, VisaChevronDownTiny, VisaChevronUpTiny]
})
export class DynamicDataSetMultiselectComponent implements OnInit {
  @ViewChild(ComboboxDirective) combobox: ComboboxDirective;
  listData: Array<any> = [];
  filteredData = this.listData;

  constructor(
    private mockDataService: MockDataService,
    private comboboxService: ComboboxService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.getMockData();
  }

  getMockData() {
    this.mockDataService.getLargeData().subscribe((data: Array<any>) => {
      this.listData = data;
      this.filteredData = this.listData;
      if (this.combobox) this.comboboxService.autoFilterBasedOnList(this.combobox, this.listData, 'id');
    });
  }

  ngAfterViewInit(): void {
    if (this.combobox) {
      // ComboboxService provider needed to get unique reference to filteredListEmitter
      this.combobox.filteredListEmitter.subscribe((listItems: any[]) => {
        this.filteredData = listItems;
        this.cdRef.detectChanges();
      });
      this.comboboxService.closeMenuOnItemClick(this.combobox);
    }
  }
}
