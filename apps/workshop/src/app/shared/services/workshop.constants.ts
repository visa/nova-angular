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
import { SafeHtml } from '@angular/platform-browser';

export interface ReturnAPI {
  component: string;
  selector: string;
  type: string;
  file: string;
  description: SafeHtml | null;
  inputs: { name: nameTypes; description: SafeHtml; type: string; tags: { tagName: SafeHtml; value: SafeHtml }[] }[];
  tagsMax: number;
  outputs: { name: nameTypes; type: string; description: SafeHtml }[];
  name: nameTypes;
  options: { key: string; value: SafeHtml }[];
  code: string;
  properties: { name: nameTypes; type: string; description: SafeHtml; defaultValue: string | SafeHtml }[];
  methods: {
    name: nameTypes;
    description: SafeHtml;
    returnType: string;
    arguments: SafeArgsInterface[];
  }[];
}

export interface SafeInputsInterface {
  name: nameTypes;
  description: SafeHtml;
  defaultValue: string | SafeHtml;
  type: string;
  tags: { tagName: SafeHtml; value: SafeHtml }[];
  builtIn: boolean | SafeHtml;
}

export interface SafeOutputsInterface {
  name: nameTypes;
  type: string;
  description: SafeHtml;
}

export interface SafePropertiesInterface {
  name: nameTypes;
  defaultValue: string | SafeHtml;
  description: SafeHtml;
  type: string;
}

export interface SafeMethodsInterface {
  name: nameTypes;
  description: SafeHtml;
  returnType: string;
  arguments: { name: nameTypes; type: string; comment: SafeHtml }[];
}

export interface SafeArgsInterface {
  name: nameTypes;
  type: string;
  comment: SafeHtml;
}

export interface BaseInterfaceCompoDocs {
  name: nameTypes;
  type: string;
  deprecated: boolean;
  deprecationMessage: string;
  rawdescription: string;
  description: string;
}

export interface JsdocNameTypeCompoDocs {
  escapedText: string;
}

export interface JsdocTagsTypeCompoDocs extends BaseInterfaceCompoDocs {
  tagName: JsdocNameTypeCompoDocs;
  comment: string;
}

export interface MethodTypeCompoDocs extends BaseInterfaceCompoDocs {
  args: BaseInterfaceCompoDocs[];
  optional: boolean;
  returnType: string;
  typeParameters: [];
  line: number;
  jsdoctags: [];
  modifierKind: number[];
}

export interface PropertiesTypeCompoDocs extends BaseInterfaceCompoDocs {
  defaultValue: string | SafeHtml;
  optional: boolean;
  line: number;
  jsdoctags: JsdocTagsTypeCompoDocs[];
}

export interface InjectableTypeCompoDocs extends BaseInterfaceCompoDocs {
  id: string;
  file: string;
  properties: PropertiesTypeCompoDocs[];
  methods: MethodTypeCompoDocs[];
  sourceCode: string;
  constructorObj: { args: BaseInterfaceCompoDocs[] };
}

export interface StyleUrlsDataTypeCompoDocs {
  data: string;
  styleUrl: string;
}

export interface ConstantTypeCompoDocs extends BaseInterfaceCompoDocs {
  file: string;
  defaultValue: string;
}

export interface BasePropMethodTypeCompoDocs extends BaseInterfaceCompoDocs {
  jsdoctags: JsdocTagsTypeCompoDocs[];
  line: number;
  decorators: [];
  defaultValue: string;
}

export interface ComponentTypeCompoDocs extends InjectableTypeCompoDocs {
  providers: { name: nameTypes }[];
  selector: string;
  styleUrls: [];
  styles: [];
  templateUrl: string[];
  inputsClass: BasePropMethodTypeCompoDocs[];
  outputsClass: BasePropMethodTypeCompoDocs[];
  propertiesClass: BasePropMethodTypeCompoDocs[];
  methodsClass: BasePropMethodTypeCompoDocs[];
  hostBindings: BasePropMethodTypeCompoDocs[];
  hostListeners: BasePropMethodTypeCompoDocs[];
  templateData: string;
}

export const nameTypes = {
  string: 'string',
  JsdocNameTypeCompoDocs: 'JsdocNameTypeCompoDocs'
} as const;

export type nameTypes = (typeof nameTypes)[keyof typeof nameTypes];

export const APITypes = {
  COMPONENT: 'component',
  DIRECTIVE: 'directive',
  CONSTANT: 'constant',
  SERVICESOURCE: 'service-source',
  SERVICE: 'service'
} as const;

export type APITypes = (typeof APITypes)[keyof typeof APITypes];
