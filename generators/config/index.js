var Generator = require('../generator-stui5.base'),
R = require('ramda');

module.exports = class extends Generator {
	// ********************************************************* //
	// run loop: http://yeoman.io/authoring/running-context.html
	// ******************************************************* //

	initializing(){
		// set default config
		this.config.defaults({
			bootstrap: '../../resources/sap-ui-core.js', // path to resource roots in index.html
			firstViewName: "Initial", // the name of the first view to generate
			webappRoot: "webapp", // path that will contain UI5 app files and folders, such as index.html, Component.js, view, controller etc
			baseController: true, // include a base controller?
			baseControllerBody: false, // include some commonly used helper functions in base controller?
			formatter: true, // include util/formatter.js?
			mockServer: true, // include a mockserver?
			gitInit: true, // initialise a git repository?
			eslint: true // include .eslintrc?
		});
		// TODO: finalise the following templates then add back to config:
		// gruntfile: false, // include a Gruntfile?
		// qunit: false, // include unit test template?
		// packageJson: false, // include package.json?
		// ci: false, // include .gitlab-ci.yml?

		// TODO: figure out how to modify files with properties from supplied config. Eg properties on the yo-rc for adding your own manifest properties/eslint properties/.gitignore paths. Add these empty properties to the default config. Until then, people can fork the repo and make their own template files
	}
};
