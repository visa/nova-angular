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
import { configureTestSuite } from '../../test-helper';
import { BreadcrumbsDirective } from './breadcrumbs.directive';

@Component({
  standalone: true,
  imports: [BreadcrumbsDirective],
  template: `<div v-breadcrumbs [separator]="separator" [hasInlineSeparator]="hasInlineSeparator">Test</div>`
})
class TestComponent {
  hasInlineSeparator = false;
  separator = '';
}

describe('BreadcrumbsDirective', () => {
  it('should create an instance', () => {
    const directive = new BreadcrumbsDirective();
    expect(directive).toBeTruthy();
  });

  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  configureTestSuite();

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render the v-breadcrumbs class', () => {
    fixture.detectChanges();
    const elementWithTheCorrectClass = fixture.debugElement.query(By.css('.v-breadcrumbs'));
    expect(elementWithTheCorrectClass).toBeTruthy();
  });

  it('should render the v-breadcrumbs-custom class', () => {
    component.hasInlineSeparator = true;
    fixture.detectChanges();
    const elementWithTheCorrectClass = fixture.debugElement.query(By.css('.v-breadcrumbs-custom'));
    expect(elementWithTheCorrectClass).toBeTruthy();
  });

  it('should render the style of separator', () => {
    component.separator = '+';
    const psueudoSeparator = { '--v-breadcrumbs-pseudo-separator': `'${component.separator}'` };
    fixture.detectChanges();
    const elementWithTheCorrectStyle = fixture.nativeElement.querySelector('div');
    expect(elementWithTheCorrectStyle.style._values).toEqual(psueudoSeparator);
  });

  it('should allow custom class getter/setter', () => {
    const directive = new BreadcrumbsDirective();
    directive.class = 'v-breadcrumbs-custom';
    expect(directive.hostClass).toBe('v-breadcrumbs-custom v-breadcrumbs ');
  });
});
