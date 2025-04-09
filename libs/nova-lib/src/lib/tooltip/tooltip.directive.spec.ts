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
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, ViewChild } from '@angular/core';
import { TooltipDirective } from './tooltip.directive';

@Component({
  template: ` <span v-tooltip id="bottom-example-nova">I am tooltip</span> `
})
class TestTooltipDirective {
  @ViewChild(TooltipDirective) tooltip: TooltipDirective;
}

describe('TooltipDirective', () => {
  let component: TestTooltipDirective;
  let fixture: ComponentFixture<TestTooltipDirective>;
  let htmlEl: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestTooltipDirective],
      imports: [TooltipDirective]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestTooltipDirective);
    component = fixture.componentInstance;
    htmlEl = fixture.nativeElement.querySelector('[v-tooltip]');
    fixture.detectChanges();
  });

  it('should exist', () => {
    expect(component).toBeTruthy();
  });

  describe('Input properties', () => {
    it(`should have 'v-tooltip' class by default`, () => {
      expect(htmlEl.classList.toString()).toEqual(expect.stringContaining('v-tooltip'));
    });

    it(`should have 'v-surface' class by default`, () => {
      expect(htmlEl.classList.toString()).toEqual(expect.stringContaining('v-surface'));
    });

    it('should add custom class', () => {
      component.tooltip.class = 'v-tooltip-custom';
      fixture.detectChanges();
      expect(htmlEl.classList.toString()).toEqual(expect.stringContaining('v-tooltip-custom'));
    });
  });

  describe('Hostbinded styles', () => {
    it('should have display: none by default', () => {
      expect(htmlEl.style.display).toEqual('none');
    });

    it('should have role: tooltip by default', () => {
      expect(htmlEl.getAttribute('role')).toEqual('tooltip');
    });
  });

  it('should recognize the id', () => {
    expect(htmlEl.getAttribute('id')).toEqual('bottom-example-nova');
  });

  it('should have an elementRef to provide to floating UI', () => {
    expect(component.tooltip.el).toBeTruthy();
  });
});
