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
import { render } from '@testing-library/angular';
import { LabelDirective } from '../label/label.directive';
import { CircularProgressComponent } from './circular-progress.component';

@Component({
  template: `<div v-progress-circular>
    <label v-label>Label</label>
  </div> `
})
class TestCircularProgressComponent {
  @ViewChild(CircularProgressComponent) progress: CircularProgressComponent;
}

describe('CircularProgressComponent', () => {
  describe('class', () => {
    let component: TestCircularProgressComponent;
    let fixture: ComponentFixture<TestCircularProgressComponent>;
    let htmlEl: HTMLElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [TestCircularProgressComponent],
        imports: [CircularProgressComponent, LabelDirective]
      }).compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(TestCircularProgressComponent);
      component = fixture.componentInstance;
      htmlEl = fixture.nativeElement.querySelector('[v-progress-circular]');
      fixture.detectChanges();
    });

    it('should exist', () => {
      expect(component).toBeTruthy();
    });

    describe('Input properties', () => {
      it(`should have 'v-progress' class by default`, () => {
        expect(htmlEl.classList.toString()).toEqual(expect.stringContaining('v-progress'));
      });

      it(`should have 'v-progress-circular' class by default`, () => {
        expect(htmlEl.classList.toString()).toEqual(expect.stringContaining('v-progress-circular'));
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
        component.progress.percentage = 100;
        component.progress.determinate = true;
        fixture.detectChanges();
        expect(htmlEl.classList.toString()).toEqual(expect.stringContaining('v-progress-complete'));
      });

      it('should have small class when small', () => {
        component.progress.small = true;
        fixture.detectChanges();
        expect(htmlEl.classList.toString()).toEqual(expect.stringContaining('v-progress-circular-small'));
      });

      it('should have error class when invalid', () => {
        component.progress.invalid = true;
        fixture.detectChanges();
        expect(htmlEl.classList.toString()).toEqual(expect.stringContaining('v-progress-error'));
      });

      it('should allow custom role', () => {
        component.progress.role = 'tab';
        fixture.detectChanges();
        expect(htmlEl.getAttribute('role')).toBe('tab');
      });
    });

    describe('the template', () => {
      it(`should have 'v-progress-circular-track' on inner svg`, () => {
        const childSvg = htmlEl.querySelector('svg');
        if (childSvg)
          expect(childSvg.classList.toString()).toEqual(expect.stringContaining('v-progress-circular-track'));
      });

      it(`should have 'v-progress-circular-background' on inner first circle child`, () => {
        const firstCircle = htmlEl.querySelectorAll('circle')[0];
        if (firstCircle)
          expect(firstCircle.classList.toString()).toEqual(expect.stringContaining('v-progress-circular-background'));
      });

      it(`should have 'v-progress-circular-bar' on inner second circle child`, () => {
        const firstCircle = htmlEl.querySelectorAll('circle')[1];
        if (firstCircle)
          expect(firstCircle.classList.toString()).toEqual(expect.stringContaining('v-progress-circular-bar'));
      });
    });

    describe('the progress label', () => {
      it('should identify a child LabelDirective', () => {
        expect(component.progress.label).toBeTruthy();
      });

      it('should set the aria-labelledby to the labels ID by default', () => {
        expect(htmlEl.getAttribute('aria-labelledby')).toEqual(component.progress.label.id);
      });

      it('should allow for a custom aria-labelledby attribute if given', () => {
        component.progress.ariaLabelledby = 'custom description';
        fixture.detectChanges();
        expect(htmlEl.getAttribute('aria-labelledby')).toEqual('custom description');
      });
    });

    xdescribe('computed styles', () => {
      // I'd like to test computed styles based on what we get for radius, etc, but I'm unable to get it working
    });
  });

  describe('rendering', () => {
    it('should allow for custom sizes', async () => {
      jest.useFakeTimers();
      const { container } = await render(
        `<style>
          .custom-circular-progress {
            transform: scale(0.25);
            block-size: calc(var(--v-progress-circular-size) * 0.25);
            inline-size: calc(var(--v-progress-circular-size) * 0.25);
            display: grid;
            justify-content: center;
            align-content: center;

          }
        </style>
        <div v-progress-circular class="custom-circular-progress">
          <span role="alert" vSR>Loading...</span>
        </div>
        `,
        {
          imports: [CircularProgressComponent, LabelDirective]
        }
      );
      jest.runAllTimers();
      expect(container).toMatchSnapshot();
      jest.useRealTimers();
    });
  });
});
