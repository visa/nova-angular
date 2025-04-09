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
import { Component, computed, input, signal } from '@angular/core';
import { NovaLibModule } from '@visa/nova-angular';
import { CodeSnippetSingleComponent } from '../code-snippet-single/code-snippet-single.component';

type FormatterProps = {
  versionRanged?: boolean;
  version?: string;
};
const packageManagers = [
  {
    formatter: (packageName: string, { version, versionRanged }: FormatterProps) =>
      `npm install ${packageName}${version ? `@${versionRanged ? '^' : ''}${version}` : ''}`,
    name: 'NPM'
  },
  {
    formatter: (packageName: string, { version, versionRanged }: FormatterProps) =>
      `pnpm install ${packageName}${version ? `@${versionRanged ? '^' : ''}${version}` : ''}`,
    name: 'PNPM'
  },
  {
    formatter: (packageName: string, { version, versionRanged }: FormatterProps) =>
      `yarn add ${packageName}${version ? `@${versionRanged ? '^' : ''}${version}` : ''}`,
    name: 'Yarn'
  },
  {
    formatter: (packageName: string, { version }: FormatterProps) =>
      `bun add ${packageName}${version ? `@${version}` : ''}`,
    name: 'Bun'
  }
];

@Component({
  selector: 'nova-workshop-package-installer',
  templateUrl: './package-installer.component.html',
  standalone: true,
  imports: [CommonModule, NovaLibModule, CodeSnippetSingleComponent]
})
export class PackageInstallerComponent {
  description = input<string>();
  packageLink = input<string>();
  packageName = input.required<string>();
  packageOfficialName = input<string>();
  title = input<string>();
  version = input<string>();
  versionRanged = input<boolean>(false);

  packageManagers = packageManagers;
  selectedIndex = signal(0);

  currentPackageManager = computed(() => this.packageManagers[this.selectedIndex()]);

  installCommand = computed(() =>
    this.currentPackageManager().formatter(this.packageName(), {
      version: this.version(),
      versionRanged: this.versionRanged()
    })
  );

  onIndexChange = (index: number) => {
    this.selectedIndex.update(() => index);
  };
}
