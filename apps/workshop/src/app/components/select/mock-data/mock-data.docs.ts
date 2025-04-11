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
import { ChangeDetectorRef, Component } from '@angular/core';
import { NovaLibModule } from '@visa/nova-angular';
import { VisaChevronDownTiny } from '@visa/nova-icons-angular';

import { MockDataService } from '../../../shared/services/mock-data.service';

/** #custom **/
@Component({
  selector: 'nova-workshop-select-mock-data',
  templateUrl: './mock-data.docs.html',
  standalone: true,
  imports: [CommonModule, NovaLibModule, VisaChevronDownTiny]
})
export class MockDataSelectComponent {
  currentData: 'heroes' | 'produce' = 'heroes';

  optionsObj: Array<any> = [];

  constructor(
    private mockDataService: MockDataService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.getMockHeroData();
  }

  getMockHeroData() {
    this.mockDataService.getHeroes().subscribe((res: Array<any>) => {
      this.optionsObj = res;
      this.cdRef.detectChanges();
    });
    this.currentData = 'heroes';
  }

  onDataChange() {
    if (this.currentData === 'heroes') {
      this.mockDataService.getAgriProduce().subscribe((res: Array<any>) => {
        this.optionsObj = res.slice(0, 6);
        this.cdRef.detectChanges();
      });
      this.currentData = 'produce';
    } else if (this.currentData === 'produce') {
      this.mockDataService.getHeroes().subscribe((res: Array<any>) => {
        this.optionsObj = res;
        this.cdRef.detectChanges();
      });
      this.currentData = 'heroes';
    }
  }
}
