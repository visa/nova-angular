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
import { Component, ElementRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { configureTestSuite } from '../../test-helper';
import { AppReadyService } from '../_utilities/services/app-stable-check.service';
import { UUIDService } from '../_utilities/services/uuid.service';
import { CheckboxDirective } from '../checkbox/checkbox.directive';
import { InputContainerComponent } from '../input-container/input-container.component';
import { InputDirective } from '../input/input.directive';
import { LabelDirective } from '../label/label.directive';
import { RadioDirective } from '../radio/radio.directive';

@Component({
  template: ` <div v-input-container [useCustomIcon]="useCustomIcon">
      <input v-input />
    </div>
    <span v-input-message>Inline message</span>`
})
class TestComponent {
  useCustomIcon = false;
}

describe('InputContainerComponent', () => {
  it('should create an instance', () => {
    const directive = new InputContainerComponent();
    expect(directive).toBeTruthy();
  });

  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let directiveDebugElement: any;
  let directiveInstance: InputContainerComponent;
  let uuidService: UUIDService;
  let el: ElementRef;
  let appReadyService: AppReadyService;

  configureTestSuite();

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [InputContainerComponent],
      providers: [UUIDService]
    });
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    directiveDebugElement = fixture.debugElement.query(By.directive(InputContainerComponent));
    directiveInstance = directiveDebugElement.injector.get(InputContainerComponent);

    uuidService = TestBed.inject(UUIDService);
    el = new ElementRef(document.createElement('div'));

    fixture.detectChanges();
  });

  it('should have default classes', () => {
    expect(directiveInstance.class).toContain('v-input-container');
  });

  it('should have surface class', () => {
    directiveInstance.input = new InputDirective(el, uuidService, appReadyService!);
    fixture.detectChanges();
    expect(directiveInstance.class).toContain('v-surface');
  });

  it('should set useCustomIcons correctly', () => {
    component.useCustomIcon = true;
    fixture.detectChanges();
    expect(directiveInstance.useCustomIcon).toBeTruthy();
  });

  it('should set button disabled state correctly', () => {
    let button = { button: { disabled: false } } as any;
    directiveInstance.buttons = [button] as any;
    directiveInstance.setButtonDisabledState(true);
    expect(directiveInstance.buttons[0].disabled).toBeTruthy();
  });
  it('should disable buttons if input is disabled', () => {
    let button = { button: { disabled: false } } as any;
    directiveInstance.buttons = [button] as any;
    directiveInstance.input = new InputDirective(el, uuidService, appReadyService!);
    directiveInstance.input.disabled = true;

    directiveInstance.ngAfterContentInit();
    expect(button.disabled).toBeTruthy();
  });

  it('should enable buttons if input state changes to not disabled and not readonly', () => {
    let button = { button: { disabled: false } } as any;
    directiveInstance.buttons = [button] as any;
    directiveInstance.input = new InputDirective(el, uuidService, appReadyService!);
    directiveInstance.input.communicateState = of({ disabled: false, readonly: false }) as any;
    directiveInstance.ngAfterContentInit();
    expect(button.disabled).toBeFalsy();

    directiveInstance.input.communicateState = of({ disabled: true, readonly: true }) as any;
    directiveInstance.ngAfterContentInit();
    expect(button.disabled).toBeTruthy();
  });

  it('should set label for to radio id if radio is present and checkbox is not present', () => {
    const label = new LabelDirective(el, uuidService);
    const radio = new RadioDirective(el, uuidService, appReadyService!);
    const checkbox = new CheckboxDirective(el, uuidService, appReadyService!);
    checkbox.id = 'test-1';
    radio.id = 'test-2';
    directiveInstance.label = label;
    directiveInstance.checkbox = checkbox;
    directiveInstance.ngAfterContentInit();
    expect(label.for).toBe('test-1');

    directiveInstance.radio = radio;
    directiveInstance.checkbox = undefined as any;
    directiveInstance.ngAfterContentInit();
    expect(label.for).toBe('test-2');
  });
});
