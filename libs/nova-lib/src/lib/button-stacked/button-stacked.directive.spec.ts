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
import { By } from '@angular/platform-browser';
import { ButtonDisabledDirective } from '../button-disabled/button-disabled.directive';
import { ButtonDirective } from '../button/button.directive';
import { ButtonStackedDirective } from './button-stacked.directive';

@Component({
  standalone: true,
  imports: [ButtonDirective, ButtonStackedDirective, ButtonDisabledDirective],
  template: `<button v-button-stacked></button>`
})
class TestButtonStackedComponent {}

describe('ButtonStackedDirective', () => {
  let component: TestButtonStackedComponent;
  let fixture: ComponentFixture<TestButtonStackedComponent>;
  let htmlEl: HTMLElement;
  let directiveDebugElement: any;
  let directiveInstance: ButtonStackedDirective;

  beforeEach(() => {
    fixture = TestBed.createComponent(TestButtonStackedComponent);
    component = fixture.componentInstance;
    htmlEl = fixture.nativeElement.querySelector('[v-button-stacked]');
    directiveDebugElement = fixture.debugElement.query(By.directive(ButtonStackedDirective));
    directiveInstance = directiveDebugElement.injector.get(ButtonStackedDirective);
    fixture.detectChanges();
  });

  it('should exist', () => {
    expect(component).toBeTruthy();
  });

  it(`should have 'v-button' class by default`, () => {
    expect(htmlEl.classList.toString()).toEqual(expect.stringContaining('v-button'));
  });

  it(`should have 'v-button-stacked' class by default`, () => {
    expect(htmlEl.classList.toString()).toEqual(expect.stringContaining('v-button-stacked'));
  });

  it('should allow custom class', () => {
    directiveInstance.class = 'test-class';
    expect(directiveInstance.hostClass).toBe('test-class v-button-stacked');
  });
});
