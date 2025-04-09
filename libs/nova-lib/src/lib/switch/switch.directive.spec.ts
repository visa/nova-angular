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
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { configureTestSuite } from '../../test-helper';
import { AppReadyService } from '../_utilities/services/app-stable-check.service';
import { UUIDService } from '../_utilities/services/uuid.service';
import { SwitchDirective } from './switch.directive';

@Component({
  template: `<input
      v-switch
      [(ngModel)]="checked"
      [checked]="checked"
      [invalid]="invalid"
      [required]="required"
      [disabled]="disabled"
    /><input />`
})
class TestComponent {
  checked = false;
  invalid = false;
  disabled = false;
  required = false;
}

describe('SwitchDirective', () => {
  it('should create an instance', () => {
    const directive = new SwitchDirective(
      TestBed.inject(ElementRef),
      TestBed.inject(UUIDService),
      TestBed.inject(AppReadyService)
    );
    expect(directive).toBeTruthy();
  });

  let component: TestComponent;
  let fixture: ComponentFixture<any>;
  let directiveInstance: SwitchDirective;
  let directiveDebugElement;

  configureTestSuite();

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [FormsModule, SwitchDirective],
      providers: [
        {
          provide: ElementRef,
          useValue: TestComponent
        }
      ]
    });
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    directiveDebugElement = fixture.debugElement.query(By.directive(SwitchDirective));
    directiveInstance = directiveDebugElement.injector.get(SwitchDirective);

    fixture.detectChanges();
  });

  it('should render the v-switch class', () => {
    fixture.detectChanges();
    const elementWithTheCorrectClass = fixture.debugElement.query(By.css('.v-switch'));
    expect(elementWithTheCorrectClass).toBeTruthy();
  });

  it('should write value', () => {
    directiveInstance.writeValue('true');
    expect(directiveInstance.val).toBe('true');
    expect(directiveDebugElement.nativeElement.checked).toBe(true);
    expect(directiveInstance.checked).toBe(true);
  });

  it('should call the setter', () => {
    const spyOnSet = jest.spyOn(directiveInstance, 'value', 'set');
    directiveInstance.value = 'true';

    fixture.detectChanges();

    expect(directiveInstance.val).toBe('true');
    expect(directiveDebugElement.nativeElement.checked).toBe(true);
    expect(directiveInstance.checked).toBe(true);
    expect(spyOnSet).toHaveBeenCalledWith('true');
  });

  it('should register change', () => {
    const spy = jest.spyOn(directiveInstance, 'handleChange');
    directiveDebugElement.nativeElement.dispatchEvent(new Event('change'));
    expect(spy).toHaveBeenCalled();

    const fn = jest.fn();
    directiveInstance.registerOnChange(fn);
    directiveInstance.onChange('test');
    expect(fn).toHaveBeenCalledWith('test');
  });

  it('should register touch', () => {
    const spy = jest.spyOn(directiveInstance, 'handleBlur');
    directiveDebugElement.nativeElement.dispatchEvent(new Event('blur'));

    const fn = jest.fn();
    directiveInstance.registerOnTouched(fn);
    directiveInstance.onTouched('test');
    expect(spy).toHaveBeenCalled();
    expect(fn).toHaveBeenCalled();
  });

  it('should be checked', () => {
    const element = directiveInstance;
    expect(element.checked).toBeFalsy();
    component.checked = true;
    fixture.detectChanges();
    expect(element.checked).toBeTruthy();
  });

  it('should render role=switch', () => {
    fixture.detectChanges();
    const elementWithTheCorrectRole = directiveDebugElement.nativeElement.getAttribute('role');
    expect(elementWithTheCorrectRole).toEqual('switch');
  });

  it('should render type=checkbox', () => {
    fixture.detectChanges();
    const elementWithTheCorrectRole = directiveDebugElement.nativeElement.getAttribute('type');
    expect(elementWithTheCorrectRole).toEqual('checkbox');
  });

  it('should be required', () => {
    component.required = true;
    fixture.detectChanges();
    const elementWithRequired = directiveDebugElement.nativeElement.getAttribute('required');
    expect(elementWithRequired).toBeTruthy();
  });

  it('should be invalid', () => {
    component.invalid = true;
    fixture.detectChanges();
    const elementWithInvalid = directiveDebugElement.nativeElement.getAttribute('aria-invalid');
    expect(elementWithInvalid).toBeTruthy();
  });

  it('should be disabled', () => {
    component.disabled = true;
    fixture.detectChanges();
    const elementWithDisabled = directiveDebugElement.nativeElement.getAttribute('disabled');
    expect(elementWithDisabled).toBeTruthy();
  });

  it('should have default id', () => {
    fixture.detectChanges();
    expect(directiveDebugElement.nativeElement.getAttribute('id')).toContain('v-switch-');
  });

  it('should render custom id', () => {
    directiveDebugElement.nativeElement.setAttribute('id', 'test-id');
    fixture.detectChanges();
    expect(directiveDebugElement.nativeElement.getAttribute('id')).toBe('test-id');
  });
  it('should handle focus', () => {
    const spy = jest.spyOn(directiveInstance, 'onTouched');
    directiveDebugElement.nativeElement.dispatchEvent(new Event('focus'));
    expect(spy).toHaveBeenCalled();
  });
});
