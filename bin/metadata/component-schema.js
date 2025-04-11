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
/**
 * COMPONENT SCHEMA
 *
 * | property         | description                                         | required | type     |
 * |------------------|-----------------------------------------------------|----------|----------|
 * | name             | component name                                      | true     | String   |
 * | version          | component version, if available                     | true     | String   |
 * | description      | component description, if available                 | true     | String   |
 * | category         | component category, if available.                   | false    | String   |
 * |                  | IE/ abstract, component, hook, directive            |          |          |
 * | libraryId        | Null                                                | true     | Null     |
 * | exampleSections  | Array of content-defined example sections.          | false    | [Object] |
 * | examples         | Array of examples.                                  | false    | [Object] |
 * | propertySections | Array of content-defined property sections.         | false    | [Object] |
 * | properties       | Array of properties.                                | false    | [Object] |
 */
const fs = require('fs');
const { DOCS_JSON, EXAMPLES_HIERARCHY, API_CONTENT, LIB_JSON } = require('./meta-data.constants');
const { getSections } = require('./example-sections-schema');
const { getExamples } = require('./example-schema');
const { getPropertySections } = require('./property-sections-schema');
const full = require('core-js/full');
const { getServiceProps } = require('./property-schema');

/**
 * traverse the docs json and grab the first-level docs pages to get names and orders
 */
const getTopLevelPages = (docsData) => {
  const topLevel = docsData.filter((component) => {
    return component.file.replace('apps/workshop/src/app/', '').split('/').length <= 3;
  });
  return topLevel;
};

/**
 * retrieve component name
 */
const componentName = (component) => {
  let componentName = component.file.replace('apps/workshop/src/app/', '').split('/')[1];
  if (!componentName) return;
  return componentName;
};

/**
 * placeholder component version
 */
const componentVersion = () => {
  // ATM, this is not updated. It is a placeholder for future use.
  return '0.0.1';
};

/**
 * placeholder component description
 */
const componentDescription = () => {
  // Not sure where this is located. It is a placeholder for future use.
  return '';
};

/**
 * One of the following: 'foundations', 'utilities', 'components', 'services'
 */
const componentCategory = (category) => {
  return category;
};

const libraryID = () => {
  return null;
};

const componentExampleSections = (name) => {
  return getSections(name, examplesData);
};
const componentExamples = (name) => {
  return getExamples(name, docsData, examplesData);
};
const componentPropertySections = (name, type) => {
  return getPropertySections(name, apiContentData, fullLibData, type);
};

/**
 * create component object
 * See table at top of file for full schema
 */
const createComponentObject = (item, type) => {
  const name = type === 'services' ? item.name : componentName(item);
  const { sections, props, description } = componentPropertySections(name, type);
  if (type === 'services' && props.length === 0) return; // don't add component-level services (they'll be added with the component)
  return {
    name: name === 'screenreader-only' ? 'accessibility' : name === 'surfaces' ? 'surface' : name,
    version: componentVersion(),
    description: description,
    category: componentCategory(type),
    libraryId: libraryID(),
    exampleSections: type === 'services' ? [] : componentExampleSections(name, type),
    examples: type === 'services' ? [] : componentExamples(name, type),
    propertySections: sections,
    properties: props
  };
};

let docsData;
let libData;
let fullLibData;
let examplesData;
let apiContentData;
const getComponentData = () => {
  let data = [];
  docsData = fs.readFileSync(DOCS_JSON, 'utf-8');
  docsData = JSON.parse(docsData);
  docsData = docsData.components.concat(docsData.directives);

  fullLibData = fs.readFileSync(LIB_JSON, 'utf-8');
  fullLibData = JSON.parse(fullLibData);
  libData = fullLibData.components.concat(fullLibData.directives);

  examplesData = fs.readFileSync(EXAMPLES_HIERARCHY, 'utf-8');
  examplesData = JSON.parse(examplesData);

  apiContentData = fs.readFileSync(API_CONTENT, 'utf-8');
  apiContentData = JSON.parse(apiContentData);

  const topLevelPages = getTopLevelPages(docsData);

  let components = [];
  let services = [];
  let utilities = [];
  let foundations = [];

  topLevelPages.forEach((page) => {
    if (page.file.includes('components')) {
      components.push(page);
    } else if (page.file.includes('utilities')) {
      utilities.push(page);
    } else if (page.file.includes('foundations')) {
      foundations.push(page);
    }
  });

  apiContentData.forEach((section) => {
    if (section.type === 'services') {
      section.content.forEach((service) => {
        services.push(service);
      });
    }
  });

  components.forEach((item) => {
    data.push(createComponentObject(item, 'components'));
  });

  services.forEach((item) => {
    const service = createComponentObject(item, 'services');
    if (service) {
      data.push(service);
    }
  });

  utilities.forEach((item) => {
    data.push(createComponentObject(item, 'utilities'));
  });

  foundations.forEach((item) => {
    data.push(createComponentObject(item, 'foundations'));
  });

  return data;
};

module.exports = {
  getComponentData,
  getTopLevelPages,
  componentExampleSections,
  componentName
};
