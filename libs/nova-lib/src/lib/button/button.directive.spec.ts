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
import { BadgeDirective } from '../badge/badge.directive';
import { ButtonDisabledDirective } from '../button-disabled/button-disabled.directive';
import { ButtonColor, ButtonSize } from './button.constants';
import { ButtonDirective } from './button.directive';

@Component({
  standalone: true,
  imports: [ButtonDirective, ButtonDisabledDirective],
  template: `<button v-button>Action</button>`
})
class TestButtonComponent {
  @ViewChild(ButtonDirective) buttonDirective: ButtonDirective;
}

describe('ButtonDirective', () => {
  let component: TestButtonComponent;
  let fixture: ComponentFixture<TestButtonComponent>;
  let htmlEl: HTMLElement;

  beforeEach(() => {
    fixture = TestBed.createComponent(TestButtonComponent);
    component = fixture.componentInstance;
    htmlEl = fixture.nativeElement.querySelector('[v-button]');
    fixture.detectChanges();
  });

  it('should exist', () => {
    expect(component).toBeTruthy();
  });

  describe('Button properties', () => {
    it(`should have 'v-button' class by default`, () => {
      expect(htmlEl.classList.toString()).toEqual(expect.stringContaining('v-button'));
    });

    it(`should add subtle class when subtle is true`, () => {
      component.buttonDirective.subtle = true;
      fixture.detectChanges();
      expect(htmlEl.classList.toString()).toEqual(expect.stringContaining('v-button-subtle'));
    });

    it(`should add destructive class when destructive is true`, () => {
      component.buttonDirective.destructive = true;
      fixture.detectChanges();
      expect(htmlEl.classList.toString()).toEqual(expect.stringContaining('v-button-destructive'));
    });

    it('should allow ariaHaspopup getter and host binding', () => {
      component.buttonDirective.ariaHaspopup = 'true';
      fixture.detectChanges();
      expect(component.buttonDirective.hostAriaHaspopup).toBe('true');
    });

    it('should allow tabindex', () => {
      component.buttonDirective.tabindex = 1;
      fixture.detectChanges();
      expect(component.buttonDirective.tabindex).toBe(1);
    });

    it('should add custom class', () => {
      component.buttonDirective.class = 'v-button-custom';
      fixture.detectChanges();
      expect(htmlEl.classList.toString()).toEqual(expect.stringContaining('v-button-custom'));
    });

    describe('Button color', () => {
      it(`should not have a color class when color is primary`, () => {
        expect(htmlEl.classList.toString()).toEqual(expect.not.stringContaining('v-button-primary'));
      });

      it(`should have 'v-button-secondary' class when color is secondary`, () => {
        component.buttonDirective.buttonColor = ButtonColor.SECONDARY;
        fixture.detectChanges();
        expect(htmlEl.classList.toString()).toEqual(expect.stringContaining('v-button-secondary'));
      });

      it(`should have 'v-button-tertiary' class when color is tertiary`, () => {
        component.buttonDirective.buttonColor = ButtonColor.TERTIARY;
        fixture.detectChanges();
        expect(htmlEl.classList.toString()).toEqual(expect.stringContaining('v-button-tertiary'));
      });
    });

    describe('Button size', () => {
      it(`should not have a size class when size is medium`, () => {
        expect(htmlEl.classList.toString()).toEqual(expect.not.stringContaining('v-button-medium'));
      });

      it(`should have 'v-button-small' class when size is small`, () => {
        component.buttonDirective.buttonSize = ButtonSize.SMALL;
        fixture.detectChanges();
        expect(htmlEl.classList.toString()).toEqual(expect.stringContaining('v-button-small'));
      });

      it(`should have 'v-button-large' class when size is large`, () => {
        component.buttonDirective.buttonSize = ButtonSize.LARGE;
        fixture.detectChanges();
        expect(htmlEl.classList.toString()).toEqual(expect.stringContaining('v-button-large'));
      });
    });

    it(`should log when the user sets the role`, () => {
      component.buttonDirective.role = 'button';
      fixture.detectChanges();
      expect(component.buttonDirective._roleSetByUser).toBeTruthy();
    });

    it(`should log when the user sets the buttonColor`, () => {
      component.buttonDirective.buttonColor = ButtonColor.SECONDARY;
      fixture.detectChanges();
      expect(component.buttonDirective._buttonColorSetByUser).toBeTruthy();
    });

    it(`should log when the user sets the buttonSize`, () => {
      component.buttonDirective.buttonSize = ButtonSize.LARGE;
      fixture.detectChanges();
      expect(component.buttonDirective._buttonSizeSetByUser).toBeTruthy();
    });
  });

  describe('Events', () => {
    it('should not be clickable when disabled', () => {
      jest.spyOn(component.buttonDirective.clicked, 'emit');
      component.buttonDirective.disabled = true;
      fixture.detectChanges();
      htmlEl.click();
      expect(component.buttonDirective.clicked.emit).not.toHaveBeenCalled();
    });

    it('should emit clicked when clicked', () => {
      jest.spyOn(component.buttonDirective.clicked, 'emit');
      fixture.detectChanges();
      htmlEl.click();
      expect(component.buttonDirective.clicked.emit).toHaveBeenCalled();
    });

    it('should trigger hostFocus when focused', () => {
      jest.spyOn(component.buttonDirective, 'hostFocus');
      htmlEl.focus();
      expect(component.buttonDirective.hostFocus).toHaveBeenCalled();
    });

    it('should trigger hostBlur when blurred', () => {
      jest.spyOn(component.buttonDirective, 'hostBlur');
      htmlEl.focus();
      htmlEl.blur();
      expect(component.buttonDirective.hostBlur).toHaveBeenCalled();
    });
  });
});

@Component({
  standalone: true,
  imports: [ButtonDirective, BadgeDirective, ButtonDisabledDirective],
  template: `<button v-button-icon aria-label="notifications" buttonColor="tertiary">
    <svg v-icon icon="notifications"></svg>
    <sup v-badge type="number" aria-label="9 unread notifications">9</sup>
  </button>`
})
class TestButtonWithBadgeComponent {
  @ViewChild(ButtonDirective) buttonDirective: ButtonDirective;
}

describe('ButtonDirective with child badge', () => {
  let component: TestButtonWithBadgeComponent;
  let fixture: ComponentFixture<TestButtonWithBadgeComponent>;
  let htmlEl: HTMLElement;

  beforeEach(() => {
    fixture = TestBed.createComponent(TestButtonWithBadgeComponent);
    component = fixture.componentInstance;
    htmlEl = fixture.nativeElement.querySelector('[v-button]');
    fixture.detectChanges();
  });

  it('should exist', () => {
    expect(component).toBeTruthy();
  });

  // it('should have a child BadgeDirective', () => {
  //   expect(component.buttonDirective.badge).toBeTruthy();
  // });

  // it('should have an aria-describedby equal to the badge ID', () => {
  //   expect(component.buttonDirective.ariaDescribedby).toEqual(component.buttonDirective.badge.id);
  // });
});
