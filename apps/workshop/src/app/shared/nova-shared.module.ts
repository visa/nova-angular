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
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NovaLibModule } from '@visa/nova-angular';
import { VisaMaximizeTiny } from '@visa/nova-icons-angular';
import { MarkdownModule } from 'ngx-markdown';
import { APITableDocsComponent } from './app-components/api-table/api-table.docs';
import { CodeSnippetSingleComponent } from './app-components/code-snippet-single/code-snippet-single.component';
import { CodeSnippetComponent } from './app-components/code-snippet/code-snippet.component';
import { ExampleComponent } from './app-components/example/example.docs';
import { PackageInstallerComponent } from './app-components/package-installer/package-installer.component';
import { PageHeroComponent } from './app-components/page-hero/page-hero.docs';
import { RouterLinkMessageComponent } from './app-components/dev-messages/router-link/router-link.docs';
import { DisabledATagMessageComponent } from './app-components/dev-messages/disabled-a-tag/disabled-a-tag.docs';
import { MessageHeadingsMessageComponent } from './app-components/dev-messages/message-headings/message-headings.docs';

@NgModule({
  exports: [
    CodeSnippetComponent,
    CodeSnippetSingleComponent,
    ExampleComponent,
    PackageInstallerComponent,
    APITableDocsComponent,
    PageHeroComponent,
    RouterLinkMessageComponent,
    DisabledATagMessageComponent,
    MessageHeadingsMessageComponent
  ],
  imports: [
    CommonModule,
    MarkdownModule.forRoot(),
    MarkdownModule,
    NovaLibModule,
    PackageInstallerComponent,
    APITableDocsComponent,
    CodeSnippetComponent,
    CodeSnippetSingleComponent,
    PageHeroComponent,
    ExampleComponent,
    VisaMaximizeTiny,
    RouterModule,
    RouterLinkMessageComponent,
    DisabledATagMessageComponent,
    MessageHeadingsMessageComponent
  ]
})
export class NovaSharedModule {}
