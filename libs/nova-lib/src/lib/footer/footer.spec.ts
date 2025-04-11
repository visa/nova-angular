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
import { FooterDirective } from './footer.directive';

@Component({
  template: `<footer v-footer>Test</footer>`
})
class TestComponent {}

describe('FooterDirective', () => {
  it('should create an instance', () => {
    const directive = new FooterDirective();
    expect(directive).toBeTruthy();
  });

  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let directiveDebugElement: any;
  let directiveInstance: FooterDirective;

  configureTestSuite();

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [FooterDirective]
    });
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    directiveDebugElement = fixture.debugElement.query(By.directive(FooterDirective));
    directiveInstance = directiveDebugElement.injector.get(FooterDirective);

    fixture.detectChanges();
  });

  it('should render the v-footer class', () => {
    const elementWithTheCorrectClass = fixture.debugElement.query(By.css('.v-footer'));
    expect(elementWithTheCorrectClass).toBeTruthy();
  });
});
