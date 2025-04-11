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
import { PanelToggleDirective } from './panel-toggle-button.directive';

describe('PanelToggleButtonDirective', () => {
  let directive: PanelToggleDirective;

  beforeEach(() => {
    directive = new PanelToggleDirective();
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should have default class', () => {
    expect(directive.class).toContain('v-panel-toggle');
    directive.class = 'test';
    expect(directive.class).toContain('test');
    expect(directive.hostClass).toContain('test');
  });

  it('should initialize expanded for responsive', () => {
    directive.button = { ariaExpanded: true } as any;
    directive._responsive = true;
    directive.ngOnInit();
    expect(directive._expanded).toBe(true);

    directive.button = { ariaExpanded: false } as any;
    directive._responsive = true;
    directive.ngOnInit();
    expect(directive._expanded).toBe(false);
  });

  it('should not have aria-expanded for modal', () => {
    directive.button = { ariaExpanded: true } as any;
    directive._responsive = false;
    directive.ngOnInit();
    expect(directive._expanded).toBeFalsy();

    directive.button = { ariaExpanded: true } as any;
    directive._responsive = false;
    directive.ngOnInit();
    expect(directive._expanded).toBeFalsy();
  });
});
