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
import { ChangeDetectorRef, ElementRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { render } from '@testing-library/angular';
import { axe } from 'jest-axe';
import { UUIDService } from '../_utilities/services/uuid.service';
import { NovaLibService } from '../nova-lib.service';
import { PanelContentDirective } from '../panel-content/panel-content.directive';
import { TabListDirective } from '../tab-list/tab-list.directive';

describe('PanelContentDirective', () => {
  describe('class', () => {
    let directive: PanelContentDirective;
    let uuidService: UUIDService;
    let novaLibService: NovaLibService;
    let el: ElementRef;
    let cdRef: ChangeDetectorRef;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        providers: [
          {
            provide: ChangeDetectorRef,
            useValue: {}
          }
        ]
      }).compileComponents();

      uuidService = TestBed.inject(UUIDService);
      novaLibService = TestBed.inject(NovaLibService);
      el = new ElementRef(document.createElement('div'));
      cdRef = TestBed.inject(ChangeDetectorRef);
      directive = new PanelContentDirective(el, uuidService);
    });

    it('should create an instance', () => {
      expect(directive).toBeTruthy();
    });
    it('should create an instance', () => {
      expect(directive).toBeTruthy();
    });

    it('should have default class', () => {
      expect(directive.class).toContain('v-panel-content v-surface');
      const spyOnSet = jest.spyOn(directive, 'class', 'set');
      const spyOnHostClass = jest.spyOn(directive, 'hostClass', 'get');
      directive.class = 'test';
      expect(directive.class).toContain('test');
      expect(directive.hostClass).toContain('test');
    });

    it('should add v-panel-tabs class to tabs on ngAfterContentInit', () => {
      directive.tabs = new TabListDirective(novaLibService, cdRef, el);
      directive.ngAfterContentInit();
      expect(directive.tabs.class).toContain('v-panel-tabs');
    });
  });
  describe('rendering', () => {
    it('default should render correctly', async () => {
      const { container } = await render('<div v-panel-content id="test-id"></div>', {
        imports: [PanelContentDirective]
      });
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
