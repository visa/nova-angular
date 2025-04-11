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
 * PROPERTY SECTION SCHEMA
 *   | property    | description                                           | required | type   |
 *   |-------------|-------------------------------------------------------|----------|--------|
 *   | name        | section name                                          | true     | String |
 *   | order       | Order specified from content design review            | false    | Number |
 *   |             | or current HX guidelines implementation/design.       |          |        |
 *   | description | Example section description, if available.            | false    | String |
 */
const { getProperties, removeHTMLCode } = require('./property-schema');

const getPropertySections = (name, apiContentData, libData, type = 'components') => {
  let sections = [];
  let order = 1;
  let props = [];
  let description = '';

  if (type === 'services') {
    const service = apiContentData
      .find((section) => section.type === 'services')
      ?.content?.find((service) => service.name === name);
    if (service) {
      const libComponent = libData.injectables.find((comp) => comp.name === service.service);
      props = getProperties(service, 'services', libComponent);
      description = removeHTMLCode(libComponent?.description) || '';
    }
  } else {
    const component = apiContentData
      .find((section) => section.type === type)
      ?.content?.find((component) => component.name === name);
    if (component) {
      Object.entries(component).forEach(([type, list]) => {
        if (type !== 'name' && list.length > 0) {
          list.forEach((value) => {
            let libComponent =
              type === 'directives' || type === 'related'
                ? libData.components.concat(libData.directives).find((comp) => comp.name === value)
                : type === 'services'
                  ? libData.injectables.find((comp) => comp.name === value)
                  : libData.miscellaneous.variables.find((comp) => comp.name === value);

            if (!libComponent && (type === 'directives' || type === 'related')) {
              const renamedValue = value.includes('Directive')
                ? value.replace('Directive', 'Component')
                : value.includes('Component')
                  ? value.replace('Component', 'Directive')
                  : value;
              libComponent = libData.miscellaneous.variables.find((comp) => comp.name === renamedValue);
            }

            sections.push({
              name: value,
              order: order++,
              type: type,
              selector: libComponent?.selector,
              description: removeHTMLCode(libComponent?.description) || ''
            });
            props = props.concat(getProperties(value, type, libComponent));
            description = removeHTMLCode(libComponent?.description) || '';
          });
        }
      });
    }
  }
  description = removeHTMLCode(description);
  return { sections, props, description };
};

module.exports = {
  getPropertySections
};
