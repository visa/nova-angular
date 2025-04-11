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
import { CheckboxDirective } from '../checkbox/checkbox.directive';
import { InputContainerComponent } from '../input-container/input-container.component';
import { InputDirective } from '../input/input.directive';
import { LabelDirective } from '../label/label.directive';
import { ToggleControlService } from '../toggle-control/toggle-control.service';
import { RadioDirective } from './../radio/radio.directive';
import { CheckboxPanelDirective } from './checkbox-panel.directive';

@Component({
  standalone: true,
  template: `
    <div v-checkbox-panel>
      <div v-input-container>
        <input id="checkbox-panel-without-a-description" value="checkbox-panel-without-description-value" v-checkbox />
        <label v-label for="checkbox-panel-without-a-description">Label</label>
      </div>
    </div>
  `,
  imports: [CheckboxDirective, InputDirective, InputContainerComponent, CheckboxPanelDirective, LabelDirective],
  providers: [ToggleControlService]
})
class TestCheckboxComponent {}

@Component({
  standalone: true,
  template: `
    <div v-checkbox-panel>
      <div v-input-container>
        <input id="radio-with-label" name="radio-with-label" v-radio value="radio-with-label" />
        <label v-label for="radio-with-label">Label</label>
      </div>
    </div>
  `,
  imports: [RadioDirective, InputDirective, InputContainerComponent, CheckboxPanelDirective, LabelDirective],
  providers: [ToggleControlService]
})
class TestRadioComponent {}

describe('CheckboxPanelDirective', () => {
  describe('CheckboxPanelDirective with a checkbox', () => {
    let directive: CheckboxPanelDirective;
    let fixture: ComponentFixture<TestCheckboxComponent>;
    let component: TestCheckboxComponent;

    beforeEach(async () => {
      //   await TestBed.configureTestingModule({
      //     declarations: [TestCheckboxComponent],
      //     imports: [CheckboxPanelDirective, CheckboxDirective, NovaLibModule],
      //     providers: [{ provide: ComponentFixtureAutoDetect, useValue: true }]
      //   }).compileComponents();

      fixture = TestBed.createComponent(TestCheckboxComponent);
      component = fixture.componentInstance;
      directive = fixture.debugElement.query(By.directive(CheckboxPanelDirective)).injector.get(CheckboxPanelDirective);

      fixture.detectChanges();
    });

    it('should create an instance', () => {
      expect(directive).toBeTruthy();
    });

    it('should have a checkbox', () => {
      expect(directive.checkbox).toBeTruthy();
    });

    it('should handle click event', () => {
      const event = new Event('click');
      directive.handleClick(event);
      expect(directive.checkbox.checked).toBe(true);
    });
  });

  describe('CheckboxPanelDirective with a radio', () => {
    let directive: CheckboxPanelDirective;
    let fixture: ComponentFixture<TestRadioComponent>;
    let component: TestRadioComponent;

    beforeEach(async () => {
      //   await TestBed.configureTestingModule({
      //     declarations: [TestRadioComponent],
      //     imports: [CheckboxPanelDirective, RadioDirective, NovaLibModule],
      //     providers: [{ provide: ComponentFixtureAutoDetect, useValue: true }]
      //   }).compileComponents();

      fixture = TestBed.createComponent(TestRadioComponent);
      component = fixture.componentInstance;
      directive = fixture.debugElement.query(By.directive(CheckboxPanelDirective)).injector.get(CheckboxPanelDirective);

      fixture.detectChanges();
    });

    it('should create an instance', () => {
      expect(directive).toBeTruthy();
    });

    it('should have a checkbox', () => {
      expect(directive.radio).toBeTruthy();
    });

    it('should handle click event', () => {
      const event = new Event('click');
      directive.handleClick(event);
      expect(directive.radio.checked).toBe(true);
    });
  });
});
