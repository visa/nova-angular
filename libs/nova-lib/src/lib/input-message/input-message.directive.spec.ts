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
import { InputMessageDirective } from '../input-message/input-message.directive';

describe('InputMessageDirective', () => {
  let directive: InputMessageDirective;

  beforeEach(() => {
    directive = new InputMessageDirective();
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should have the right class', () => {
    expect(directive.class).toContain('v-input-message');
    const spyOnHostClass = jest.spyOn(directive, 'hostClasses', 'get');
    directive.class = 'test';
    expect(directive.hostClasses).toContain('test');
  });
});
