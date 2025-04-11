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
import { ChangeDetectorRef, Type } from '@angular/core';
import {
  getTestBed,
  TestBed,
  ComponentFixture,
} from '@angular/core/testing';

export const configureTestSuite = () => {
  const testBedApi: any = getTestBed();
  const originReset = TestBed.resetTestingModule;

  beforeAll(() => {
    TestBed.resetTestingModule();
    TestBed.resetTestingModule = () => TestBed;
  });

  afterEach(() => {
    testBedApi._activeFixtures.forEach(
      (fixture: ComponentFixture<any>) => fixture.destroy()
    );
    testBedApi._instantiated = false;
  });

  afterAll(() => {
    try {
      TestBed.resetTestingModule = originReset;
      TestBed.resetTestingModule();
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  });
};

/**
 * The below methods are required when you set your components ChangeDetectionStrategy to
 * ChangeDetectionStrategy.OnPush
 * It looks like fixture.detectChanges is only good for one call. All subsequent calls will
 * not work. These methods will override the detectChanges call with a new method using the
 * changedection.
 * https://github.com/angular/angular/issues/12313
 */
function runOnPushChangeDetection<T>(
  cf: ComponentFixture<T>
) {
  return async () => {
    const cd: ChangeDetectorRef = cf.debugElement.injector.get<
      ChangeDetectorRef
    >(ChangeDetectorRef as any);
    cd.detectChanges();
    return await cf.whenStable();
  };
}

export const ImproveChangeDetection = () => {
  const originalCreate = TestBed.createComponent;
  TestBed.createComponent = <T>(component: Type<T>) => {
    const componentFixture: ComponentFixture<
      T
    > = originalCreate(component);
    componentFixture.detectChanges = runOnPushChangeDetection(
      componentFixture
    );
    return componentFixture;
  };
};
