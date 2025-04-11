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
import { Component, ElementRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { configureTestSuite } from '../../test-helper';
import { LinkDirective } from './link.directive';

@Component({
  template: `<a
    v-link
    [routerLink]="providedRoute"
    [href]="providedHref"
    [disabled]="disabled"
    [noUnderline]="noUnderline"
    >Test</a
  >`
})
class TestComponent {
  noUnderline = false;
  disabled = false;
  providedRoute = '';
  providedHref = '';
}

describe('LinkDirective', () => {
  it('should create an instance', () => {
    const el = new ElementRef(document.createElement('a'));
    const directive = new LinkDirective(el);
    expect(directive).toBeTruthy();
  });

  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let directiveDebugElement: any;
  let directiveInstance: LinkDirective;

  configureTestSuite();

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [RouterTestingModule, LinkDirective]
    });
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    directiveDebugElement = fixture.debugElement.query(By.directive(LinkDirective));
    directiveInstance = directiveDebugElement.injector.get(LinkDirective);

    fixture.detectChanges();
  });

  it('should render the v-link class', () => {
    fixture.detectChanges();
    const elementWithTheCorrectClass = fixture.debugElement.query(By.css('.v-link'));
    expect(elementWithTheCorrectClass).toBeTruthy();
  });

  it('should render the v-link-no-underline class', () => {
    component.noUnderline = true;
    fixture.detectChanges();
    const elementWithTheCorrectClass = fixture.debugElement.query(By.css('.v-link-no-underline'));
    expect(elementWithTheCorrectClass).toBeTruthy();
  });

  it('should render the null role', () => {
    const elementShouldHaveNoRole = directiveDebugElement.nativeElement.getAttribute('role');
    expect(elementShouldHaveNoRole).toBeNull();
  });

  it('should render role=link', () => {
    component.disabled = true;
    fixture.detectChanges();
    const elementWithTheCorrectRole = directiveDebugElement.nativeElement.getAttribute('role');
    expect(elementWithTheCorrectRole).toEqual('link');
  });

  it('should be disabled', () => {
    component.disabled = true;
    fixture.detectChanges();
    const elementWithTheCorrectClass = directiveDebugElement.nativeElement.getAttribute('aria-disabled');
    expect(elementWithTheCorrectClass).toBeTruthy();
  });
});
