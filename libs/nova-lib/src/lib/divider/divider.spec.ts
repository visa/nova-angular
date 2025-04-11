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
import { DividerDirective } from './divider.directive';

@Component({
  template: `<hr v-divider [dividerType]="dividerType" />`
})
class TestComponent {
  dividerType = 'default';
}

describe('DividerDirective', () => {
  it('should create an instance', () => {
    const directive = new DividerDirective();
    expect(directive).toBeTruthy();
  });

  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let directiveDebugElement: any;
  let directiveInstance: DividerDirective;

  configureTestSuite();

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [DividerDirective]
    });
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    directiveDebugElement = fixture.debugElement.query(By.directive(DividerDirective));
    directiveInstance = directiveDebugElement.injector.get(DividerDirective);

    fixture.detectChanges();
  });

  it('should render the v-divider class', () => {
    fixture.detectChanges();
    const elementWithTheCorrectClass = fixture.debugElement.query(By.css('.v-divider'));
    expect(elementWithTheCorrectClass).toBeTruthy();
  });

  describe('should render the correct dividerType class', () => {
    it('should render the default dividerType class', () => {
      component.dividerType = '';
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('.v-divider'))).toBeTruthy();
    });

    it('should render the section dividerType class', () => {
      component.dividerType = 'section';
      fixture.detectChanges();
      const elementWithTheSectionClass = fixture.debugElement.query(By.css('.v-divider-section'));
      expect(elementWithTheSectionClass).toBeTruthy();
    });

    it('should render the decorative dividerType class', () => {
      component.dividerType = 'decorative';
      fixture.detectChanges();
      const elementWithTheDecorativeClass = fixture.debugElement.query(By.css('.v-divider-decorative'));
      expect(elementWithTheDecorativeClass).toBeTruthy();
    });
  });
});
