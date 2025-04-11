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
import { MessageDirective } from './message.directive';

@Component({
  template: `<div v-message>Test</div>`
})
class TestComponent {}

describe('MessageDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  configureTestSuite();

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [MessageDirective]
    });
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render the v-message class', () => {
    fixture.detectChanges();
    const elementWithTheCorrectClass = fixture.debugElement.query(By.css('.v-message'));
    expect(elementWithTheCorrectClass).toBeTruthy();
  });

  it('should allow custom messageType', () => {
    const message = new MessageDirective();
    message.messageType = 'error';
    expect(message.messageType).toEqual('error');
    expect(message.hostClasses).toBe(' v-message v-message-error');
  });
});
