# :exclamation: Under development! Use it carefully! :exclamation:

# Vue 3 boilerplate by DSR Corporation 

This is vue 3 project architecture that resolves most of the problems developers usually need to resolve on the project start-up such as project structure/state management/dependencies management/auth framework/basic components etc. It allows starting development rapidly.

> *Please note*: This boilerplate is based on the recently released vue 3.0. Vue 3.x ecosystem is quite young which creates obvious problems but it grows very fast. Vue 3.x provides significant [improvements](https://github.com/vuejs/vue-next/releases/tag/v3.0.0). 
> This project will be updating with vue 3.0 ecosystem changes.

## Table of contents

- [Prerequisites](#prerequisites)
- [How to use](#how-to-use)
- [Project structure](#project-structure)
- [Features and roadmap](#features-and-roadmap)
- [Project setup](#project-setup)
- [License](#license)

## Prerequisites

- NPM **> 6.x**  

## How to use

Just copy content of this repo and use it as a skeleton. You are free to do any adoptions e.g. change preprocessor etc. (The project is generated using [vue-cli](https://cli.vuejs.org/)).

## Project structure

**TBD**

## Features and roadmap

- Code validation
	- Esling configuration :white_check_mark:
	- Prettier :white_check_mark:
	- Typescript and tsconfig.json configuration :white_check_mark:
- State management
	- Integration of Vuex 4.x :white_check_mark:
	- Examples (login/logout) :white_check_mark:
	- Typings improvements :x: we hope for improvements from the vuex team (vuex 4.x is in beta now)
	- Enhanced dependency injection in vuex modules :x: 
- Dependencies management (please watch our [presentation](https://youtu.be/iBzovd4QlEI) on youtube)
	- [Tsyringe](https://github.com/microsoft/tsyringe) integration :white_check_mark:
	- Examples (Logger, toaster, user service) :white_check_mark:
- Localization
	- [vue-i18n](https://kazupon.github.io/vue-i18n/) integration :white_check_mark:
- Basic components
	- Button :white_check_mark:
	- Input :white_check_mark:
	- Svg icon :x:
	- Dropdown :x:
	- Checkbox/Radio :x:
- Form validation/validation framework :x:
- Common functionality
	- Login form :white_check_mark:
	- Auth framework (token) :white_check_mark: (partially done)
	- Lazy loading example (Login) :white_check_mark:
	- Basic header, several example pages (list and view) :x:
- CSS
	- scss + BEM :white_check_mark:
	- Make it beautiful (introduce design system) :x:
- Testing
	- Integrate testing frameworks - [Cypress](https://www.cypress.io/) :white_check_mark:
	- Example tests :x:
	- DI integration example  :x:
- API mocking (if you BE development goes in parallel and you need to mock API)
	-  [MirageJs](https://miragejs.com/) integration :white_check_mark:
	-  Typings improvements :x:

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Run your end-to-end tests
```
npm run test:e2e
```

### Lints and fixes files
```
npm run lint
```

## License

MIT License

Copyright (c) 2020 DSR Corporation

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
