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
import { render } from '@testing-library/angular';
import { axe } from 'jest-axe';
import { VisaLogoComponent } from './visa-logo.component';

describe('VisaLogoComponent', () => {
  it('should render correctly', async () => {
    const { container } = await render('<svg v-logo-visa></svg>', {
      imports: [VisaLogoComponent]
    });
    const results = await axe(container);
    expect(results).toHaveNoViolations();
    expect(container).toMatchSnapshot();
  });

  it('should set a class', async () => {
    const { container } = await render('<svg v-logo-visa class="test-class"></svg>', {
      imports: [VisaLogoComponent]
    });
    expect(container.firstElementChild?.getAttribute('class')).toBe('test-class v-logo');
  });

  it('should have adjustable height/width', async () => {
    const { container } = await render('<svg v-logo-visa height="10" width="10"></svg>', {
      imports: [VisaLogoComponent]
    });
    expect(container.firstElementChild?.getAttribute('height')).toBe('10');
    expect(container.firstElementChild?.getAttribute('width')).toBe('10');
  });

  it('should allow for adjustable pathFill', async () => {
    const { container } = await render('<svg v-logo-visa pathFill="gray"></svg>', {
      imports: [VisaLogoComponent]
    });
    expect(container.firstElementChild?.getAttribute('pathFill')).toBe('gray');
  });
});
