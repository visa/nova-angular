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
import { ContentCardSubtitleDirective } from './content-card-subtitle.directive';

@Component({
  template: `<h3 v-content-card-subtitle>Card Title</h3>`,
  imports: [ContentCardSubtitleDirective]
})
class TestComponent {}

describe('ContentCardSubtitleDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let directiveDebugElement;

  beforeEach(() => {
    // configure and create the component
    fixture = TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [ContentCardSubtitleDirective]
    }).createComponent(TestComponent);

    // render and bind
    fixture.detectChanges();

    // acquire the directive
    directiveDebugElement = fixture.debugElement.query(By.directive(ContentCardSubtitleDirective));
  });

  it('should create', () => {
    expect(directiveDebugElement).toBeTruthy();
  });

  it('should render the v-content-card-subtitle class', () => {
    expect(directiveDebugElement.classes['v-content-card-subtitle']).toBe(true);
  });
});
