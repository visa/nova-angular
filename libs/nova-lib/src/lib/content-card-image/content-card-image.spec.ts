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
import { ContentCardImageDirective } from './content-card-image.directive';

@Component({
  template: `<img v-content-card-image />`,
  imports: [ContentCardImageDirective]
})
class TestComponent {}

describe('ContentCardImageDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let directiveDebugElement;

  beforeEach(() => {
    // configure and create the component
    fixture = TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [ContentCardImageDirective]
    }).createComponent(TestComponent);

    // render and bind
    fixture.detectChanges();

    // acquire the directive
    directiveDebugElement = fixture.debugElement.query(By.directive(ContentCardImageDirective));
  });

  it('should create', () => {
    expect(directiveDebugElement).toBeTruthy();
  });

  it('should render the v-content-card-image class', () => {
    expect(directiveDebugElement.classes['v-content-card-image']).toBe(true);
  });
});
