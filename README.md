<!-- TOC START min:1 max:3 link:true update:true -->
- [Super Template for UI5](#super-template-for-ui5)
- [Installation](#installation)
- [Usage](#usage)
  - [Quick start](#quick-start)
  - [Prompts](#prompts)
  - [Commands](#commands)
  - [Configuration](#configuration)
- [Extending](#extending)
  - [Yeoman](#yeoman)
  - [Sub-generators](#sub-generators)
  - [Base class and helper class](#base-class-and-helper-class)
  - [Ramda](#ramda)
  - [Files and templates](#files-and-templates)
  - [Adding config options](#adding-config-options)
- [Contributors:](#contributors)

<!-- TOC END -->

# Super Template for UI5

Generates boilerplate for new UI5 projects.

[Yeoman](http://yeoman.io) is a [Node.js](http://nodejs.org) package for generating code projects from pre-defined templates known as _generators_. This project is a generator for starting [UI5](http://openui5.org) projects.

People have written thousands of yeoman generators, and not just for JavaScript projects. You may find an existing one that suits your needs. See the full list at [yeoman.io](http://yeoman.io/generators/). There are a few UI5 generators (search UI5 in the search field) but none of them were to my taste, hence this one. Also, feel free to fork this and add your own enhancements, or make pull requests. See the section below on extending this generator.

# Installation

1. Install node from [nodejs.org](https://nodejs.org/en/download/)
- Install yeoman via npm: `npm install -g yo`
- Install this generator: `npm install -g generator-stui5`

# Usage
These instructions assume you've installed yo via npm and are running it from the command line.

## Quick start
Screenshots below
1. Create a new directory for your project and `cd` into it
2. If you'd like to change the config from default, run `yo stui5:config` then edit the resulting `.yo-rc.json` file. If you're happy with the default settings, skip this step
3. Generate the app with `yo stui5`

Later you can add views with `yo stui5:view <name>` and fragments with `yo stui5:fragment <name>` where `<name>` is the name of the new view or fragment.

1. Create a new directory for your project and `cd` into it
![Screencast: Create new folder](docs/1.gif)

2. Optional: edit default config with `yo stui5:config`
![Screencast: Generate and edit config](docs/2.gif)

3. Generate the main boilerplate with `yo stui5`
![Screencast: Generate app](docs/3.gif)

4. Optional: add a view with `yo stui5:view <name>`
![Screencast: Add a view](docs/4.gif)


## Prompts
For prompts which offer a list (eg 'Single-Page', 'Master-Detail'), move the cursor onto the line with the selection and press enter.

## Commands

Generator argument help: `yo stui5 --help` or `yo stui5:subgen --help` where `subgen` is one of the sub-generators available.

Although you can directly call any sub-generator included in this generator, some of them depend on config that is created by the top-level app generator.

|Sub-generator  |Command[, options]  |Description  |
|--|--|--|
|stui5:config  |`yo stui5:config` | Generate a default .yo-rc.json configuration file|
|stui5  |`yo stui5 [namespace[, title]]`        | Generate a new UI5 app from scratch. Use `namespace` and `title` to avoid those questions in the prompt.|
|stui5:view  |`yo stui5:view <name> [, controllerName[, webappRoot]]`   | Add a view to an existing app, where `<name>` gets prepended to `.view.xml` for the view name|
|stui5:fragment | `yo stui5:fragment <name>[, webappRoot]` | Add a view to existing app. <name> prepended to `.fragment.xml`|


## Configuration

Yeoman uses a config file `.yo-rc.json` at the root directory of the project you're generating. If you find a specific configuration you like, keep a copy of the config file for use in future projects. Yeoman will generate a default config file in the current directory if it can't find one. Any mandatory parameters missing from the config file will be asked for at the command prompt when the generator is run.

Rather than requiring all of the config parameters via prompts, the generator uses the default config parameters defined in stui5:config. If you want to change any of the config parameters from the default values before running the main generator, `yo stui5:config` will generate a default `.yo-rc.json` which you can edit before running `yo stui5` in the same directory.

| Config key | Default value | Description
|---|---|---|
| bootstrap	| '../../resources/sap-ui-core.js'	| path to resource roots in index.html|
| firstViewName	| "Initial"	| the name of the first view to generate|
| webappRoot	| "webapp"	| path that will contain UI5 app files and folders, such as index.html, Component.js, view, controller etc|
| baseController	| true	| include a base controller?|
| baseControllerBody	| false	| include some commonly used helper functions in base controller?|
| formatter	| true	| include util/formatter.js?|
| mockserver	| true	| include a mockserver.js?|
| gitInit	| true	| initialise a git repository?|
| eslint	| true | include .eslintrc?

# Extending

## Yeoman
Writing a yeoman generator is pretty straight forward. There's a good tutorial at [yeoman.io](http://yeoman.io/authoring/). You can either write your own generator or enhance this one (fork your own or open a pull request).

The simplest way to modify the generator is to change the files in the templates folders. Placeholder values inside `<%` tags are swapped out with values passed in from the index.js files of the corresponding sub-generator. For example, in `view/templates/template.view.xml` is a placeholder `<%= viewName %>`, which will be replaced by whatever the value of the `viewName` property in the writing method of `view/index.js`. These values will come from arguments or config, see the yeoman.io tutorial for more details.

In the index.js files of each sub-generator are methods called in sequence by Yeoman. This sequence is called the [run loop](http://yeoman.io/authoring/running-context.html) and is worth familiarising yourself with if you plan on tinkering with the generator. The run loop methods are:
- initializing
- prompting
- configuring
- default
- writing
- conflicts
- install
- end

## Sub-generators
The default sub-generator to be run (when `yo stui5` is called) is the app generator, defined in `/generators/app/index.js`. When a sub-generator is called explicitly, the corresponding index file is used (for example `/generators/view/index.js` in the case of `yo stui5:view`). Sub-generators call other sub-generators via the `composeWith` method. For example, several sub-generators call the config sub-generator via `composeWith('stui5:config')`.

## Base generator and helper class
Yeoman generators inherit from `yeoman-generator` however some of the generators in this project inherit from `generator-stui5.base` which provide a couple of helper wrappers. There's also a bundle of static helper methods in `scb-helper`.

## Ramda
This project uses Ramda. If you're unfamiliar with Ramda, checkout some of the introductions at [ramdajs.com](http://ramdajs.com/).

## Files and templates
Working with the filesystem is implemented using [mem-fs-editor](https://github.com/sboudrias/mem-fs-editor) which is accessible in the yeoman generator as `this.fs`.

The mem-fs-editor templating is implemented using [ejs](http://ejs.co). The documentation is pretty concise but the best way to get used to it is to just look at some of the examples here. Search for `<%` in files to see example use of placeholders. The Base.controller template in stui5:core uses the ejs _includes_ and _scripting_ concepts.

## Adding config options

Default parameters go in the defaults object in `config/index.js`. Mandatory parameters for which there is no default (such as namespace or title) should have a prompt and argument added, if the parameter isn't already available in the config file. Try to keep the number of prompts minimal for speed of use. If users want greater control over their config, they should use `yo stui5:config` and edit that. See the [configuration section](#configuration), above.

# Contributors
- Oli Rogers, Bluefin Solutions (Gruntfile and continuous integration templates)
- Tiago Almeida, Bluefin Solutions (Unit test templates)
- Stuart Bell, Bluefin Solutions
