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
import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonDirective } from '../button/button.directive';
import { ButtonAsDisabledATagDirective } from './button-as-disabled-a-tag.directive';

@Component({
  standalone: true,
  imports: [ButtonDirective, ButtonAsDisabledATagDirective],
  template: `<a disabled v-button>Disabled link</a>`
})
class TestButtonAsDisabledComponent {
  @ViewChild(ButtonDirective) buttonDirective: ButtonDirective;
}

describe('ButtonAsDisabledATagDirective', () => {
  let component: TestButtonAsDisabledComponent;
  let fixture: ComponentFixture<TestButtonAsDisabledComponent>;
  let htmlEl: HTMLElement;

  beforeEach(() => {
    fixture = TestBed.createComponent(TestButtonAsDisabledComponent);
    component = fixture.componentInstance;
    htmlEl = fixture.nativeElement.querySelector('[v-button]');
    fixture.detectChanges();
  });

  it('should exist', () => {
    expect(component).toBeTruthy();
  });

  it('should have disabled attribute', () => {
    expect(htmlEl.getAttribute('disabled')).toBe('');
  });

  it('should have role attribute', () => {
    expect(htmlEl.getAttribute('role')).toBe('link');
  });

  it('should have aria-disabled attribute', () => {
    expect(htmlEl.getAttribute('aria-disabled')).toBe('true');
  });
});
