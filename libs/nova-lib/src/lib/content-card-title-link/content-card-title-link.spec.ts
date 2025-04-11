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
import { ContentCardTitleLinkDirective } from './content-card-title-link.directive';

@Component({
  template: `<a [disabled]="disabled" v-content-card-title-link>Card Link</a>`,
  imports: [ContentCardTitleLinkDirective]
})
class TestComponent {
  disabled: boolean;
}

describe('ContentCardTitleLinkDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let directiveDebugElement;

  beforeEach(() => {
    // configure and create the component
    fixture = TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [ContentCardTitleLinkDirective]
    }).createComponent(TestComponent);

    // render and bind
    fixture.detectChanges();

    // acquire the directive
    directiveDebugElement = fixture.debugElement.query(By.directive(ContentCardTitleLinkDirective));
  });

  it('should create', () => {
    expect(directiveDebugElement).toBeTruthy();
  });

  it('should be disabled', () => {
    fixture.componentInstance.disabled = true;
    expect(directiveDebugElement.componentInstance.disabled).toBe(true);
  });

  it('should set aria be disabled', () => {
    fixture.componentInstance.disabled = true;
    fixture.detectChanges();
    const el = directiveDebugElement.nativeElement.getAttribute('aria-disabled');
    expect(el).toBe('true');
  });

  it('should render the v-content-card-title-link class', () => {
    expect(directiveDebugElement.classes['v-content-card-title-link']).toBe(true);
  });
});
