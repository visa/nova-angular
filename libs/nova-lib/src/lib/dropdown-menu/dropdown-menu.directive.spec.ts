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
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, ViewChild } from '@angular/core';
import { DropdownMenuDirective } from './dropdown-menu.directive';

@Component({
  template: ` <span v-dropdown-menu id="bottom-example-nova">I am dropdownMenu</span> `
})
class TestDropdownMenuDirective {
  @ViewChild(DropdownMenuDirective) dropdownMenu: DropdownMenuDirective;
}

describe('DropdownMenuDirective', () => {
  let component: TestDropdownMenuDirective;
  let fixture: ComponentFixture<TestDropdownMenuDirective>;
  let htmlEl: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestDropdownMenuDirective],
      imports: [DropdownMenuDirective]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestDropdownMenuDirective);
    component = fixture.componentInstance;
    htmlEl = fixture.nativeElement.querySelector('[v-dropdown-menu]');
    fixture.detectChanges();
  });

  it('should exist', () => {
    expect(component).toBeTruthy();
  });

  describe('Input properties', () => {
    it(`should have 'v-dropdown-menu' class by default`, () => {
      expect(htmlEl.classList.toString()).toEqual(expect.stringContaining('v-dropdown-menu'));
    });

    it(`should have 'v-surface' class by default`, () => {
      expect(htmlEl.classList.toString()).toEqual(expect.stringContaining('v-surface'));
    });

    it('should add custom class', () => {
      component.dropdownMenu.class = 'v-dropdown-menu-custom';
      fixture.detectChanges();
      expect(htmlEl.classList.toString()).toEqual(expect.stringContaining('v-dropdown-menu-custom'));
    });
  });

  it('should recognize the id', () => {
    expect(htmlEl.getAttribute('id')).toEqual('bottom-example-nova');
  });

  it('should have an elementRef to provide to floating UI', () => {
    expect(component.dropdownMenu.el).toBeTruthy();
  });
});
