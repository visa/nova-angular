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
import { ElementRef } from '@angular/core';
import { RadioDirective } from './radio.directive';

describe('RadioDirective', () => {
  let directive: RadioDirective;
  let mockElementRef: ElementRef;
  let mockUuidService;
  let mockReadyService;

  beforeEach(() => {
    mockElementRef = new ElementRef(document.createElement('input'));
    mockUuidService = {
      getUUID: jest.fn().mockReturnValue('test-uuid')
    };
    mockReadyService = {
      isBrowserAndDomAvailable: jest.fn().mockReturnValue(true)
    };
    directive = new RadioDirective(mockElementRef, mockUuidService, mockReadyService);
    directive.onChange = jest.fn();
    directive.onTouched = jest.fn();
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should have the right class', () => {
    expect(directive.hostClasses).toContain('v-radio');
  });

  it('should set invalid property', () => {
    directive.invalid = true;
    expect(directive.invalid).toBe(true);
  });

  it('should set required property', () => {
    directive.required = true;
    expect(directive.required).toBe(true);
  });

  // it('should set checked property', () => {
  //   directive.checked = true;
  //   expect(directive.hostChecked).toBe('checked');
  //   expect(directive.checked).toBe(true);
  // });

  it('should set disabled property', () => {
    directive.disabled = true;
    expect(directive.disabled).toBe(true);
    expect(directive.hostDisabled).toBe('disabled');
  });

  it('should set value property', () => {
    directive.value = 'test value';
    expect(directive.val).toBe('test value');
  });

  it('should set name property', () => {
    directive.name = 'test name';
    expect(directive.name).toBe('test name');
  });

  it('should set formControlName property', () => {
    directive.formName = 'test formControlName';
    expect(directive.hostName).toBe('test formControlName');
    directive.name = 'test 2';
    expect(directive.hostName).toBe('test 2');
  });

  it('should handle change event', () => {
    directive.radioValue = 'radio value';
    directive.handleChange(new Event('change'));
    expect(directive.onChange).toHaveBeenCalledWith(directive.radioValue);
    expect(directive.checked).toBe(mockElementRef.nativeElement.checked);
  });

  // commenting out since blur event is empty
  // it('should handle blur event', () => {
  //   directive.radioValue = 'radio value';
  //   directive.handleBlur(new Event('blur'));
  //   expect(directive.onTouched).toHaveBeenCalledWith(directive.radioValue);
  // });

  it('should register onChange function', () => {
    const fn = jest.fn();
    directive.registerOnChange(fn);
    expect(directive.onChange).toBe(fn);
  });

  it('should register onTouched function', () => {
    const fn = jest.fn();
    directive.registerOnTouched(fn);
    expect(directive.onTouched).toBe(fn);
  });

  it('should write value', () => {
    const testValue = 'test value';
    directive.radioValue = testValue;
    directive.writeValue(testValue);
    expect(directive.val).toBe(testValue);
    expect(directive.checked).toBe(directive.radioValue === testValue);
    expect(mockElementRef.nativeElement.checked).toBe(directive.checked);
  });

  it('should handle focus', () => {
    const spy = jest.spyOn(directive, 'onTouched');
    directive.handleBlur(new Event('blur'));
    directive.handleFocus(new Event('focus'));
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should be able to set disabled state', () => {
    directive.setDisabledState(true);
    expect(directive.disabled).toBe(true);
  });
});
