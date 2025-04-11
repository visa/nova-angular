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
 * | property     | description                                                | required | type      |
 * |--------------|----------------------------------------------------------- |----------|-----------|
 * | componentId  | Null                                                       | true     | Null      |
 * | description  | Example description, if available.                         | true     | String    |
 * | libraryId    | Null                                                       | true     | Null      |
 * | name         | Example name                                               | true     | String    |
 * | order        | Order specified from content design review                 | false    | Number    |
 * | section      | Parent section to which this example corresponds           | false    | String    |
 * | snippets     | Code snippets. Object with keys as language or extension,  | true     | Object    |
 * | ...          | value as the actual code snippet.                          |          |           |
 * | ...          | Note multiple code snippets per example possible.          |          |           |
 * | tags         | Array of strings. IE/ docs, custom, alternate, etc         | false    | [String]  |
 * | url          | URL path. Assumes domain name and any versioned directory. | false    | String    |
 */

const componentID = () => {
  return null;
};

/**
 * placeholder example description
 */
const exampleDescription = () => {
  // Not sure where this is located. It is a placeholder for future use.
  return '';
};

const libraryID = () => {
  return null;
};

/**
 * retrieve example name, order, and section from metadata.json
 */
const exampleSnippets = (example) => {
  const html = example.templateData;
  const ts = example.sourceCode;
  return {
    html,
    ts
  };
};

/**
 * retrieve example name, order, and section from metadata.json
 */
const exampleTags = (example) => {
  let tags = [];
  if (example.description) {
    const match = example.description?.match(/#[a-zA-Z|\-]*/g);
    if (match) {
      tags = match.map((tag) => tag.replace('#', ''));
    }
  }
  if (tags.length === 0) tags = ['docs'];
  return tags;
};

/**
 * retrieve example name, order, and section from metadata.json
 */
const exampleUrl = (example) => {
  let link = example.file.split('/').slice(-4, -1).join('/');
  link = link.replace('surfaces/', 'surface/');
  return link;
};

/**
 * create example object, depends on both the result of sections-schema.js and the docs json
 * @param {*} item
 * @param {*} type
 * @returns
 */
const createExampleObject = (contentExample, sectionName, docsJsonExample) => {
  if (docsJsonExample.name === 'GlobalBannerComponent') return;
  return {
    componentId: componentID(),
    description: contentExample.description,
    libraryId: libraryID(),
    name: contentExample.name,
    order: contentExample.order,
    section: sectionName,
    snippets: exampleSnippets(docsJsonExample),
    tags: exampleTags(docsJsonExample),
    url: exampleUrl(docsJsonExample)
  };
};

const getExamples = (name, docsData, examplesData) => {
  const examples = [];
  let component = examplesData.find((comp) => comp.name === name);
  if (component) {
    component.sections.forEach((section) => {
      section.examples.forEach((contentExample) => {
        const docsJsonExample = docsData.find((example) => example.selector === contentExample.selector.trim());
        if (docsJsonExample) {
          const example = createExampleObject(contentExample, section.name, docsJsonExample);
          if (example) examples.push(example);
        }
      });
    });
  }

  return examples;
};

module.exports = {
  getExamples
};
