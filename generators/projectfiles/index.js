var Generator = require('../generator-stui5.base'),
S = require('../scb-helper'),
R = require('ramda');

module.exports = class extends Generator {

	// ********************************************************* //
	// run loop: http://yeoman.io/authoring/running-context.html
	// ******************************************************* //

	writing() {
    var rootCopy = this.copy('.');

    // copy project files

		// package.json
		if (this.isConfigTrue('packageJson')) {
			rootCopy('package.json')
		}

    // eslint
    if(this.isConfigTrue('eslint')){
      rootCopy('.eslintrc');
    }

    // gitignore
    if (this.isConfigTrue('gitInit')) {
      rootCopy('.gitignore');
    }

    // ci
    if (this.isConfigTrue('ci')) {
      rootCopy('.gitlab-ci.yml');
    }

    // gruntfile
    if (this.isConfigTrue('gruntfile')) {
      rootCopy('Gruntfile.js');
    }

	}


};
