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
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { configureTestSuite } from '../../test-helper';
import { ContentCardTitleLinkDirective } from '../content-card-title-link/content-card-title-link.directive';
import { ContentCardDirective } from './content-card.directive';

@Component({
  template: `<div v-content-card [indicator]="indicator" [clickable]="clickable" [disabled]="disabled">
    Card
    <a v-content-card-title-link>Title</a>
  </div>`,
  imports: [ContentCardDirective, ContentCardTitleLinkDirective]
})
class TestComponent {
  disabled: boolean;
  indicator: boolean = false;
  clickable: boolean = false;
}

describe('ContentCardDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let directiveDebugElement;

  configureTestSuite();

  beforeEach(() => {
    // configure and create the component
    fixture = TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [ContentCardDirective, ContentCardTitleLinkDirective]
    }).createComponent(TestComponent);

    // render and bind
    fixture.detectChanges();

    // acquire the directive
    directiveDebugElement = fixture.debugElement.query(By.directive(ContentCardDirective));
  });

  it('should create', () => {
    expect(directiveDebugElement).toBeTruthy();
  });

  describe('indicator property', () => {
    it('should be false by default', () => {
      expect(directiveDebugElement.componentInstance.indicator).toBe(false);
    });
    it('should be true when set to true', () => {
      fixture.componentInstance.indicator = true;
      expect(directiveDebugElement.componentInstance.indicator).toBe(true);
    });
    it('should contain the v-content-card-border-block-end class when true', () => {
      fixture.componentInstance.indicator = true;
      fixture.detectChanges();
      expect(directiveDebugElement.classes['v-content-card-border-block-end']).toBe(true);
    });
    it('should not contain the v-content-card-border-block-end class when false', () => {
      fixture.componentInstance.indicator = false;
      fixture.detectChanges();
      expect(directiveDebugElement.classes['v-content-card-border-block-end']).toBeFalsy();
    });
  });

  describe('clickable property', () => {
    it('should be false by default', () => {
      expect(directiveDebugElement.componentInstance.clickable).toBe(false);
    });
    it('should be true when set to true', () => {
      fixture.componentInstance.clickable = true;
      fixture.detectChanges();
      expect(directiveDebugElement.componentInstance.clickable).toBe(true);
    });
  });

  it('should be disabled', () => {
    fixture.componentInstance.disabled = true;
    expect(directiveDebugElement.componentInstance.disabled).toBe(true);
  });

  it('should set aria be disabled', () => {
    fixture.componentInstance.disabled = true;
    fixture.detectChanges();
    const el = directiveDebugElement.nativeElement.getAttribute('aria-disabled');
    expect(el).toBe('true');
  });

  it('should render the v-content-card class', () => {
    expect(directiveDebugElement.classes['v-content-card']).toBe(true);
  });

  it('should handle on KeyDown space events', () => {
    const directiveInstance = directiveDebugElement.injector.get(ContentCardDirective);
    const spy = jest.spyOn(directiveInstance, 'onSpaceKeyDown');
    directiveDebugElement.nativeElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'space' }));
    expect(spy).toHaveBeenCalled();
  });

  it('should not prevent event propogation on KeyDown space events', () => {
    const evt = new KeyboardEvent('keydown', { key: 'space' });
    const spy = jest.spyOn(evt, 'preventDefault');
    directiveDebugElement.nativeElement.dispatchEvent(evt);
    expect(spy).not.toHaveBeenCalled();
  });

  it('should prevent event propogation on KeyDown space events', () => {
    fixture.componentInstance.clickable = true;
    fixture.detectChanges();
    const evt = new KeyboardEvent('keydown', { key: 'space' });
    const spy = jest.spyOn(evt, 'preventDefault');
    directiveDebugElement.nativeElement.dispatchEvent(evt);
    expect(spy).toHaveBeenCalled();
  });

  it('should handle mouse click event', () => {
    const directiveInstance = directiveDebugElement.injector.get(ContentCardDirective);
    const spy = jest.spyOn(directiveInstance, 'handleClick');
    directiveDebugElement.nativeElement.dispatchEvent(new MouseEvent('click'));
    expect(spy).toHaveBeenCalled();
  });

  it('should handle mouse click event while clickable', () => {
    fixture.componentInstance.clickable = true;
    fixture.detectChanges();
    const directiveInstance = directiveDebugElement.injector.get(ContentCardDirective);
    const spy = jest.spyOn(directiveInstance, 'handleClick');
    directiveDebugElement.nativeElement.dispatchEvent(new MouseEvent('click'));
    expect(spy).toHaveBeenCalled();
  });

  it('should calculate disabled on content init', () => {
    const directiveInstance = directiveDebugElement.injector.get(ContentCardDirective);
    directiveInstance.ngAfterContentInit();
    expect(directiveInstance.disabled).toBe(false);
  });
});
