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
import { UUIDService } from '../_utilities/services/uuid.service';
import { BadgeDirective } from './badge.directive';

@Component({
  template: `<span v-badge [badgeType]="badgeType">Test</span>`
})
class TestComponent {
  badgeType = '';
}

describe('BadgeDirective', () => {
  it('should create an instance', () => {
    const directive = new BadgeDirective(TestBed.inject(UUIDService));
    expect(directive).toBeTruthy();
  });

  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let directiveDebugElement: any;
  let directiveInstance: BadgeDirective;
  let types = ['default', 'neutral', 'critical', 'stable', 'warning', 'subtle', 'number'];

  configureTestSuite();

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [BadgeDirective],
      providers: [UUIDService]
    });
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    directiveDebugElement = fixture.debugElement.query(By.directive(BadgeDirective));
    directiveInstance = directiveDebugElement.injector.get(BadgeDirective);
    fixture.detectChanges();
  });

  it('should render the v-badge class', () => {
    fixture.detectChanges();
    const elementWithTheCorrectClass = fixture.debugElement.query(By.css('.v-badge'));
    expect(elementWithTheCorrectClass).toBeTruthy();
  });

  it('should render custom class', () => {
    directiveInstance.class = 'test-class';
    fixture.detectChanges();
    const elementWithTheCorrectClass = fixture.debugElement.query(By.css('.test-class'));
    expect(elementWithTheCorrectClass).toBeTruthy();
  });

  it('should render the v-badge-${type} class', () => {
    types.forEach((type) => {
      component.badgeType = type;
      fixture.detectChanges();
      expect(directiveInstance.badgeType).toBe(type);
      if (directiveInstance.badgeType != 'default') {
        expect(directiveInstance.class).toContain(`v-badge-${type}`);
      } else expect(directiveInstance.class).toContain(`v-badge `);
    });

    component.badgeType = '';
    fixture.detectChanges();
    expect(directiveInstance.badgeType).toBe('');
  });

  it('should render custom id', () => {
    directiveDebugElement.nativeElement.setAttribute('id', 'test-id');
    fixture.detectChanges();
    expect(directiveDebugElement.nativeElement.getAttribute('id')).toBe('test-id');
  });

  it('should have default id', () => {
    fixture.detectChanges();
    expect(directiveDebugElement.nativeElement.getAttribute('id')).toContain('v-badge');
  });

  it('should set number', () => {
    directiveInstance.number = true;
    fixture.detectChanges();
    expect(directiveInstance.number).toBe(true);
    expect(directiveInstance.class).toContain('v-badge-number');
  });

  it('should set noBackground', () => {
    directiveInstance.noBackground = true;
    fixture.detectChanges();
    expect(directiveInstance.noBackground).toBe(true);
    expect(directiveInstance.class).toContain('v-badge-clear');
  });

  it('should set icon', () => {
    directiveInstance.icon = true;
    fixture.detectChanges();
    expect(directiveInstance.icon).toBe(true);
    expect(directiveInstance.class).toContain('v-badge-icon');
  });
});
