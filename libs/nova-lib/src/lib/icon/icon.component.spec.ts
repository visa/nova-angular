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
import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IconComponent } from './icon.component';
import { IconLibrary, IconSize } from './icon.constants';

@Component({
  standalone: true,
  imports: [IconComponent],
  template: `<svg v-icon></svg>`
})
class TestIconComponent {
  @ViewChild(IconComponent) iconComponent: IconComponent;
}

describe('IconComponent', () => {
  let component: TestIconComponent;
  let fixture: ComponentFixture<TestIconComponent>;
  let htmlEl: HTMLElement;

  beforeEach(() => {
    fixture = TestBed.createComponent(TestIconComponent);
    component = fixture.componentInstance;
    htmlEl = fixture.nativeElement.querySelector('[v-icon]');
    fixture.detectChanges();
  });

  it('should exist', () => {
    expect(component).toBeTruthy();
  });

  describe('Input properties', () => {
    it(`should have 'v-icon' class by default`, () => {
      expect(htmlEl.classList.toString()).toEqual(expect.stringContaining('v-icon'));
    });

    it('should add custom class', () => {
      component.iconComponent.class = 'v-icon-custom';
      fixture.detectChanges();
      expect(htmlEl.classList.toString()).toEqual(expect.stringContaining('v-icon-custom'));
    });

    describe('icon size', () => {
      it(`should have 'v-icon-tiny' by default`, () => {
        expect(htmlEl.classList.toString()).toEqual(expect.stringContaining('v-icon-tiny'));
      });

      it(`should have tiny set to true by default`, () => {
        expect(component.iconComponent.iconSize).toEqual(IconSize.TINY);
      });

      it(`should have 'v-icon-low' class when size is low`, () => {
        component.iconComponent.iconSize = IconSize.LOW;
        fixture.detectChanges();
        expect(htmlEl.classList.toString()).toEqual(expect.stringContaining('v-icon-low'));
      });

      it(`should have 'v-icon-high' class when size is high`, () => {
        component.iconComponent.iconSize = IconSize.HIGH;
        fixture.detectChanges();
        expect(htmlEl.classList.toString()).toEqual(expect.stringContaining('v-icon-high'));
      });

      it('should set appropriate icon style sizes when tiny', () => {
        component.iconComponent.iconSize = IconSize.TINY;
        fixture.detectChanges();
        expect(component.iconComponent._computedSize).toEqual(16);
        expect(htmlEl.getAttribute('height')).toEqual('16');
        expect(htmlEl.getAttribute('width')).toEqual('16');
        expect(htmlEl.getAttribute('viewBox')).toEqual('0 0 16 16');
      });

      it('should set appropriate icon style sizes when low', () => {
        component.iconComponent.iconSize = IconSize.LOW;
        fixture.detectChanges();
        expect(component.iconComponent._computedSize).toEqual(24);
        expect(htmlEl.getAttribute('height')).toEqual('24');
        expect(htmlEl.getAttribute('width')).toEqual('24');
        expect(htmlEl.getAttribute('viewBox')).toEqual('0 0 24 24');
      });

      it('should set appropriate icon style sizes when high', () => {
        component.iconComponent.iconSize = IconSize.HIGH;
        fixture.detectChanges();
        expect(component.iconComponent._computedSize).toEqual(48);
        expect(htmlEl.getAttribute('height')).toEqual('48');
        expect(htmlEl.getAttribute('width')).toEqual('48');
        expect(htmlEl.getAttribute('viewBox')).toEqual('0 0 48 48');
      });

      it('should set rtl class', () => {
        component.iconComponent.rtl = true;
        expect(component.iconComponent.hostClass).toBe(' v-icon v-icon-tiny v-icon-visa  v-icon-rtl');
      });

      it('should set custom height', () => {
        component.iconComponent.customHeight = '50';
        expect(component.iconComponent.customHeight).toBe('50');
      });

      it('should set custom width', () => {
        component.iconComponent.customWidth = '50';
        expect(component.iconComponent.customWidth).toBe('50');
      });
    });

    describe('icon library', () => {
      it('should default to Visa library', () => {
        expect(component.iconComponent.library).toEqual(IconLibrary.VISA);
      });

      it(`should have 'v-icon-visa' class by default`, () => {
        expect(htmlEl.classList.toString()).toEqual(expect.stringContaining('v-icon-visa'));
      });

      it('should set new icon library when generic is passed', () => {
        component.iconComponent.library = IconLibrary.GENERIC;
        fixture.detectChanges();
        expect(component.iconComponent.library).toEqual(IconLibrary.GENERIC);
      });

      it(`should have 'v-icon-generic' class when generic is true`, () => {
        component.iconComponent.library = IconLibrary.GENERIC;
        fixture.detectChanges();
        expect(htmlEl.classList.toString()).toEqual(expect.stringContaining('v-icon-generic'));
      });
    });

    describe('icon reference', () => {
      const iconReference = 'chevron-down';
      it('should create the correct icon string', () => {
        component.iconComponent.icon = iconReference;
        fixture.detectChanges();
        expect(component.iconComponent._iconRef).toEqual(`${IconLibrary.VISA}-${iconReference}-${IconSize.TINY}`);
      });

      it('should reference the given icon', () => {
        component.iconComponent.icon = iconReference;
        fixture.detectChanges();
        const use = htmlEl.querySelector('use');
        if (use) expect(use.getAttribute('xlink:href')).toEqual(expect.stringContaining(`${iconReference}`));
      });

      it('should reference the custom icon if given', () => {
        component.iconComponent.customIcon = 'custom-icon-reference';
        fixture.detectChanges();
        const use = htmlEl.querySelector('use');
        if (use) expect(use.getAttribute('xlink:href')).toEqual('#custom-icon-reference');
      });
    });

    it('should have a badge ellipse if isBadgeEllipse is true', () => {
      component.iconComponent.isBadgeEllipse = true;
      fixture.detectChanges();
      expect(htmlEl.querySelector('circle')).toBeTruthy();
    });
  });
});
