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
import { TestBed } from '@angular/core/testing';
import { AppReadyService } from '../_utilities/services/app-stable-check.service';
import { CheckboxDirective } from '../checkbox/checkbox.directive';
import { RadioDirective } from '../radio/radio.directive';
import { ToggleControlService } from './toggle-control.service';

describe('ToggleControlService', () => {
  let service: ToggleControlService;
  let appReadyService: AppReadyService;
  let radioDirective: RadioDirective;
  let checkboxDirective: CheckboxDirective;

  beforeEach(() => {
    const appReadyServiceMock = {
      isBrowserAndDomAvailable: jest.fn()
    };

    TestBed.configureTestingModule({
      providers: [ToggleControlService, { provide: AppReadyService, useValue: appReadyServiceMock }]
    });

    service = TestBed.inject(ToggleControlService);
    appReadyService = TestBed.inject(AppReadyService);
    radioDirective = { el: { nativeElement: document.createElement('div') } } as RadioDirective;
    checkboxDirective = { el: { nativeElement: document.createElement('div') } } as CheckboxDirective;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should not toggle control if browser and DOM are not available', () => {
    (appReadyService.isBrowserAndDomAvailable as jest.Mock).mockReturnValue(false);
    const event = new Event('click');
    const spy = jest.spyOn(radioDirective.el.nativeElement, 'click');

    service.toggleControl(radioDirective, event);

    expect(spy).not.toHaveBeenCalled();
  });

  it('should not toggle control if event target is within the control element', () => {
    (appReadyService.isBrowserAndDomAvailable as jest.Mock).mockReturnValue(true);
    const event = new Event('click');
    jest.spyOn(event, 'target', 'get').mockReturnValue(radioDirective.el.nativeElement);
    const spy = jest.spyOn(radioDirective.el.nativeElement, 'click');

    service.toggleControl(radioDirective, event);

    expect(spy).not.toHaveBeenCalled();
  });

  it('should toggle control if event target is outside the control element', () => {
    (appReadyService.isBrowserAndDomAvailable as jest.Mock).mockReturnValue(true);
    const event = new Event('click');
    jest.spyOn(event, 'target', 'get').mockReturnValue(document.createElement('div'));
    const spy = jest.spyOn(radioDirective.el.nativeElement, 'click');

    service.toggleControl(radioDirective, event);

    expect(spy).toHaveBeenCalled();
  });

  it('should toggle checkbox control if event target is outside the control element', () => {
    (appReadyService.isBrowserAndDomAvailable as jest.Mock).mockReturnValue(true);
    const event = new Event('click');
    jest.spyOn(event, 'target', 'get').mockReturnValue(document.createElement('div'));
    const spy = jest.spyOn(checkboxDirective.el.nativeElement, 'click');

    service.toggleControl(checkboxDirective, event);

    expect(spy).toHaveBeenCalled();
  });
});
