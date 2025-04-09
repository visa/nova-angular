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
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { UUIDService } from '../_utilities/services/uuid.service';
import { PanelContentDirective } from '../panel-content/panel-content.directive';
import { PanelToggleDirective } from '../panel-toggle-button/panel-toggle-button.directive';
import { PanelComponent } from './panel.component';

describe('PanelComponent', () => {
  let component: PanelComponent;
  let fixture: ComponentFixture<PanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelComponent, PanelContentDirective, PanelToggleDirective],
      providers: [UUIDService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default id', () => {
    expect(component.id).toContain('v-panel');
  });

  it('should be responsive', () => {
    component.responsive = true;
    fixture.detectChanges();
    expect(component.responsive).toBeTruthy();
    expect(component.class.includes('v-panel-responsive')).toBeTruthy();
  });

  it('should be expandable', () => {
    component.expandable = true;
    expect(component.expandable).toBeTruthy();
    expect(component.class.includes('v-panel-expandable')).toBeTruthy();
  });

  it('should be expanded', () => {
    component.expanded = true;
    expect(component.expanded).toBeTruthy();
  });

  it('should handle ngAfterContentInit', () => {
    component.expanded = false;
    component.toggleButton = { button: { clicked: of({}), ariaExpanded: false, ariaControls: null } } as any;
    component.panelContent = { id: 'test' } as any;
    component.ngAfterContentInit();
    expect(component.toggleButton.button?.ariaExpanded).toBeTruthy();
    expect(component.toggleButton.button?.ariaControls).toEqual('test');
  });

  it('should emit panelToggled event when expanded', () => {
    component.panelToggled.emit = jest.fn();
    component.expanded = true;
    expect(component.panelToggled.emit).toHaveBeenCalledWith(true);
  });

  it('should handle toggle', () => {
    component.toggleButton = { button: { ariaExpanded: false } } as any;
    component.expanded = true;
    component.handleToggle();
    expect(component.toggleButton.button?.ariaExpanded).toBeTruthy();
  });

  it('should set role', () => {
    component.role = 'dialog';
    expect(component.role).toEqual('dialog');
  });

  it('should set class', () => {
    component.class = 'test';
    expect(component.class).toBe('test v-panel   ');
  });

  it('should set skrim', () => {
    component.skrim = 'true';
    expect(component.skrim).toBeTruthy();
    expect(component.class).toBe(' v-panel   v-panel-skrim');
  });
});
