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
 * EXAMPLE SECTION SCHEMA
 *   | property    | description                                           | required | type   |
 *   |-------------|-------------------------------------------------------|----------|--------|
 *   | name        | section name                                          | true     | String |
 *   | order       | Order specified from content design review            | false    | Number |
 *   |             | or current HX guidelines implementation/design.       |          |        |
 *   | description | Example section description, if available.            | false    | String |
 */

const getSections = (page, examplesData) => {
  let sections = [];

  const example = examplesData.find((example) => example.name === page && example.sections.length > 0);
  sections = example?.sections.map((section) => {
    return {
      name: section.name,
      order: section.order,
      description: section.description
    };
  });
  return sections;
};

module.exports = {
  getSections
};
