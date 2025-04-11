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
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { configureTestSuite } from '../../test-helper';
import { CheckboxDirective } from './checkbox.directive';

@Component({
  standalone: true,
  imports: [FormsModule, CheckboxDirective],
  providers: [
    {
      provide: ElementRef,
      useValue: TestComponent
    }
  ],
  template: `<input
      v-checkbox
      [(ngModel)]="checked"
      [checked]="checked"
      [indeterminate]="indeterminate"
      [invalid]="invalid"
      [required]="required"
      [disabled]="disabled"
    /><input />`
})
class TestComponent {
  checked = false;
  invalid = false;
  indeterminate = false;
  disabled = false;
  required = false;
}

describe('CheckboxDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<any>;
  let directiveInstance: CheckboxDirective;
  let directiveDebugElement: any;

  configureTestSuite();

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    directiveDebugElement = fixture.debugElement.query(By.directive(CheckboxDirective));
    directiveInstance = directiveDebugElement.injector.get(CheckboxDirective);

    fixture.detectChanges();
  });

  it('should render the v-checkbox class', () => {
    fixture.detectChanges();
    const elementWithTheCorrectClass = fixture.debugElement.query(By.css('.v-checkbox'));
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

  //write test for indeterminate state and aria-checked from checkbox.directive.ts
  it('should be indeterminate', () => {
    component.indeterminate = true;
    fixture.detectChanges();
    const elementWithIndeterminate =
      directiveDebugElement.nativeElement.indeterminate && !directiveDebugElement.nativeElement.checked;
    expect(elementWithIndeterminate).toBeTruthy();
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
    expect(directiveDebugElement.nativeElement.getAttribute('id')).toContain('v-checkbox-');
  });

  it('should render custom id', () => {
    directiveDebugElement.nativeElement.setAttribute('id', 'test-id');
    fixture.detectChanges();
    expect(directiveDebugElement.nativeElement.getAttribute('id')).toBe('test-id');
  });

  it('should allow for indeterminate state', () => {
    directiveInstance.indeterminate = true;
    expect(directiveInstance.indeterminate).toBeTruthy();
  });

  it('should handle focus', () => {
    const spy = jest.spyOn(directiveInstance, 'handleFocus');
    directiveDebugElement.nativeElement.dispatchEvent(new Event('focus'));
    expect(spy).toHaveBeenCalled();
  });
});
