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
 * EXAMPLE SCHEMA
 *
 * | property     | description                                                   | required | type      |
 * |--------------|---------------------------------------------------------------|----------|-----------|
 * | name         | Property name.                                                | true     | String    |
 * | description  | Property description, if available.                           | false    | String    |
 * | type         | Property type,                                                | true     | String    |
 * |              | IE/ class, variable, function, boolean, string, number, etc.  |          |           |
 * | default      | Default value for this property, if available.                | false    | String    |
 * | required     | Boolean that identifies whether this property is required.    | false    | Boolean   |
 * | section      | Parent section to which this property corresponds.            | false    | String    |
 * |              | This value matches the propertySections[i].name property.     |          |           |
 * | componentId  | Null                                                          | true     | Null      |
 * | libraryId    | Null                                                          | true     | Null      |
 */

const propertyType = () => {};

const propertyDefault = () => {};

const propertyRequired = () => {};

const componentID = () => {
  return null;
};

const libraryID = () => {
  return null;
};

const getPropertyData = (prop, decoratorType) => {
  /** tags are probably not needed, but leaving logic */
  // let tags = [];
  // prop['jsdoctags']?.forEach((tag) => {
  //   tags.push({
  //     tagName: tag['tagName']['escapedText'],
  //     value: tag['comment']
  //   });
  // });

  let defaultValue = null;
  const tag = prop['jsdoctags']?.find(
    (tag) => tag['tagName']['escapedText'] === 'default' || tag['tagName']['escapedText'] === 'defaultValue'
  );
  if (tag && tag['comment'] !== prop['defaultValue']) {
    defaultValue = tag['comment'];
  }
  defaultValue = defaultValue ? defaultValue : prop['defaultValue'];

  let builtIn = false;
  const tag2 = prop['jsdoctags']?.find(
    (tag) => tag['tagName']['escapedText'] === 'builtin' || tag['tagName']['escapedText'] === 'builtIn'
  );
  builtIn = tag2 ? tag2['comment'] : false;

  return {
    name: prop['name'],
    'decorator type': decoratorType,
    default: removeHTMLCode(defaultValue),
    type: prop['type'],
    description: removeHTMLCode(prop['description']),
    builtIn: removeHTMLCode(builtIn + '')
    // tags: tags,
  };
};

/**
 * create example object, depends on both the result of sections-schema.js and the docs json
 * @param {*} item
 * @param {*} type
 * @returns
 */
const createExampleProperty = (libProperty, type, sectionName) => {
  return {
    name: libProperty.name,
    // description: propertyDescription(),
    // type: propertyType(),
    // decoratorType: type,
    // default: contentProperty.default,
    // required: contentProperty.required,
    section: sectionName,
    componentId: componentID(),
    libraryId: libraryID(),
    data: getPropertyData(libProperty, type)
  };
};

const getDirectiveProps = (component, name) => {
  let examples = [];
  component.inputsClass.forEach((libProperty) => {
    examples.push(createExampleProperty(libProperty, '@Input()', name));
  });
  component.outputsClass.forEach((libProperty) => {
    examples.push(createExampleProperty(libProperty, '@Output()', name));
  });
  return examples;
};

const createExampleConstant = (option, section) => {
  const options = option.split(':');
  return {
    name: options[0].trim(),
    section: section,
    componentId: componentID(),
    libraryId: libraryID(),
    data: {
      'property name': options[0].trim(),
      value: options[1].trim().replace("',", "'") // ie "EXPANDED: 'chevron-down',", => "EXPANDED: 'chevron-down'"
    }
  };
};

const getConstantProps = (libProperty) => {
  let constants = [];
  let options = libProperty.defaultValue;
  if (options.includes('as const')) {
    // !IMPORTANT this only applies for 'as const' values. We'll need another function for other variables.
    options = options.split('\n').slice(1, -1); // transform into key-value pairs like MEDIUM - 'medium'
    // options = options.slice(1, -1); // remove options[0] = '{' and options.last = '} as const'
    options.forEach((option) => {
      constants.push(createExampleConstant(option, libProperty.name));
    });
  }

  return constants;
};

const createServiceProperties = (prop, sectionName) => {
  let defaultValue = null;
  const tag = prop['jsdoctags']?.find(
    (tag) => tag['tagName']['escapedText'] === 'default' || tag['tagName']['escapedText'] === 'defaultValue'
  );
  if (tag && tag['comment'] !== prop['defaultValue']) {
    defaultValue = tag['comment'];
  }
  defaultValue = defaultValue ? defaultValue : prop['defaultValue'];
  defaultValue = removeHTMLCode(defaultValue);
  return {
    name: prop['name'],
    section: sectionName,
    libraryId: libraryID(),
    componentId: componentID(),
    serviceUsage: 'property',
    data: {
      name: prop['name'],
      type: prop['type'],
      default: defaultValue,
      description: removeHTMLCode(prop['description'])
    }
  };
};

const createServiceMethods = (method, sectionName) => {
  let args = [];
  method['args']?.forEach((argument) => {
    let comment = method['jsdoctags']?.find((tag) => {
      return tag['name']?.['escapedText'] === argument['name'];
    });
    comment = comment ? comment['comment'] : '';
    comment = removeHTMLCode(comment);
    args.push({
      name: argument['name'],
      data: {
        name: argument['name'],
        type: argument['type'],
        description: comment
      }
    });
  });
  return {
    name: method['name'],
    section: sectionName,
    libraryId: libraryID(),
    componentId: componentID(),
    description: removeHTMLCode(method['description']),
    returnType: method['returnType'],
    arguments: args,
    serviceUsage: 'method'
  };
};

const getServiceProps = (service, name) => {
  let services = [];
  service['properties']?.forEach((prop) => {
    services.push(createServiceProperties(prop, name));
  });
  service['methods']?.forEach((method) => {
    services.push(createServiceMethods(method, name));
  });
  return services;
};

const removeHTMLCode = (str) => {
  if (str === undefined || str === '') {
    return '';
  }
  return str.replace(/<\/?[^>]+(>|$)/g, '');
};

const getProperties = (name, type, component) => {
  examples = [];
  if (!component) return examples;
  if (type === 'directives') {
    examples = getDirectiveProps(component, name);
  } else if (type === 'constants') {
    examples = getConstantProps(component);
  } else if (type === 'services') {
    examples = getServiceProps(component, name.service ? name.service : name);
  }

  return examples;
};

module.exports = {
  getProperties,
  getServiceProps,
  removeHTMLCode
};
