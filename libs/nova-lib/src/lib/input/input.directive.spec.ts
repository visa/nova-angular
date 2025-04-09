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
import { TestBed } from '@angular/core/testing';
import { AppReadyService } from '../_utilities/services/app-stable-check.service';
import { UUIDService } from '../_utilities/services/uuid.service';
import { InputDirective } from './input.directive';

describe('InputDirective', () => {
  let directive: InputDirective;
  let uuidService: UUIDService;
  let el: ElementRef;
  let appReadyService: AppReadyService;

  beforeEach(() => {
    uuidService = TestBed.inject(UUIDService);
    appReadyService = TestBed.inject(AppReadyService);
    el = new ElementRef(document.createElement('input'));
    directive = new InputDirective(el, uuidService, appReadyService);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should set default value oninit', () => {
    directive.value = 'test';
    expect(directive.val).toBe('test');
  });

  it('should have the right class', () => {
    expect(directive.hostClass).toContain('v-input');
  });

  it('should have the right role', () => {
    directive.role = 'test';
    expect(directive.role).toBe('test');
    expect(directive.hostRole).toBe('test');
  });

  it('should set readonly', () => {
    expect(directive.hostReadonly).toBe(null);
    directive.readonly = true;
    expect(directive.readonly).toBeTruthy();
    expect(directive.hostReadonly).toBe('readonly');
  });
  it('should set disabled', () => {
    expect(directive.hostDisabled).toBe(null);
    directive.setDisabledState(true);
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

  it('should set aria expanded', () => {
    directive.ariaExpanded = true;
    expect(directive.ariaExpanded).toBeTruthy();
    expect(directive.hostAriaExpanded).toBe('true');
  });

  it('should set aria autocomplete', () => {
    directive._inCombobox = true;
    expect(directive.hostAriaAutocomplete).toBe('list');
    directive.ariaAutocomplete = 'true';
    expect(directive.ariaAutocomplete).toBe('true');
    expect(directive.hostAriaAutocomplete).toBe('true');
  });

  it('should set aria haspopup', () => {
    directive._inCombobox = true;
    expect(directive.hostAriaHaspopup).toBe('listbox');
    directive.ariaHaspopup = 'true';
    expect(directive.hostAriaHaspopup).toBe('true');
  });

  it('should set aria controls', () => {
    directive.ariaControls = 'test-1';
    expect(directive.hostAriaControls).toBe('test-1');
  });
  it('should set aria activedescendant', () => {
    directive.ariaActiveDescendant = 'test-1';
    expect(directive.hostAriaActiveDescendant).toBe('test-1');
  });

  it('should set aria owns', () => {
    directive.ariaOwns = 'true';
    expect(directive.hostAriaOwns).toBe('true');
  });

  // commenting out. blur event is empty
  // it('should handle blur event', () => {
  //   directive.value = 'input value';
  //   directive.onTouched = jest.fn();
  //   directive.handleBlur(new Event('blur'));
  //   expect(directive.onTouched).toHaveBeenCalled();
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
    directive.value = testValue;
    directive.writeValue(testValue);
    expect(directive.val).toBe(testValue);
  });

  it('should handle focus event', () => {
    directive.focused.emit = jest.fn();
    directive.handleFocus(new Event('focus'));
    expect(directive.focused.emit).toHaveBeenCalled();
  });

  it('should handle input event', () => {
    const testValue = 'test value';
    const inputEvent = new Event('input');
    const isBrowserAndDomAvailableSpy = jest.spyOn(AppReadyService.prototype, 'isBrowserAndDomAvailable');
    isBrowserAndDomAvailableSpy.mockReturnValue(true);

    directive.inputEvent.emit = jest.fn();
    directive.el.nativeElement.value = testValue;
    directive.handleInput(inputEvent);
    expect(directive.el.nativeElement.value).toBe(testValue);
    expect(directive.inputEvent.emit).toHaveBeenCalledWith(testValue);
    isBrowserAndDomAvailableSpy.mockRestore();
  });

  it('should set class value', () => {
    directive.class = 'test';
    expect(directive.class).toBe('test v-input  ');
  });

  it('should set otp', () => {
    directive.otp = true;
    expect(directive.otp).toBeTruthy();
    expect(directive.class).toBe(' v-input v-input-otp ');
  });

  it('should set noResize', () => {
    directive.noResize = true;
    expect(directive.noResize).toBeTruthy();
    expect(directive.class).toBe(' v-input  v-input-resize-none');
  });

  it('should set val correctly', () => {
    directive.val = 'test';
    directive.handleBlur(new Event('blur'));
    expect(directive.el.nativeElement.value).toBe('test');
  });

  it('should handle read only space', () => {
    directive.readonly = true;
    directive.handleReadonlySpace(new KeyboardEvent('keydown', { key: ' ' }));
    expect(directive.el.nativeElement.value).toBe('');
  });
});
