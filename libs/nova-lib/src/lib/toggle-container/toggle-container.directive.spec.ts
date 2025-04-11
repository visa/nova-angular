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
import { UUIDService } from '../_utilities/services/uuid.service';
import { CheckboxDirective } from '../checkbox/checkbox.directive';
import { RadioDirective } from '../radio/radio.directive';
import { ToggleButtonDirective } from '../toggle-button/toggle-button.directive';
import { ToggleContainerDirective } from './toggle-container.directive';

@Component({
  template: `
    <fieldset v-toggle-container>
      <label><input v-radio *ngIf="toggleShow" /></label>
      <label><input v-radio checked /></label>
    </fieldset>
  `
})
class TestRadioToggleComponent {
  toggleShow = false;
}

describe('ToggleContainerDirective using radios', () => {
  let fixture: ComponentFixture<TestRadioToggleComponent>;
  let containerDirective: ToggleContainerDirective;
  let uuidService: UUIDService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestRadioToggleComponent],
      imports: [ToggleContainerDirective, RadioDirective]
    });

    fixture = TestBed.createComponent(TestRadioToggleComponent);
    containerDirective = fixture.debugElement
      .query(By.directive(ToggleContainerDirective))
      .injector.get(ToggleContainerDirective);
    uuidService = TestBed.inject(UUIDService);
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(containerDirective).toBeTruthy();
  });

  it('should assign names to radios on ngAfterContentInit', () => {
    const spy = jest.spyOn(containerDirective.radios.changes, 'subscribe');
    const spy2 = jest.spyOn(containerDirective, 'unsubscribeFromListeners');
    const spy3 = jest.spyOn(containerDirective, 'setUpRadios');
    expect(containerDirective.radios.length).toBe(1);
    containerDirective.ngAfterContentInit();
    fixture.componentInstance.toggleShow = true;

    fixture.detectChanges();

    expect(containerDirective.radios.length).toBe(2);
    containerDirective.radios.forEach((radio) => {
      radio.name ? expect(radio.name).toBe(radio.name) : expect(radio.name).toBe(containerDirective.name);
    });
    expect(spy).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
    expect(spy3).toHaveBeenCalled();
  });

  it('should assign a default name if not specified', () => {
    const uuid = 'v-toggle';
    jest.spyOn(uuidService, 'getUUID');
    expect(containerDirective.name).toContain(uuid);
  });

  it('should assign custom classes', () => {
    containerDirective.class = 'custom-class';
    expect(containerDirective.hostClasses).toBe('custom-class');
  });

  it('should disable all radios when disabled is true', () => {
    containerDirective.disabled = true;
    fixture.detectChanges();
    containerDirective.radios.forEach((radio) => {
      expect(radio.disabled).toBe(true);
    });
  });

  it('should clear all selections when clear is called', () => {
    containerDirective.clear();
    fixture.detectChanges();
    containerDirective.radios.forEach((radio) => {
      expect(radio.checked).toBe(false);
    });
    expect(containerDirective.value).toBeNull();
  });
});

@Component({
  template: `
    <fieldset v-toggle-container>
      <label><input v-checkbox *ngIf="toggleShow" /></label>
      <label><input v-checkbox checked /></label>
    </fieldset>
  `
})
class TestCheckboxToggleComponent {
  toggleShow = false;
}

describe('ToggleContainerDirective using checkboxes', () => {
  let fixture: ComponentFixture<TestCheckboxToggleComponent>;
  let containerDirective: ToggleContainerDirective;
  let uuidService: UUIDService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestCheckboxToggleComponent],
      imports: [ToggleContainerDirective, CheckboxDirective]
    });

    fixture = TestBed.createComponent(TestCheckboxToggleComponent);
    containerDirective = fixture.debugElement
      .query(By.directive(ToggleContainerDirective))
      .injector.get(ToggleContainerDirective);
    uuidService = TestBed.inject(UUIDService);
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(containerDirective).toBeTruthy();
  });

  it('should be multiselect', () => {
    expect(containerDirective.multiselect).toBeTruthy();
  });

  it('should recognize correct number of checkboxes, including on change', () => {
    const spy = jest.spyOn(containerDirective.checkboxes.changes, 'subscribe');
    const spy2 = jest.spyOn(containerDirective, 'unsubscribeFromListeners');
    const spy3 = jest.spyOn(containerDirective, 'setUpCheckboxes');

    expect(containerDirective.checkboxes.length).toBe(1);
    containerDirective.ngAfterContentInit();
    fixture.componentInstance.toggleShow = true;

    fixture.detectChanges();

    expect(containerDirective.checkboxes.length).toBe(2);
    expect(spy).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
    expect(spy3).toHaveBeenCalled();
  });

  it('should assign each checkbox a value if not given', () => {
    const uuid = 'v-checkbox-';
    containerDirective.checkboxes.forEach((checkbox) => {
      expect(checkbox.checkboxValue).toContain(uuid);
    });
  });

  it('should disable all checkboxes when disabled is true', () => {
    containerDirective.disabled = true;
    fixture.detectChanges();
    containerDirective.checkboxes.forEach((checkbox) => {
      expect(checkbox.disabled).toBe(true);
    });
  });

  it('should clear all selections when clear is called', () => {
    containerDirective.clear();
    fixture.detectChanges();
    containerDirective.checkboxes.forEach((checkbox) => {
      expect(checkbox.checked).toBe(false);
    });
    expect(containerDirective.value).toBeNull();
  });
});

@Component({
  template: `
    <fieldset v-toggle-container>
      <button v-toggle vGap="6" active>Label 1</button>
      <button v-toggle vGap="6">Label 2</button>
      <button v-toggle vGap="6" *ngIf="toggleShow">Label 3</button>
    </fieldset>
  `
})
class TestToggleContainerComponent {
  toggleShow = true;
}
describe('ToggleContainerDirective using toggle buttons', () => {
  let fixture: ComponentFixture<TestToggleContainerComponent>;
  let containerDirective: ToggleContainerDirective;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestToggleContainerComponent],
      imports: [ToggleContainerDirective, ToggleButtonDirective]
    });

    fixture = TestBed.createComponent(TestToggleContainerComponent);
    containerDirective = fixture.debugElement
      .query(By.directive(ToggleContainerDirective))
      .injector.get(ToggleContainerDirective);
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(containerDirective).toBeTruthy();
  });

  it('should initialize with the correct number of buttons', () => {
    expect(containerDirective.buttons.length).toBe(3);
  });

  it('should recognize correct number of buttons, including on change', () => {
    const spy = jest.spyOn(containerDirective.buttons.changes, 'subscribe');
    const spy2 = jest.spyOn(containerDirective, 'unsubscribeFromListeners');
    const spy3 = jest.spyOn(containerDirective, 'setUpButtons');

    expect(containerDirective.buttons.length).toBe(3);
    containerDirective.ngAfterContentInit();
    fixture.componentInstance.toggleShow = false;

    fixture.detectChanges();

    expect(containerDirective.buttons.length).toBe(2);
    expect(spy).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
    expect(spy3).toHaveBeenCalled();
  });

  it('should update value when a button is clicked', () => {
    const button = containerDirective.buttons.toArray()[1];
    button.clicked.emit();
    fixture.detectChanges();
    expect(containerDirective.value).toBe(button.value);
  });

  it('should allow multiple selections when multiselect is true', () => {
    const button1 = containerDirective.buttons.toArray()[0]; // already active
    const button2 = containerDirective.buttons.toArray()[1];
    containerDirective.multiselect = true;
    containerDirective.value = [];
    button1.clicked.emit();
    button2.clicked.emit();
    fixture.detectChanges();
    expect(containerDirective.value).toEqual([button1.value, button2.value]);
  });

  it('should disable all buttons when disabled is true', () => {
    containerDirective.disabled = true;
    fixture.detectChanges();
    containerDirective.buttons.forEach((button) => {
      expect(button.disabled).toBe(true);
    });
  });

  it('should clear all selections when clear is called', () => {
    containerDirective.clear();
    fixture.detectChanges();
    containerDirective.buttons.forEach((button) => {
      expect(button.active).toBe(false);
    });
    expect(containerDirective.value).toBeNull();
  });
});
