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
import { sentenceCase } from 'change-case';
import { copyFileSync, existsSync, mkdirSync, readdir, writeFileSync } from 'fs';
const themesDir = './node_modules/@visa/nova-styles/themes';
const workshopDir = './apps/workshop/src/assets';

if (!existsSync(workshopDir)) {
  mkdirSync(workshopDir);
}
if (!existsSync(`${workshopDir}/themes`)) {
  mkdirSync(`${workshopDir}/themes`);
}

readdir(themesDir, (err, files) => {
  if (files.length < 3) {
    console.log(
      '\x1b[31m',
      'Attention: it looks like certain nova themes are missing. Make sure to upgrade @visa/nova-styles to version @1.4.0 or higher.'
    );
  }
  const themesList = [];
  for (let i = 0; i < files.length; i++) {
    if (files[i] !== 'nova') {
      copyFileSync(`${themesDir}/${files[i]}/index.css`, `${workshopDir}/themes/${files[i]}.css`);
      themesList.push({ key: files[i], label: sentenceCase(files[i]) });
    }
  }
  writeFileSync(`${workshopDir}/themes/themes-list.json`, JSON.stringify(themesList));
});
