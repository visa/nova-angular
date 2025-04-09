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
const path = require('path');

const dataType = {
  library: 'nova',
  framework: 'angular',
  entries: {
    foundations: [
      {
        name: '',
        docs: {},
        lib: {}
      }
    ],
    utilities: [
      {
        name: '',
        docs: {},
        lib: {}
      }
    ],
    services: [
      {
        name: '',
        docs: {},
        lib: {}
      }
    ],
    components: [
      {
        name: '',
        docs: {},
        lib: {}
      }
    ]
  }
};

const DOCS_COMPONENTS_DIR = path.resolve('apps/workshop/src/app/components');
const DOCS_FOUNDATIONS_DIR = path.resolve('apps/workshop/src/app/foundations');
const DOCS_UTILITIES_DIR = path.resolve('apps/workshop/src/app/utilities');
const DOCS_SERVICES_DIR = path.resolve('apps/workshop/src/app/services');
const LIB_DIR = path.resolve('libs/nova-lib/src/lib');
const LIB_SERVICES_SUFFIX = 'service.ts';
const LIB_UTILITIES_DIR = path.resolve('./libs/nova-lib/src/lib/_utilities');

// needed
const DOCS_JSON = path.resolve('apps/workshop/src/assets/app/workshop/documentation.json');
const LIB_JSON = path.resolve('apps/workshop/src/assets/lib/nova/documentation.json');
const TARGET_DIR = path.resolve('apps/workshop/src/assets');
const API_CONTENT = path.resolve('apps/workshop/src/assets/metadata/api-content.json');
const EXAMPLES_HIERARCHY = path.resolve('apps/workshop/src/assets/metadata/examples-hierarchy.json');

module.exports = {
  DOCS_COMPONENTS_DIR,
  DOCS_FOUNDATIONS_DIR,
  DOCS_UTILITIES_DIR,
  DOCS_SERVICES_DIR,
  LIB_DIR,
  LIB_SERVICES_SUFFIX,
  LIB_UTILITIES_DIR,
  DOCS_JSON,
  LIB_JSON,
  TARGET_DIR,
  API_CONTENT,
  EXAMPLES_HIERARCHY
};
