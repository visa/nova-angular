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
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgxGoogleAnalyticsModule } from 'ngx-google-analytics';
import { CLIPBOARD_OPTIONS, ClipboardButtonComponent, provideMarkdown } from 'ngx-markdown';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideMarkdown({
      clipboardOptions: {
        provide: CLIPBOARD_OPTIONS,
        useValue: {
          buttonComponent: ClipboardButtonComponent
        }
      },
      loader: HttpClient
    }),
    importProvidersFrom(NgxGoogleAnalyticsModule.forRoot('G-ER1Y9VSTKY')),
    importProvidersFrom(
      RouterModule.forRoot(routes, {
        scrollPositionRestoration: 'enabled',
        initialNavigation: 'enabledBlocking',
        anchorScrolling: 'enabled'
      })
    )
  ]
};
