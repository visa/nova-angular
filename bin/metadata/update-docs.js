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
const fs = require('fs');
const path = require('path');

function updateDocs() {
  const componentsDir = path.resolve('apps/workshop/src/app/components');

  fs.readdir(componentsDir, (err, components) => {
    if (err) {
      console.error('Error reading components directory:', err);
      return;
    }

    components.forEach((component) => {
      const componentDir = path.join(componentsDir, component);
      const docsHtmlPath = path.join(componentDir, `${component}.docs.html`);

      if (!fs.existsSync(docsHtmlPath)) {
        if (component !== 'components.routes.ts') {
          console.warn(`docs.html not found for component: ${component}`);
        }
        return;
      }

      const docsHtmlContent = fs.readFileSync(docsHtmlPath, 'utf-8');

      fs.readdir(componentDir, (err, examples) => {
        if (err) {
          console.error(`Error reading examples directory for component ${component}:`, err);
          return;
        }

        examples.forEach((example) => {
          const exampleDir = path.join(componentDir, example);
          const docsTsPath = path.join(exampleDir, `${example}.docs.ts`);

          if (!fs.existsSync(docsTsPath)) {
            return;
          }

          const docsTsContent = fs.readFileSync(docsTsPath, 'utf-8');
          const selectorMatch = docsTsContent.match(/selector:\s*'([^']+)'/);
          const exampleSelector = selectorMatch ? selectorMatch[1] : `nova-workshop-${example}`;
          if (!docsHtmlContent.includes(exampleSelector)) {
            const docsTsContent = fs.readFileSync(docsTsPath, 'utf-8');
            if (!docsTsContent.includes('/** @ignore */')) {
              const componentIndex = docsTsContent.indexOf('@Component');
              const importEndIndex =
                docsTsContent.lastIndexOf('import', componentIndex) +
                docsTsContent.substring(docsTsContent.lastIndexOf('import', componentIndex)).indexOf(';') +
                1;
              const insertIndex = componentIndex !== -1 ? componentIndex : importEndIndex;
              const updatedDocsTsContent = `${docsTsContent.slice(0, insertIndex)}/** @ignore */\n${docsTsContent.slice(insertIndex)}`;
              fs.writeFileSync(docsTsPath, updatedDocsTsContent, 'utf-8');
              console.log(`Added /** @ignore */ to ${docsTsPath}`);
            }
          }
        });
      });
    });
  });
}

module.exports = updateDocs;
