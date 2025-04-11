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
 * This script generates the content data for the examples hierarchy
 * Based on the docs documentation.json file
 * This should only be used when the current documentation content is correct
 */

// @TODO pretty sure the parse functions duplicate code
const fs = require('fs');
const path = require('path');
const { DOCS_JSON, TARGET_DIR } = require('./meta-data.constants');
const { getTopLevelPages, componentName } = require('./component-schema');

// could combine this with getTopLevelPages so as to not filter the same multiple times
const findDocsExampleMessages = (docsData) => {
  const exampleMessages = docsData.filter((component) => {
    return component.file.includes('dev-messages');
  });
  return exampleMessages;
};

const findDescription = (exampleContent) => {
  const sectionMessageRegex =
    /<div\s+v-section\s+v-message[^>]*ngProjectAs="example-component-prefix"[^>]*>.*?<\/div>/gs;
  const novaWorkshopMessageRegex =
    /<nova-workshop-dev-message[^>]*ngProjectAs="example-component-prefix"[^>]*>.*?<\/nova-workshop-dev-message[^>]/gs;

  inlineMessage = sectionMessageRegex.exec(exampleContent);
  componentMessage = novaWorkshopMessageRegex.exec(exampleContent);
  let description = '';

  const extractTextContent = (html) => {
    const regex = />([^<]+)</g;
    let match;
    let textContent = '';

    while ((match = regex.exec(html)) !== null) {
      textContent += match[1].trim() + ' ';
    }

    return textContent.trim();
  };

  if (inlineMessage) {
    const exampleContentRegex = /<div\s+v-message-content[^>]*>(.*?)<\/div>/gs;
    let exampleContentMatch = exampleContentRegex.exec(exampleContent);
    if (exampleContentMatch) {
      exampleContentMatch = exampleContentMatch[1].trim();
      description = extractTextContent(exampleContentMatch);
    }
  } else if (componentMessage) {
    const fullSelectorRegex = /<([\w-]+)[^>]*>/;
    const fullSelectorMatch = fullSelectorRegex.exec(componentMessage[0]);
    if (fullSelectorMatch) {
      const devMessage = exampleMessages.find((message) => message.selector === fullSelectorMatch[1]);
      if (devMessage) {
        description = extractTextContent(devMessage.templateData);
      }
    }
  }

  return description;
};

const parseExamples = (sectionContent) => {
  const exampleRegex = /<nova-workshop-example\s+([^>]+?)\s*>\s*.*?<\/nova-workshop-example>/gs;
  const selectorRegex = /selector="([^"]+)"/;
  const exampleTitleRegex = /exampleTitle="([^"]+)"/;
  const examples = [];
  let exampleMatch;

  while ((exampleMatch = exampleRegex.exec(sectionContent)) !== null) {
    const attributes = exampleMatch[1];
    const selectorMatch = selectorRegex.exec(attributes);
    const exampleTitleMatch = exampleTitleRegex.exec(attributes);

    if (selectorMatch && exampleTitleMatch) {
      examples.push({
        order: exampleOrder++,
        name: exampleTitleMatch[1],
        selector: selectorMatch[1].trim(),
        description: findDescription(exampleMatch[0])
      });
    }
  }
  return examples;
};

// START GENAI@CHATGPT4
const parsetemplateData = (templateData, name) => {
  const sectionRegex = /<(h2|h3)\s+vTypography="[^"]+"[^>]*>(.*?)<\/\1>.*?(?=<h2[^>]*>|<h3[^>]*>|$)/gs;
  let match;
  const sections = [];
  let sectionOrder = 1;

  while ((match = sectionRegex.exec(templateData)) !== null) {
    const sectionContent = match[0];
    const sectionName = match[2];

    const examples = parseExamples(sectionContent);

    sections.push({
      name: sectionName,
      order: sectionOrder++,
      description: '',
      examples: examples
    });
  }

  if (sections.length === 0) {
    const useName = name === 'breakpoints' ? 'Breakpoints' : 'Examples';
    sections.push({
      name: useName,
      order: sectionOrder++,
      description: '',
      examples: parseExamples(templateData)
    });
  }
  return sections;
};
// END GENAI@CHATGPT4

const contentData = [];
let exampleOrder = 1;
let exampleMessages = [];
const getComponentContentData = (item) => {
  const templateData = item.templateData;
  const name = componentName(item);
  exampleOrder = 1;
  const sections = parsetemplateData(templateData, name);
  contentData.push({ name, sections: sections });
};

const getContentData = () => {
  let docsData = fs.readFileSync(DOCS_JSON, 'utf-8');
  docsData = JSON.parse(docsData);
  docsData = docsData.components.concat(docsData.directives);

  const topLevelPages = getTopLevelPages(docsData);
  exampleMessages = findDocsExampleMessages(docsData);

  topLevelPages.forEach((page) => {
    getComponentContentData(page);
  });

  fs.writeFileSync(
    path.resolve(`${TARGET_DIR}/metadata/examples-hierarchy.json`),
    JSON.stringify(contentData, null, 2)
  );
};

module.exports = {
  getContentData
};
