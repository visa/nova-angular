<!--
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
 -->
# Visa Product Design System - Nova Angular

- [About](#about)
- [Security](#security)
- [Background](#background)
- [Install](#install)
- [Usage](#usage)
- [Why Nova Angular?](#why-nova-angular)
- [Testing](#testing)
- [Maintainers](#maintainers)
- [Thanks](#thanks)
- [Contributing](#contributing)
- [License](#license)

## <a name="about"></a>Nova Angular
> Accessible Visa Product Design System components built for Angular

Nova Angular is a comprehensive library of accessible components designed to align with the Visa Product Design System. It provides developers with a set of reusable UI elements that can be easily integrated into Angular applications. With Nova Angular, developers can quickly build visually consistent and user-friendly interfaces that adhere to accessibility best practices.

### Key Features
- **Wide range of components**: Includes buttons, form elements, navigation menus, and more.
- **Customizable**: Built on Nova Styles CSS, allowing for extensive theming and customization.
- **Accessibility**: Adheres to accessibility best practices to ensure inclusive user experiences.
- **Flexible state management**: Supports bring-your-own state, enabling custom services and classes.

Whether you are building a small project or a large-scale application, Nova Angular offers a robust foundation for creating visually appealing and accessible user interfaces.

This library is built on our Nova Styles CSS which is extremely theme-able/customizable and the Angular components are now bring-your-own state. That means if our examples, styles, or behaviors don't cover your use case then you just add your own services, classes, or themes and now the world is your oyster!

## <a name="security"></a>Security

Our package follows security best practices and ensures the safety of user data. It relies on a minimal number of dependencies, minimizing potential vulnerabilities.

## <a name="install"></a>Install

Available through the [NPM](https://www.npmjs.com/).

**NPM:**

```sh
npm install @visa/nova-angular
```

**PNPM:**

```sh
pnpm install @visa/nova-angular
```

**Yarn:**

```sh
yarn add @visa/nova-angular
```

**Bun:**

```sh
bun add @visa/nova-angular
```

### Dependencies
View our package.json for the most up-to-date dependencies, including peer dependencies and dev dependencies.

## <a name="usage"></a>Usage

### Step 1: Update Angular
Nova Angular supports Angular v16 and v17. Visit Angular’s guide on how to update [Angular to v16](https://angular.dev/update-guide?v=15.0-16.0&l=1) or update [Angular to v17](https://angular.dev/update-guide?v=16.0-17.0&l=1).

### Step 2: Install the library
Reference our [install guidelines](#install).

### Step 3: Set up the application

#### Import Nova styles
Import the Nova Styles library and theme in your `angular.json` or equivalent file. Visa-light is the default theme, but can be replaced with other available themes. To learn more, visit Theming, and for more about Nova Styles, visit Get started for Styles (CSS).

``` json
"styles": [
    // ...
    "node_modules/@visa/nova-styles/styles.css",
    "node_modules/@visa/nova-styles/themes/visa-light/index.css", // see theme options within node_modules/@visa/nova-styles/themes/
    // project specific CSS style overrides
  ],
```

#### Update compilerOptions

Add or update your paths in your `tsconfig.json` or equivalent file.

##### Using Angular 16
``` json
{
  "compilerOptions": {
    ...,
    "paths": {
      "@angular/*": ["node_modules/@angular/*"],
      "@visa/*": ["node_modules/@visa/*"],
    }
  }
}
```

##### Using Angular 17
``` json
{
  "compilerOptions": {
    ...,
    "paths": {
      "@visa/*": ["node_modules/@visa/*"],
    }
  }
}
```

#### Import the Nova Angular component library
Import our library into your standalone component or NgModule.

##### Using standalone Components
``` tsx
import { NovaLibModule } from '@visa/nova-angular';
  
@Component({
  ...
  standalone: true,
  imports: [
    ...
    NovaLibModule,
    ...
  ],
})
```

##### Using NgModule
``` tsx
import { NovaLibModule } from '@visa/nova-angular';
  
@NgModule({
  imports: [
    ...
    NovaLibModule,
    ...
  ],
})
```

### Step 4: Add icons (optional)
Nova Angular can be used with Nova icons or a custom icon library. This documentation and the component examples use the Nova icons library. In addition, Angular icons are available as standalone icons or icon sprites. They can be imported into your standalone component file, or your NgModule.

#### Using standalone icons (recommended)
If you need just a few icons, you can import them directly from `@visa/nova-icons-angular`, then use the icons directly inside your HTML.

``` html
<div class="my-component"> 
  <svg v-icon-generic-accessability-low />
  <svg v-icon-generic-calendar-tiny />
</div>
```

##### Importing in standalone components
``` tsx
import { Component } from "@angular/core";
import { GenericAccessabilityLow, GenericCalendarTiny } from "@visa/nova-icons-angular"; 

@Component({ 
  selector: "simple-my-component",
  templateUrl: "./my-component.component.html",
  standalone: true,
  imports: [GenericAccessabilityLow, GenericCalendarTiny],
}) export class MyComponent {}
```

##### Importing in NgModule
``` tsx
import { NgModule } from "@angular/core";
import { GenericAccessabilityLow, GenericCalendarTiny } from "@visa/nova-icons-angular"; 
 
@NgModule({ 
  selector: "simple-my-component",
  templateUrl: "./my-component.component.html",
  standalone: true,
  imports: [GenericAccessabilityLow, GenericCalendarTiny],
}) export class MyModule {}
```

#### Icon sprites
If you need many icons or prefer a single import for all icons of a type, you can use icon sprites. Import them directly from `@visa/nova-icons-angular`, then use the icons inside your HTML.

``` html
<div class="my-component"> 
  <svg v-icon icon="information" iconSize="low" aria-label="info"></svg>
  ...
  <v-icon-library-generic></v-icon-library-generic>
</div>
```

##### Importing in standalone components
``` tsx
import { Component } from "@angular/core";
import { NovaIconsGenericModule } from "@visa/nova-icons-angular";  

@Component({ 
  selector: "simple-my-component",
  templateUrl: "./my-component.component.html",
  standalone: true,
  imports: [NovaIconsGenericModule],
}) export class MyComponent {}
```

##### Importing in NgModule
``` tsx
import { NgModule } from "@angular/core";
import { NovaIconsGenericModule } from "@visa/nova-icons-angular";  

@NgModule({ 
  selector: "simple-my-component",
  templateUrl: "./my-component.component.html",
  standalone: true,
  imports: [NovaIconsGenericModule],
}) export class MyModule {}
```

### Step 5: Use the components
After adding icons, you’re ready to use Angular components by copying and pasting the example code into your application. Check out any of our components to give it a try.

## <a name="why-nova-angular"></a>Why Nova Angular?

### Light Weight

We've reduced our library to basic markup components and functional hooks for a lighter, simpler, and more flexible experience.

### Building Blocks

No more waiting on feature requests. We provide the building blocks for you to easily create and customize your own components.

### Built For Developers

Nova Angular is sleek and unobtrusive. Our beautifully designed components allow any developer to create stunning apps with ease. We now also support strict type safety, so now type warnings are provided inline, before building and deploying.

## <a name="testing"></a>Testing

### Our Approach

We conduct rigorous testing using Jest to ensure our components are accessible and meet our high standards. We use Axe for comprehensive accessibility testing and snapshot testing to minimize regression. Each component undergoes individual unit testing based on its API, followed by integration testing using examples to ensure seamless interaction.

Our goal is to achieve 100% test coverage for all components. Our pipeline safeguards against merging any code that fails our tests. While we have hundreds of tests providing us with full code coverage, we recognize that there is always room for improvement. We are constantly working to improve our testing suite.

## <a name="maintainers"></a>Maintainers

This project is maintained by the Visa Product Design System engineering team. If you need to get in touch please reach out to us via any of our options on our support page.

## <a name="thanks"></a>Thanks

Thanks to all those who have contributed and to the Visa Product Design team for all of the hours and thought that have gone into making the design system as easy to use as possible.

## <a name="contributing"></a>Contributing

SEE CONTRIBUTING.md

## <a name="license"></a>License

SEE LICENSE IN LICENSE
