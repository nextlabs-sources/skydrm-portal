# Skydrm Portal

This project provides the landing page for SkyDRM service

## Technology Stack Requirements

* Required development tools:
  * Node.js 16.13.x  (Get it from `https://nodejs.org/en/download/`)
  * Bulma.css 0.9.x (Get it from `https://bulma.io/`)
  * Dart 2.12.x (Get it from `https://dart.dev/get-dart`)

## Installation

### Custom Bulma Theme

1. Go to `custom_bulma` folder
2. Run `dart pub get` to install all the required dependencies (Note: Requires Dart to be installed)
3. Run `dart .\compile-sass.dart .\custom_bulma.scss custom_bulma.css` to generate the `custom_bulma.css`
4. Copy `custom_bulma.css` into `src\assets\css` directory

### Configurations

The settings are stored in the environments folder

* environments.ts - Global values for development enviroments
* environments.prod.ts - Global values for production environments

### Production

#### Build

1. Run `npm i` to install angular TS locally
2. Run `ng build --configuration production` to compile the source code.
3. The deployable files are generated in `static` folder

#### Test the Build

1. Go to the `tests\node-server` folder
2. Run `npm install` to install all the required js libraries
3. Run `npm run serve` to start the web server
4. Navigate to `http://localhost:8080/`

#### Deploy

1. Copy all files under `dist/skydrm-portal` folder to production

### Development

1. Run `npm i` to install angular TS locally
2. Run `ng serve` to start a dev server
3. Navigate to `http://localhost:4200/`

#### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

#### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

### Important Notes

* Building with `--production configuration` flag will automatically use environments.prod.ts file

* For none top level production site, for example <https://abc.com/skydrm>, make the following changes.

  * In index.html, replace `<base href="/">` with `<base href="/skydrm/">`
  * For production build, run `ng build --configuration production --base-href /skydrm/`
  * For development, Run `ng serve --base-href /skydrm/`

* reCaptcha v2 requires the domain name to be registered at <https://www.google.com/recaptcha/admin>
