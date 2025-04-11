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

import { RadioDirective } from '../radio/radio.directive';
import { ToggleDirective } from './toggle.directive';

@Component({
  template: `
    <label v-toggle><input v-radio [id]="id" /></label>
    <label v-toggle><input v-radio /></label>
  `
})
class TestRadioToggleComponent {
  id: any = undefined;
}
describe('ToggleDirective using radios', () => {
  let component: TestRadioToggleComponent;
  let fixture: ComponentFixture<TestRadioToggleComponent>;
  let directive: ToggleDirective;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestRadioToggleComponent],
      imports: [ToggleDirective, RadioDirective]
    });

    fixture = TestBed.createComponent(TestRadioToggleComponent);
    component = fixture.componentInstance;
    directive = fixture.debugElement.query(By.directive(ToggleDirective)).injector.get(ToggleDirective);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should handle content initialization', () => {
    fixture.detectChanges();
    expect(directive.for).toBeUndefined();
    expect(directive.radio._isToggle).toBeTruthy();

    component.id = 'testID';
    fixture.detectChanges();
    directive.ngAfterContentInit();
    expect(directive.for).toEqual(directive.radio.id);
  });

  it('should handle host bindings', () => {
    directive.for = 'testId';
    directive.class = 'testClass';
    directive.toggleIcon = true;
    fixture.detectChanges();
    expect(directive.hostFor).toContain('testId');
    expect(directive.hostClasses).toContain('testClass');
    expect(directive.hostClasses).toContain('testClass-icon');
  });
});
