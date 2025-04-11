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
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonDisabledDirective } from '../button-disabled/button-disabled.directive';
import { ButtonDirective } from '../button/button.directive';
import { ButtonIconDirective } from './button-icon.directive';

@Component({
  standalone: true,
  imports: [ButtonDirective, ButtonIconDirective, ButtonDisabledDirective],
  template: `<button v-button-icon></button>`
})
class TestButtonIconComponent {}

describe('ButtonIconDirective', () => {
  let component: TestButtonIconComponent;
  let fixture: ComponentFixture<TestButtonIconComponent>;
  let htmlEl: HTMLElement;

  beforeEach(() => {
    fixture = TestBed.createComponent(TestButtonIconComponent);
    component = fixture.componentInstance;
    htmlEl = fixture.nativeElement.querySelector('[v-button-icon]');
    fixture.detectChanges();
  });

  it('should exist', () => {
    expect(component).toBeTruthy();
  });

  it(`should have 'v-button' class by default`, () => {
    expect(htmlEl.classList.toString()).toEqual(expect.stringContaining('v-button'));
  });

  it(`should have 'v-button-icon' class by default`, () => {
    expect(htmlEl.classList.toString()).toEqual(expect.stringContaining('v-button-icon'));
  });

  it('should allow custom class', () => {
    const directive = new ButtonIconDirective();
    directive.class = 'test-class';
    expect(directive.hostClass).toBe('test-class v-button-icon');
  });
});
