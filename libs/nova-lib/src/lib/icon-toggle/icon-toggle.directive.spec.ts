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
import { IconToggleDefaultTemplateDirective } from '../icon-toggle-default/icon-toggle-default.directive';
import { IconComponent } from '../icon/icon.component';
import { IconToggleDirective } from './icon-toggle.directive';

@Component({
  standalone: true,
  imports: [IconToggleDirective, IconComponent, IconToggleDefaultTemplateDirective, IconComponent],
  providers: [IconComponent],
  template: `<div v-icon-toggle>
    <svg v-icon></svg>
    <svg v-toggle-default-template></svg>
    <svg v-toggle-rotated-template></svg>
  </div>`
})
class TestIconComponent {}

describe('IconToggleDirective', () => {
  let component: TestIconComponent;
  let directiveInstance: IconToggleDirective;
  let fixture: ComponentFixture<TestIconComponent>;
  let htmlEl: HTMLElement;
  let directiveDebugElement: any;

  beforeEach(() => {
    fixture = TestBed.createComponent(TestIconComponent);
    component = fixture.componentInstance;
    htmlEl = fixture.nativeElement.querySelector('[v-icon-visa-toggle]');
    directiveDebugElement = fixture.debugElement.query(By.directive(IconToggleDirective));
    directiveInstance = directiveDebugElement.injector.get(IconToggleDirective);
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(directiveInstance).toBeTruthy();
  });

  it('should allow for custom class', () => {
    directiveInstance.class = 'v-icon-custom';
    expect(directiveInstance.hostClass).toBe('v-icon-custom');
  });

  it('should allow for expandedIcon', () => {
    directiveInstance.expandedIcon = 'v-icon-expanded';
    expect(directiveInstance.expandedIcon).toBe('v-icon-expanded');
  });

  it('should allow for collapsedIcon', () => {
    directiveInstance.collapsedIcon = 'v-icon-collapsed';
    expect(directiveInstance.collapsedIcon).toBe('v-icon-collapsed');
  });

  it('should set _iconSet true', () => {
    directiveInstance.icon.icon = 'v-icon';
    directiveInstance.ngOnInit();
    fixture.detectChanges();
    expect(directiveInstance._iconSet).toBeTruthy();
  });
});
