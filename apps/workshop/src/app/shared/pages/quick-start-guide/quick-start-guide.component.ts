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
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NovaLibModule } from '@visa/nova-angular';
import { VisaCodeForkAltTiny, VisaGuideLow, VisaMaximizeTiny } from '@visa/nova-icons-angular';
import packageJson from 'package.json';
import { CodeSnippetSingleComponent } from '../../app-components/code-snippet-single/code-snippet-single.component';
import { NovaSharedModule } from '../../nova-shared.module';

@Component({
  selector: 'nova-workshop-quick-start-guide',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NovaLibModule,
    NovaSharedModule,
    CodeSnippetSingleComponent,
    VisaMaximizeTiny,
    VisaGuideLow,
    VisaCodeForkAltTiny
  ],
  templateUrl: './quick-start-guide.component.html'
})
export class QuickStartComponent {
  version = packageJson.version;

  stylesImport = `"styles": [
    // ...
    "node_modules/@visa/nova-styles/styles.css",
    "node_modules/@visa/nova-styles/themes/visa-light/index.css", // see theme options within node_modules/@visa/nova-styles/themes/
    // project specific CSS style overrides
  ],`;

  compileUpdate16 = ` {
    "compilerOptions": {
      ...,
      "paths": {
        "@angular/*": ["node_modules/@angular/*"],
        "@visa/*": ["node_modules/@visa/*"],
      }
    }
  }`;

  compileUpdate17 = ` {
    "compilerOptions": {
      ...,
      "paths": {
        "@visa/*": ["node_modules/@visa/*"],
      }
    }
  }`;

  tsConfig = [
    {
      id: 'v16',
      label: 'Angular 16',
      code: this.compileUpdate16
    },
    {
      id: 'v17',
      label: 'Angular 17',
      code: this.compileUpdate17
    }
  ];

  selectedTSConfig = 0;
  showVersionPanel(index: number) {
    this.selectedTSConfig = index;
  }

  standaloneModuleImport = `import { NovaLibModule } from '@visa/nova-angular';
  
@Component({
  ...
  standalone: true,
  imports: [
    ...
    NovaLibModule,
    ...
  ],
})`;
  ngModuleModulemport = `import { NovaLibModule } from '@visa/nova-angular';
  
@NgModule({
  imports: [
    ...
    NovaLibModule,
    ...
  ],
})`;
  moduleImports = [
    {
      id: 'standalone-module',
      label: 'Standalone Components',
      code: this.standaloneModuleImport
    },
    {
      id: 'ngmodule-module',
      label: 'NgModule',
      code: this.ngModuleModulemport
    }
  ];
  selectedModuleImport = 0;
  showModulePanel(index: number) {
    this.selectedModuleImport = index;
  }

  standaloneIconsImport = `import { VisaCloseTiny } from '@visa/nova-icons-angular';
  
@Component({
  ...
  standalone: true,
  imports: [
    ...
    VisaCloseTiny,
    ...
  ],
})`;
  ngModuleIconsImport = `import { VisaCloseTiny } from '@visa/nova-icons-angular';
  
@NgModule({
  imports: [
    ...
    VisaCloseTiny,
    ...
  ],
})`;
  iconImports = [
    {
      id: 'ngmodule',
      label: 'NgModule',
      code: this.ngModuleIconsImport
    },
    {
      id: 'standalone',
      label: 'Standalone Components',
      code: this.standaloneIconsImport
    }
  ];
  selectedIconImport = 0;
  showIconPanel(index: number) {
    this.selectedIconImport = index;
  }
  addStandaloneIcons = `<svg v-icon-visa-close-tiny />`;

  standaloneSpriteImport = `import { VisaIconSpriteComponent, GenericIconSpriteComponent } from '@visa/nova-icons-angular';
  
@Component({
  ...
  standalone: true,
  imports: [
    ...
    VisaIconSpriteComponent,
    GenericIconSpriteComponent
    ...
  ],
})`;
  ngModuleSpriteImport = `import { VisaIconSpriteComponent, GenericIconSpriteComponent } from '@visa/nova-icons-angular';
  
@NgModule({
  imports: [
    ...
    VisaIconSpriteComponent,
    GenericIconSpriteComponent
    ...
  ],
})`;
  spriteImports = [
    {
      id: 'ngmodule-sprite',
      label: 'NgModule',
      code: this.ngModuleSpriteImport
    },
    {
      id: 'standalone-sprite',
      label: 'Standalone Components',
      code: this.standaloneSpriteImport
    }
  ];
  selectedSpriteImport = 0;
  showSpritePanel(index: number) {
    this.selectedSpriteImport = index;
  }
  spriteComponents = `<v-icon-library-visa />\n<v-icon-library-generic />`;
  addCustomIcons = `<custom-icon-sprite />`;
}
