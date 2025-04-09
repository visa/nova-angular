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
import { render } from '@testing-library/angular';
import { SwitchLabelDirective } from './switch-label.directive';
import { axe } from 'jest-axe';

describe('VisaLogoComponent', () => {
  it('should render correctly', async () => {
    const { container } = await render('<span v-switch-label></span>', {
      imports: [SwitchLabelDirective]
    });
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should allow custom classes', async () => {
    const { container } = await render('<span v-switch-label class="test-class"></span>', {
      imports: [SwitchLabelDirective]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('test-class v-label v-switch-label');
  });
});
