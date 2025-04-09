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
import { Component, ElementRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { UUIDService } from '@visa/nova-icons-angular';
import { configureTestSuite } from '../../test-helper';
import { AppReadyService } from '../_utilities/services/app-stable-check.service';
import { LabelDirective } from './label.directive';
import exp = require('constants');

@Component({
  standalone: true,
  imports: [LabelDirective],
  providers: [UUIDService],
  template: `<label v-label>Label</label>`
})
class TestComponent {}

describe('LabelDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let directiveDebugElement: any;
  let directiveInstance: LabelDirective;
  let uuidService: UUIDService;
  let el: ElementRef;
  let appReadyService: AppReadyService;

  configureTestSuite();

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    directiveDebugElement = fixture.debugElement.query(By.directive(LabelDirective));
    directiveInstance = directiveDebugElement.injector.get(LabelDirective);

    uuidService = TestBed.inject(UUIDService);
    el = new ElementRef(document.createElement('div'));

    fixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(directiveInstance).toBeTruthy();
  });

  it("shouldn't propagate click event", () => {
    const event = new MouseEvent('click');
    const spy = jest.spyOn(event, 'stopPropagation');
    directiveInstance.onClick(event);
    expect(spy).toHaveBeenCalled();
  });
});
