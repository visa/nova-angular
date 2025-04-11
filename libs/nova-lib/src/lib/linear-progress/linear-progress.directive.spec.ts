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
import { LinearProgressDirective } from './linear-progress.directive';

@Component({
  template: `<progress v-progress-linear></progress><label v-label progressLabel>Label</label> `
})
class TestLinearProgressDirective {
  @ViewChild(LinearProgressDirective) progress: LinearProgressDirective;
}

describe('LinearProgressDirective', () => {
  let component: TestLinearProgressDirective;
  let fixture: ComponentFixture<TestLinearProgressDirective>;
  let htmlEl: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestLinearProgressDirective],
      imports: [LinearProgressDirective]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestLinearProgressDirective);
    component = fixture.componentInstance;
    htmlEl = fixture.nativeElement.querySelector('[v-progress-linear]');
    fixture.detectChanges();
  });

  it('should exist', () => {
    expect(component).toBeTruthy();
  });

  describe('Input properties', () => {
    it(`should have 'v-progress' class by default`, () => {
      expect(htmlEl.classList.toString()).toEqual(expect.stringContaining('v-progress'));
    });

    it(`should have 'v-progress-bar' class by default`, () => {
      expect(htmlEl.classList.toString()).toEqual(expect.stringContaining('v-progress-bar'));
    });

    it('should add custom class', () => {
      component.progress.class = 'v-progress-custom';
      fixture.detectChanges();
      expect(htmlEl.classList.toString()).toEqual(expect.stringContaining('v-progress-custom'));
    });

    it('should be indeterminate by default', () => {
      expect(component.progress.determinate).toBeFalsy();
    });

    it('should have indeterminate class by default', () => {
      expect(htmlEl.classList.toString()).toEqual(expect.stringContaining('v-progress-indeterminate'));
    });

    it('should not have indeterminate class when determinate is true', () => {
      component.progress.determinate = true;
      fixture.detectChanges();
      expect(htmlEl.classList.toString()).toEqual(expect.not.stringContaining('v-progress-indeterminate'));
    });

    it('should have the complete class when determinate is true and percentage is max', () => {
      component.progress.max = 300;
      component.progress.percentage = 300;
      component.progress.determinate = true;
      fixture.detectChanges();
      expect(htmlEl.classList.toString()).toEqual(expect.stringContaining('v-progress-complete'));
    });

    it('should have error class when invalid', () => {
      component.progress.invalid = true;
      fixture.detectChanges();
      expect(htmlEl.classList.toString()).toEqual(expect.stringContaining('v-progress-error'));
    });

    it('should have a max hostbinding set to max if determinate', () => {
      component.progress.max = 300;
      component.progress.determinate = true;
      fixture.detectChanges();
      expect(htmlEl.getAttribute('max')).toEqual('300');
    });

    it('should have a max hostbinding set to 1 if indeterminate', () => {
      component.progress.max = 300;
      fixture.detectChanges();
      expect(htmlEl.getAttribute('max')).toEqual('1');
    });

    it('should have a value hostbinding if value is given when determinate', () => {
      component.progress.determinate = true;
      component.progress.value = 30;
      fixture.detectChanges();
      expect(htmlEl.getAttribute('value')).toEqual('30');
    });

    it('should have a value hostbinding if percentage is given when determinate', () => {
      component.progress.determinate = true;
      component.progress.percentage = 40;
      fixture.detectChanges();
      expect(htmlEl.getAttribute('value')).toEqual('40');
    });

    it('should not have a value hostbinding if indeterminate', () => {
      component.progress.value = 40;
      fixture.detectChanges();
      expect(htmlEl.getAttribute('value')).toBeFalsy();
    });

    it('should have aria-hidden hostbinding if indeterminate', () => {
      component.progress.determinate = false;
      fixture.detectChanges();
      expect(htmlEl.getAttribute('aria-hidden')).toBeTruthy();
    });

    it('should have aria-hidden hostbinding if one is given', () => {
      component.progress.determinate = false;
      component.progress.ariaHidden = 'false';
      fixture.detectChanges();
      expect(htmlEl.getAttribute('aria-hidden')).toBe('false');
    });

    it('should not have aria-hidden hostbinding if determinate', () => {
      component.progress.determinate = true;
      fixture.detectChanges();
      expect(htmlEl.getAttribute('aria-hidden')).toBeFalsy();
    });
  });
});
