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
import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckboxDirective } from '../checkbox/checkbox.directive';
import { LabelDirective } from '../label/label.directive';
import { ChipDirective } from './chip.directive';

@Component({
  standalone: true,
  imports: [ChipDirective],
  template: ` <div v-chip></div> `
})
class TestComponent {
  @ViewChild(ChipDirective) chipDirective: ChipDirective;
}

describe('ChipDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(component.chipDirective).toBeTruthy();
  });

  it('should have the correct chip class', () => {
    const hostElement = fixture.nativeElement.querySelector('[v-chip]');
    expect(hostElement.classList.contains('v-chip')).toBe(true);
  });

  it('should not have checkbox or compact class by default', () => {
    const hostElement = fixture.nativeElement.querySelector('[v-chip]');
    expect(hostElement.classList.contains('v-chip-selection')).toBe(false);
    expect(hostElement.classList.contains('v-chip-compact')).toBe(false);
  });

  it('should allow custom class', () => {
    component.chipDirective.class = 'test-class';
    fixture.detectChanges();
    const hostElement = fixture.nativeElement.querySelector('[v-chip]');
    expect(hostElement.classList.contains('test-class')).toBe(true);
  });
});

@Component({
  standalone: true,
  imports: [ChipDirective, CheckboxDirective, LabelDirective],
  template: `
    <label v-label v-chip>
      Label
      <input v-checkbox />
    </label>
  `
})
class TestSelectionChip {
  @ViewChild(ChipDirective) chipDirective: ChipDirective;
  @ViewChild(CheckboxDirective) checkboxDirective: CheckboxDirective;
}

describe('ChipDirective', () => {
  let component: TestSelectionChip;
  let fixture: ComponentFixture<TestSelectionChip>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TestSelectionChip);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(component.chipDirective).toBeTruthy();
  });

  describe('with checkbox', () => {
    it('should have a checkbox', () => {
      expect(component.checkboxDirective).toBeTruthy();
    });

    it('should have the correct chip class', () => {
      const hostElement = fixture.nativeElement.querySelector('[v-chip]');
      expect(hostElement.classList.contains('v-chip-selection')).toBe(true);
    });
  });

  describe('compact chip', () => {
    it('should have the correct chip class', () => {
      component.chipDirective.compact = true;
      fixture.detectChanges();
      const hostElement = fixture.nativeElement.querySelector('[v-chip]');
      expect(hostElement.classList.contains('v-chip-compact')).toBe(true);
    });

    it('should set the correct compact value', () => {
      expect(component.chipDirective.compact).toBe(false);
      component.chipDirective.compact = true;
      fixture.detectChanges();
      expect(component.chipDirective.compact).toBe(true);
    });
  });
});
