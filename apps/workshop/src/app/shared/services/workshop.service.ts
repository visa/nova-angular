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
import { HttpClient } from '@angular/common/http';
import { ElementRef, Injectable, OutputEmitterRef, signal, WritableSignal } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { NovaLibService } from '@visa/nova-angular';
import packageJson from 'package.json';
import {
  APITypes,
  BaseInterfaceCompoDocs,
  BasePropMethodTypeCompoDocs,
  ComponentTypeCompoDocs,
  ConstantTypeCompoDocs,
  InjectableTypeCompoDocs,
  JsdocTagsTypeCompoDocs,
  MethodTypeCompoDocs,
  PropertiesTypeCompoDocs,
  ReturnAPI,
  SafeArgsInterface,
  SafeInputsInterface,
  SafeMethodsInterface,
  SafeOutputsInterface,
  SafePropertiesInterface
} from './workshop.constants';
import { HtmlSanitizerService } from '../app-components/safe-html/safe-html.service';

@Injectable({
  providedIn: 'root'
})
export class WorkshopService {
  constructor(
    private novaLibService: NovaLibService,
    private sanitizer: DomSanitizer,
    private http: HttpClient,
    private htmlSanitizerService: HtmlSanitizerService
  ) {}
  sideNavOpen = signal(true);
  globalBannerOpen = signal(false);
  globalBannerCount = signal(0);
  isDarkTheme = signal(false);
  componentDisclosureOpen = signal(true);
  neededAPI = signal<{ name: string; type?: APITypes }[] | null>(null);
  examples = signal<{ name: string; id: string; loading: OutputEmitterRef<void> }[] | null>(null);
  isLoadingExamples = signal(false);
  libJsonData: { [key: string]: any; directive: []; component: []; injectables: []; miscellaneous: { variables: [] } };
  libJsonDataReady = signal(false);
  docsJsonData: {
    name: string;
    id: string;
    selector: string;
    sourceCode: string;
    templateData: string;
    templateUrl: string[];
    template: string;
    description: string;
    file: string;
    type: APITypes;
  }[];
  docsJsonDataReady = signal(false);
  selectedHeroTab = signal(0);
  titleSuffix = ' | Nova Angular | Visa Product Design System';
  displayRTL = signal(false);
  version = packageJson.version;
  versionLinks = [
    { name: 'Latest', type: 'main', url: 'https://design.visa.com/angular' },
    { name: 'Beta', type: 'dev', url: 'https://design.visa.com/angular/version/development' }
  ];
  supportLinks = [
    {
      name: 'Email',
      url: 'mailto:productdesignsystem@visa.com'
    },
    {
      name: 'Open Jira ticket',
      url: 'https://bookmarks.visa.com/vpds-microsoft-teams-channel'
    },
    {
      name: 'Join us on Teams',
      url: 'https://bookmarks.visa.com/vpds-microsoft-teams-channel'
    },
    {
      name: 'Send us some love!',
      url: 'https://bookmarks.visa.com/vpds-uplift-us'
    }
  ];
  componentName = signal('');
  pageType = signal('');
  themePath = 'assets/themes/';
  markdownThemePath = 'assets/markdown-themes/a11y-';
  LOCALSTORAGEKEY = 'v-preferences-angular';
  markdownKeys = ['light', 'dark'];
  lightMarkdownTheme: string;
  darkMarkdownTheme: string;
  urlFragment: string;
  content: WritableSignal<ElementRef | null> = signal(null);

  toggleNav() {
    this.sideNavOpen.update((value) => !value);
  }

  navigateTo(id: string, idForAriaCurrent?: string) {
    if (idForAriaCurrent) {
      this.novaLibService.setAriaCurrent(idForAriaCurrent);
    }
    setTimeout(() => {
      // not the best way to do this, but it works for now
      const elm = document.getElementById(id);
      if (elm) this.content()?.nativeElement.scroll({ top: elm.offsetTop, behavior: 'smooth' });
    }, 100);
  }

  openGlobalBanner() {
    this.globalBannerOpen.update((value) => (value = true));
    this.globalBannerCount.update((value) => {
      value++;
      return value;
    });
  }

  closeGlobalBanner() {
    this.globalBannerOpen.update((value) => (value = false));
    this.globalBannerCount.update((value) => (value = 0));
  }

  toggleTheme() {
    this.isDarkTheme.update((value) => !value);
  }

  toggleComponentDisclosure() {
    this.componentDisclosureOpen.update((value) => !value);
  }

  setHeroTab(index: number) {
    this.selectedHeroTab.set(index);
  }

  getAPI(name: string, type: APITypes = APITypes.DIRECTIVE): any {
    if (!name || !this.libJsonData) return;
    let returnAPI: ReturnAPI = {} as ReturnAPI;
    const lowerCaseType = type.toLowerCase();
    if (lowerCaseType === APITypes.DIRECTIVE || lowerCaseType === APITypes.COMPONENT) {
      const match = this.libJsonData[lowerCaseType + 's'].filter(
        (component: ComponentTypeCompoDocs) => component.name === name
      );
      if (!match[0]) return;
      const component = match[0];
      returnAPI = this.getDirectiveComponentAPI(component);
    } else if (lowerCaseType === APITypes.CONSTANT) {
      const match = this.libJsonData['miscellaneous']['variables'].filter(
        (variable: ConstantTypeCompoDocs) => variable.name === name
      );
      if (!match[0]) return;
      const constant = match[0];
      returnAPI = this.getConstantAPI(constant);
    } else if (lowerCaseType === APITypes.SERVICESOURCE) {
      let match = this.libJsonData['injectables'].filter((variable: InjectableTypeCompoDocs) => variable.name === name);
      if (!match[0]) {
        match = this.libJsonData['classes'].filter((variable: InjectableTypeCompoDocs) => variable.name === name);
      }
      if (!match[0]) return;
      returnAPI = this.getServiceSourceCode(match[0]);
    } else if (lowerCaseType === APITypes.SERVICE) {
      let match = this.libJsonData['injectables'].filter((variable: InjectableTypeCompoDocs) => variable.name === name);
      if (!match[0]) {
        match = this.libJsonData['classes'].filter((variable: InjectableTypeCompoDocs) => variable.name === name);
      }
      if (!match[0]) return;
      returnAPI = this.getServiceAPI(match[0]);
    }
    return returnAPI;
  }

  getDirectiveComponentAPI(component: ComponentTypeCompoDocs) {
    let APIData = {} as ReturnAPI;
    let inputs: SafeInputsInterface[] = [];
    let maxTags = 0;
    APIData.component = component.name;
    APIData.selector = component.selector;
    APIData.type = component.type;
    APIData.file = component.file;
    APIData.description = component.description ? this.htmlSanitizerService.sanitizeHtml(component.description) : null;

    component['inputsClass'].forEach((prop: BasePropMethodTypeCompoDocs) => {
      let tags: { tagName: SafeHtml; value: SafeHtml }[] = [];
      let defaultValue: SafeHtml[] | string[] = [];
      let builtIn: SafeHtml | boolean = false;

      // look for default value located in jsdoctag rather than directly in Input
      const valueTag = prop['jsdoctags']?.filter(
        (tag: JsdocTagsTypeCompoDocs) =>
          tag['tagName']['escapedText'] === 'default' || tag['tagName']['escapedText'] === 'defaultValue'
      );
      if (!valueTag) {
        defaultValue = [];
      } else if (
        valueTag?.length === 1 &&
        this.htmlSanitizerService.sanitizeHtml(valueTag[0]['comment']) !== prop['defaultValue']
      ) {
        defaultValue = [this.htmlSanitizerService.sanitizeHtml(valueTag[0]['comment'])];
      } else if (valueTag) {
        defaultValue = valueTag.map((tag) => this.htmlSanitizerService.sanitizeHtml(tag['comment']));
      }

      // similarly, look for built-in jsdoctag
      const builtInTag = prop['jsdoctags']?.find(
        (tag: JsdocTagsTypeCompoDocs) => tag['tagName']['escapedText'] === 'builtin'
      );
      builtIn = builtInTag ? this.htmlSanitizerService.sanitizeHtml(builtInTag['comment']) : false;

      prop['jsdoctags']?.forEach((tag: JsdocTagsTypeCompoDocs) => {
        if (
          tag['tagName']['escapedText'] === 'default' ||
          tag['tagName']['escapedText'] === 'defaultValue' ||
          tag['tagName']['escapedText'] === 'builtin'
        )
          return;
        tags.push({
          tagName: this.htmlSanitizerService.sanitizeHtml(tag['tagName']['escapedText'] + ': '),
          value: this.htmlSanitizerService.sanitizeHtml(tag['comment'])
        });
      });
      if (tags.length > maxTags) maxTags = tags.length;
      inputs.push({
        name: prop['name'],
        description: this.htmlSanitizerService.sanitizeHtml(prop['description']),
        defaultValue: defaultValue,
        type: prop['type'],
        tags: tags,
        builtIn: builtIn
      });
    });
    APIData.inputs = inputs;
    APIData.tagsMax = maxTags;

    let outputs: SafeOutputsInterface[] = [];
    component['outputsClass'].forEach((prop: BasePropMethodTypeCompoDocs) => {
      outputs.push({
        name: prop['name'],
        type: prop['type'],
        description: this.htmlSanitizerService.sanitizeHtml(prop['description'])
      });
    });
    APIData.outputs = outputs;
    return APIData;
  }

  getConstantAPI(constant: ConstantTypeCompoDocs) {
    let APIData = {} as ReturnAPI;
    APIData.name = constant.name;
    APIData.type = APITypes.CONSTANT;
    APIData.file = constant.file;
    let defaultValue: string | string[] = constant.defaultValue;
    // !IMPORTANT this only applies for 'as const' values. We'll need another function for other variables.
    defaultValue = defaultValue.split('\n'); // transform into key-value pairs like MEDIUM - 'medium'
    defaultValue = defaultValue.slice(1, -1); // remove defaultValue[0] = '{' and defaultValue.last = '} as const'
    let options: { key: string; value: SafeHtml }[] = [];
    defaultValue.forEach((option: string) => {
      const keyValue = option.split(':');
      options.push({
        key: keyValue[0].trim(),
        value: this.htmlSanitizerService.sanitizeHtml(keyValue[1].trim().replace(',', ''))
      });
    });
    APIData.options = options;
    return APIData;
  }

  getServiceSourceCode(service: InjectableTypeCompoDocs) {
    let APIData = {} as ReturnAPI;
    APIData.name = service.name;
    APIData.type = APITypes.SERVICESOURCE;
    APIData.file = service.file;
    APIData.code = service.sourceCode;
    return APIData;
  }

  getServiceAPI(service: InjectableTypeCompoDocs) {
    let APIData = {} as ReturnAPI;
    APIData.name = service.name;
    APIData.code = service.sourceCode;
    APIData.type = APITypes.SERVICE;
    APIData.file = service.file;
    APIData.description = this.htmlSanitizerService.sanitizeHtml(service.description);
    let properties: SafePropertiesInterface[] = [];
    let methods: SafeMethodsInterface[] = [];
    let maxTags = 0;
    service['properties']?.forEach((prop: PropertiesTypeCompoDocs) => {
      let defaultValue;
      const tag = prop['jsdoctags']?.find(
        (tag: JsdocTagsTypeCompoDocs) =>
          tag['tagName']['escapedText'] === 'default' || tag['tagName']['escapedText'] === 'defaultValue'
      );
      if (tag && this.htmlSanitizerService.sanitizeHtml(tag['comment']) !== prop['defaultValue']) {
        defaultValue = this.htmlSanitizerService.sanitizeHtml(tag['comment']);
      }
      properties.push({
        name: prop['name'],
        defaultValue: defaultValue ? defaultValue : prop['defaultValue'],
        type: prop['type'],
        description: this.htmlSanitizerService.sanitizeHtml(prop['description'])
      });
    });
    service['methods']?.forEach((method: MethodTypeCompoDocs) => {
      let args: SafeArgsInterface[] = [];
      method['args']?.forEach((argument: BaseInterfaceCompoDocs) => {
        const comment = method['jsdoctags']?.find((tag) => tag['name']['escapedText'] === argument['name']);
        args.push({
          name: argument['name'],
          type: argument['type'],
          comment: this.htmlSanitizerService.sanitizeHtml(comment ? comment['comment'] : '')
        });
      });
      methods.push({
        name: method['name'],
        returnType: method['returnType'],
        description: this.htmlSanitizerService.sanitizeHtml(method['description']),
        arguments: args
      });
    });
    APIData.properties = properties;
    APIData.methods = methods;
    APIData.tagsMax = maxTags;
    return APIData;
  }

  createThemeElement() {
    const newTheme = document.createElement('style');
    newTheme.id = 'nova-themer';
    document.getElementsByTagName('head')[0].appendChild(newTheme);
    this.getMarkdownThemes();
    this.checkLocalStorageForTheme();
  }
  checkLocalStorageForTheme() {
    if (!window?.localStorage) return;
    const storedThemeKey = window.localStorage.getItem(this.LOCALSTORAGEKEY);
    this.setTheme(storedThemeKey || 'visa-light');
  }
  setTheme(themeKey: string) {
    if (themeKey === 'none') {
      this.resetTheme();
      return;
    }
    this.http.get(`${this.themePath}${themeKey}.css`, { responseType: 'text' }).subscribe((theme) => {
      const themeElement = document.getElementById('nova-themer');
      const stringExample = themeKey.includes('dark') ? this.darkMarkdownTheme : this.lightMarkdownTheme;
      if (themeElement) themeElement.textContent = theme + ' ' + stringExample;
      window.localStorage.setItem(this.LOCALSTORAGEKEY, themeKey);
    });
  }

  resetTheme() {
    const themeElement = document.getElementById('nova-themer');
    if (themeElement) themeElement.textContent = '';
    window.localStorage.removeItem(this.LOCALSTORAGEKEY);
  }
  getMarkdownThemes() {
    this.markdownKeys.forEach((key) => {
      this.http.get(`${this.markdownThemePath}${key}.min.css`, { responseType: 'text' }).subscribe((theme) => {
        if (key === 'light') {
          this.lightMarkdownTheme = theme;
        } else {
          this.darkMarkdownTheme = theme;
        }
      });
    });
  }
}
