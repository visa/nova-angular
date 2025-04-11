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
import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RadioDirective } from '../radio/radio.directive';
import { RadioGroupDirective } from './radio-group.directive';

@Component({
  template: ` <div v-radio-group [required]="required" [invalid]="invalid" [disabled]="disabled">
    <div>
      <input id="radio-group-error-1" name="radio-group-error" v-radio value="1" />
      <label for="radio-group-error-1">Label 1</label>
    </div>
    <div>
      <input id="radio-group-error-2" name="radio-group-error" v-radio value="2" />
      <label for="radio-group-error-2">Label 2</label>
    </div>
    <div>
      <input id="radio-group-error-3" name="radio-group-error" v-radio value="3" />
      <label for="radio-group-error-3">Label 3</label>
    </div>
  </div>`
})
class TestRadioGroupComponent {
  @ViewChild(RadioGroupDirective) radioGroup: RadioGroupDirective;
  required: boolean = false;
  invalid: boolean = false;
  disabled: boolean = false;
}

describe('RadioGroupDirective', () => {
  let component: TestRadioGroupComponent;
  let fixture: ComponentFixture<TestRadioGroupComponent>;
  let htmlEl: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestRadioGroupComponent],
      imports: [RadioGroupDirective, RadioDirective]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestRadioGroupComponent);
    component = fixture.componentInstance;
    htmlEl = fixture.nativeElement.querySelector('[v-radio-group]');
    fixture.detectChanges();
  });

  it('should exist', () => {
    expect(component).toBeTruthy();
  });

  describe('Input properties', () => {
    it(`should have aria-required if required is true`, () => {
      component.required = true;
      fixture.detectChanges();
      expect(htmlEl.getAttribute('aria-required')).toEqual('true');
    });

    it(`should not have attribute required if required is true`, () => {
      component.required = true;
      fixture.detectChanges();
      expect(htmlEl.getAttribute('required')).toBeFalsy();
    });

    it('should update children disabled property if disabled', () => {
      component.disabled = true;
      fixture.detectChanges();
      expect(component.radioGroup.radios.toArray().every((radio) => radio.disabled)).toBeTruthy();
    });

    it('should update children invalid property if invalid', () => {
      component.invalid = true;
      fixture.detectChanges();
      expect(component.radioGroup.radios.toArray().every((radio) => radio.invalid)).toBeTruthy();
    });

    it('should have role=radio group by default', () => {
      expect(htmlEl.getAttribute('role')).toEqual('radiogroup');
    });

    it('should allow custom role to be passed', () => {
      component.radioGroup.role = 'test-role';
      fixture.detectChanges();
      expect(htmlEl.getAttribute('role')).toEqual('test-role');
    });
  });

  describe('form integration', () => {
    it('should have no value if no value is selected', () => {
      expect(component.radioGroup.value).toBeFalsy();
    });

    it('should have value if a radio is selected on init', () => {
      component.radioGroup.radios.first.checked = true;
      component.radioGroup.ngAfterContentInit();
      expect(component.radioGroup.value).toEqual('1');
    });

    it('should update radio selected if value is set on init', () => {
      component.radioGroup.value = '2';
      component.radioGroup.ngAfterContentInit();
      const selectedRadio = component.radioGroup.radios.toArray().find((radio) => radio.radioValue == '2');
      if (selectedRadio) expect(selectedRadio.checked).toBeTruthy();
    });

    it('should reset checked states if no value', () => {
      component.radioGroup.radios.first.checked = true;
      component.radioGroup.value = null;
      fixture.detectChanges();
      expect(component.radioGroup.radios.toArray().every((radio) => !radio.checked)).toBeTruthy();
      expect(component.radioGroup.radios.first.el.nativeElement.checked).toBeFalsy();
    });

    it('should allow setting of disabled state', () => {
      component.radioGroup.setDisabledState(true);
      expect(component.radioGroup.groupDisabled).toBeTruthy();
    });

    it('should handle change events', () => {
      component.radioGroup.handleChange({ target: { value: '1' } } as any);
      fixture.detectChanges();
      expect(component.radioGroup.radios.first.checked).toBe(true);
    });

    it('should handle blur events', () => {
      component.radioGroup.handleChange({ target: { value: '1' } } as any);
      fixture.detectChanges();
      expect(component.radioGroup.radios.first.checked).toBe(true);
    });

    it('should handle focus', () => {
      const spy = jest.spyOn(component.radioGroup, 'onTouched');
      htmlEl.dispatchEvent(new Event('blur'));
      expect(spy).toHaveBeenCalled();
    });

    it('should registerOnChange', () => {
      const fn = jest.fn();
      component.radioGroup.registerOnChange(fn);
      expect(component.radioGroup.onChange).toBe(fn);
    });

    it('should registerOnTouched', () => {
      const fn = jest.fn();
      component.radioGroup.registerOnTouched(fn);
      expect(component.radioGroup.onTouched).toBe(fn);
    });

    it('should write value', () => {
      component.radioGroup.writeValue('1');
      fixture.detectChanges();
      expect(component.radioGroup.radios.first.checked).toBe(true);
    });

    it('should disable radios if disabled', () => {
      component.radioGroup.setDisabledState(true);
      component.radioGroup.ngAfterContentInit();
      fixture.detectChanges();
      expect(component.radioGroup.radios.toArray().every((radio) => radio.disabled)).toBeTruthy();
    });

    it('should invalidate radios if invalid', () => {
      component.radioGroup.groupInvalid = true;
      component.radioGroup.ngAfterContentInit();
      fixture.detectChanges();
      expect(component.radioGroup.radios.toArray().every((radio) => radio.invalid)).toBeTruthy();
    });

    it('should require radios if required', () => {
      component.radioGroup.groupRequired = true;
      component.radioGroup.ngAfterContentInit();
      fixture.detectChanges();
      expect(component.radioGroup.radios.toArray().every((radio) => radio.required)).toBeTruthy();
    });
  });
});
