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
import { ElementRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormControl, NgControl } from '@angular/forms';
import { AppReadyService } from '../_utilities/services/app-stable-check.service';
import { SelectDirective } from './select.directive';

describe('SelectDirective', () => {
  let directive: SelectDirective;
  let control: NgControl;
  let el: ElementRef;
  let appReadyService: AppReadyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppReadyService, { provide: FormControl, useValue: control }]
    });
    appReadyService = TestBed.inject(AppReadyService);
    el = new ElementRef(document.createElement('select'));
    directive = new SelectDirective(el, appReadyService, control);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should have the right class', () => {
    expect(directive.hostClasses).toBe(' v-input');
  });

  it('should allow custom class', () => {
    directive.class = 'test-class';
    expect(directive.hostClasses).toBe('test-class v-input');
  });

  it('should set disabled', () => {
    expect(directive.hostDisabled).toBe(null);
    directive.setDisabledState(true);
    expect(directive.disabled).toBeTruthy();
    expect(directive.hostDisabled).toBe('disabled');
  });

  it('should set disabled if initially set', () => {
    expect(directive.hostDisabled).toBe(null);
    directive.setDisabledStateInit(true);
    expect(directive.disabled).toBeTruthy();
    expect(directive.hostDisabled).toBe('disabled');
  });

  it('should set invalid', () => {
    directive.invalid = true;
    expect(directive.invalid).toBeTruthy();
    expect(directive.ariaInvalid).toBeTruthy();
  });

  it('should set required', () => {
    directive.required = true;
    expect(directive.required).toBeTruthy();
  });

  // it('should handle blur event', () => {
  //   directive.value = 'input value';
  //   directive.onTouched = jest.fn();
  //   directive.handleBlur(new Event('blur'));
  //   expect(directive.onTouched).toHaveBeenCalled();
  // });

  it('should change value if reset', () => {
    directive.value = 'initial value';
    expect(directive.value).toBe('initial value');
    directive.value = null;
    expect(directive.value).toBeFalsy();
  });

  it('should handle change event', () => {
    const spy = jest.spyOn(directive, 'handleChange');
    const mockEvent = {
      target: {
        value: 'test value'
      }
    } as any;

    directive.handleChange(mockEvent);
    expect(spy).toHaveBeenCalled();
  });

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

  it('should get host id', () => {
    directive.id = 'test';
    expect(directive.hostId).toBe('test');
  });

  it('should handle focus', () => {
    const spy = jest.spyOn(directive, 'onTouched');
    directive.handleBlur(new Event('blur'));
    directive.handleFocus(new Event('focus'));
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should write value', () => {
    const testValue = 'test value';
    directive.val = testValue;
    expect(directive.val).toBe(testValue);
  });

  it("shouldn't write empty value", () => {
    directive.val = '';
    expect(directive.val).toBe(undefined);
  });

  it('should adjust the default disabled value from control on init', () => {
    directive = new SelectDirective(el, appReadyService, { disabled: true } as any);
    directive.ngOnInit();
    expect(directive.disabled).toBe(true);
  });
});
