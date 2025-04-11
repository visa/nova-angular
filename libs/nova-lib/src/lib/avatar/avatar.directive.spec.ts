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
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, ComponentFixtureAutoDetect, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AvatarRoleImgDirective } from '../avatar-role-img/avatar-role-img.directive';
import { NovaLibModule } from '../nova-lib.module';
import { AvatarDirective } from './avatar.directive';

@Component({
  template: `
    <button v-button-icon v-avatar buttonSize="large" buttonColor="tertiary">
      <svg v-icon-visa-account-low></svg>
    </button>
  `,
  imports: []
})
class TestComponent {}

describe('AvatarDirective', () => {
  let directive: AvatarDirective;

  beforeEach(() => {
    directive = new AvatarDirective();
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should have default class value', () => {
    expect(directive.class).toContain('v-avatar');
  });

  it('should set class value', () => {
    directive.class = 'custom-class';
    expect(directive.class).toContain('custom-class');
  });

  it('should have default small value', () => {
    expect(directive.small).toBe(false);
  });

  it('should set small value', () => {
    directive.small = true;
    expect(directive.small).toBe(true);
    expect(directive.class).toContain('v-avatar-small');
  });

  describe('AvatarRoleImgDirective', () => {
    let roleDirective: AvatarRoleImgDirective;
    let fixture: ComponentFixture<TestComponent>;
    let component: TestComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [TestComponent],
        imports: [AvatarRoleImgDirective, NovaLibModule],
        schemas: [NO_ERRORS_SCHEMA],
        providers: [{ provide: ComponentFixtureAutoDetect, useValue: true }]
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      roleDirective = fixture.debugElement
        .query(By.directive(AvatarRoleImgDirective))
        .injector.get(AvatarRoleImgDirective);
    });

    it('should have apply to non img tag', () => {
      expect(roleDirective).toBeTruthy();
    });
    it('should have default role value', () => {
      expect(roleDirective.role).toBe('img');
    });
    it('should set role value', () => {
      roleDirective.role = 'custom-role';
      expect(roleDirective.role).toBe('custom-role');
    });
  });
});
