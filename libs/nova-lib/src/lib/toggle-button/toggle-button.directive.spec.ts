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
import { ToggleDirective } from '../toggle/toggle.directive';
import { ToggleButtonDirective } from './toggle-button.directive';

@Component({
  template: `
    <fieldset v-toggle-container>
      <button v-toggle vGap="6" active>Label 1</button>
      <button v-toggle vGap="6">Label 2</button>
      <button v-toggle vGap="6">Label 3</button>
    </fieldset>
  `
})
class TestToggleContainerComponent {}

describe('ToggleDirective using buttons', () => {
  let component: TestToggleContainerComponent;
  let fixture: ComponentFixture<TestToggleContainerComponent>;
  let toggleDirectives: ToggleDirective[];
  let toggleButtonDirectives: ToggleButtonDirective[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestToggleContainerComponent],
      imports: [ToggleDirective, ToggleButtonDirective]
    });

    fixture = TestBed.createComponent(TestToggleContainerComponent);
    component = fixture.componentInstance;
    toggleDirectives = fixture.debugElement
      .queryAll(By.directive(ToggleDirective))
      .map((de) => de.injector.get(ToggleDirective));
    toggleButtonDirectives = fixture.debugElement
      .queryAll(By.directive(ToggleButtonDirective))
      .map((de) => de.injector.get(ToggleButtonDirective));
  });

  it('should create an instance for each button', () => {
    expect(toggleButtonDirectives.length).toBe(3);
    toggleButtonDirectives.forEach((directive) => {
      expect(directive).toBeTruthy();
    });
  });

  it('should handle active state correctly', () => {
    fixture.detectChanges();
    expect(toggleButtonDirectives[0].active).toBeTruthy();
    expect(toggleButtonDirectives[0].ariaPressed).toBe('true');
    expect(toggleButtonDirectives[1].active).toBeFalsy();
    expect(toggleButtonDirectives[2].active).toBeFalsy();
  });

  it('should handle host bindings', () => {
    toggleDirectives[0].class = 'testClass';
    toggleDirectives[0].toggleIcon = true;
    fixture.detectChanges();
    expect(toggleDirectives[0].hostClasses).toContain('testClass');
    expect(toggleDirectives[0].hostClasses).toContain('testClass-icon');
  });

  it('should handle disabled', () => {
    toggleButtonDirectives[0].disabled = true;
    fixture.detectChanges();
    expect(toggleButtonDirectives[0].hostAriaDisabled).toBe('true');
    expect(toggleButtonDirectives[0].hostDisabled).toBe('disabled');
  });

  it('should create default value if none given', () => {
    expect(toggleButtonDirectives[0].value).not.toBeUndefined();
  });
});
