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
import { Component, Input } from '@angular/core';
import { TestBed, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { WizardStepDirective } from './wizard-step.directive';

@Component({
    template: `
      <li v-wizard-step >
      </li>
  `,
    imports: [Input],
})
class TestComponent {
}

describe('WizardStepDirective', () => {
    let fixture: ComponentFixture<TestComponent>;
    let directive: WizardStepDirective;
    let component: TestComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TestComponent],
            providers: [{ provide: ComponentFixtureAutoDetect, useValue: true }],
            imports: [WizardStepDirective],
        }).compileComponents();

        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        directive = fixture.debugElement.query(By.directive(WizardStepDirective)).injector.get(WizardStepDirective);
    });

    it('should create an instance', () => {
        expect(directive).toBeTruthy();
    });
    it('should assign a default class', () => {
        expect(directive.class).toContain('v-wizard-step');
    });
    it('should assign an additional class', () => {
        directive.class = 'additional-class';
        expect(directive.class).toContain('v-wizard-step');
        expect(directive.class).toContain('additional-class');
    });

    it('should assign a default active', () => {
        expect(directive.active).toBe(false);
    });

    it('should return active true', () => {
        directive.active = true;
        expect(directive.active).toBe(true);
    });

    it('should return aria step', () => {
        directive.active = true;
        expect(directive.hostAriaCurrent).toBe('step');
    });
    it('should return aria empty', () => {
        expect(directive.hostAriaCurrent).toBe(undefined);
    });

    it('should assign a default complete', () => {
        expect(directive.complete).toBe(false);
    });

    it('should assign a default complete', () => {
        directive.complete = true;
        expect(directive.complete).toBe(true);
    });

    it('should assign a default invalid', () => {
        expect(directive.invalid).toBe(false);
    });
    it('should assign a default invalid', () => {
        directive.invalid = true;
        expect(directive.invalid).toBe(true);
    });
});
