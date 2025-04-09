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
import { UUIDService } from '../_utilities/services/uuid.service';
import { AnchorLinkMenuHeaderDirective } from '../anchor-link-menu-header/anchor-link-menu-header.directive';
import { AnchorLinkMenuDirective } from './anchor-link-menu.directive';

@Component({
  template: ` <aside v-anchor-link-menu>
    <header v-anchor-link-menu-header></header>
  </aside>`
})
class TestComponent {}

describe('AnchorLinkMenuDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let directive: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [AnchorLinkMenuDirective]
    });
    fixture = TestBed.createComponent(TestComponent);
    directive = new AnchorLinkMenuDirective();
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should have the correct host class', () => {
    directive.class = 'test-class';
    fixture.detectChanges();
    expect(directive.hostClass).toContain('test-class v-anchor-link-menu');
  });

  it('should set the correct aria-label', () => {
    expect(directive.hostLabel).toBeNull();
    directive.label = 'label-1';
    fixture.detectChanges;
    expect(directive.hostLabel).toBe('label-1');
  });
});

describe('AnchorLinkMenuHeaderDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let directive: any;
  let uuidService: UUIDService;
  let mockUuidService: any;

  beforeEach(async () => {
    mockUuidService = {
      getUUID: jest.fn().mockReturnValue('test-uuid')
    };

    await TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [AnchorLinkMenuHeaderDirective],
      providers: [{ provide: UUIDService, useValue: mockUuidService }]
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    uuidService = TestBed.inject(UUIDService);
    directive = new AnchorLinkMenuHeaderDirective(uuidService);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should have the correct host class', () => {
    directive.class = 'test-class';
    fixture.detectChanges();
    expect(directive.hostClass).toContain('test-class v-anchor-link-menu-header');
  });

  it('should set the correct id', () => {
    expect(directive.hostId).toBe('test-uuid');
    directive.id = 'test-id';
    fixture.detectChanges;
    expect(directive.hostId).toBe('test-id');
  });
});
