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
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TableDirective } from '../table/table.directive';
import { ThDirective } from './th.directive';

@Component({
  template: `<table v-table>
    <tr>
      <th v-th></th>
    </tr>
  </table>`
})
class TestThComponent {}

describe('ThDirective', () => {
  let component: TestThComponent;
  let fixture: ComponentFixture<TestThComponent>;
  let thEl: any;
  let tableEl: any;
  let thDirective: ThDirective;
  let tableDirective: TableDirective;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestThComponent],
      imports: [ThDirective, TableDirective]
    });

    fixture = TestBed.createComponent(TestThComponent);
    component = fixture.componentInstance;
    thEl = fixture.debugElement.query(By.directive(ThDirective));
    tableEl = fixture.debugElement.query(By.directive(TableDirective));
    thDirective = thEl.injector.get(ThDirective);
    tableDirective = tableEl.injector.get(TableDirective);

    fixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(thDirective).toBeTruthy();
  });

  it('should return correct hostClasses', () => {
    thDirective.class = 'test-class';
    expect(thDirective.hostClasses).toBe('test-class v-th');
  });

  it('should handle groupHeader correctly', () => {
    thDirective.groupHeader = true;
    expect(thDirective.groupHeader).toBe(true);
    expect(thDirective.hostClasses).toContain('v-th-alt v-typography-overline');
  });

  it('should handle tableDirective._keyValue correctly', () => {
    tableDirective._keyValue = true;
    thDirective.ngAfterContentInit();
    fixture.detectChanges();
    expect(thDirective.hostClasses).toContain('v-td');
    tableDirective._keyValue = false;
    thDirective.ngAfterContentInit();
    fixture.detectChanges();
    expect(thDirective.hostClasses).toContain('v-th');
  });
});
