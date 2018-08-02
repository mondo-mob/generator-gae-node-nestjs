'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const slugify = require('slugify');
const _ = require('lodash');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(`Welcome to the ${chalk.red('gae-node')} generator!`));

    const prompts = [
      {
        name: 'project',
        message: 'What is the ID of this project?',
        store: true,
        default: slugify(this.appname)
      },
      {
        name: 'projectName',
        message: 'What is the name of this project?',
        store: true,
        default: _.startCase(this.appname)
      },
      {
        name: 'gitPath',
        message: 'What is the HTTPS git path for this project?',
        store: true
      },
      {
        name: 'adminEmail',
        message: 'What email address should we use to create the initial admin login?',
        store: true
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    this.fs.copy(
      this.templatePath('dummyfile.txt'),
      this.destinationPath('dummyfile.txt')
    );
  }

  install() {
    this.installDependencies();
  }
};
