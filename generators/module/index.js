'use strict';
const Generator = require('yeoman-generator');
const pluralize = require('pluralize');
const changeCase = require('change-case');
const _ = require('lodash');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.argument('module', { type: String, required: true });
  }

  async prompting() {
    this.log(`Generating module ${this.appname}`);

    const prompts = [
      {
        type: 'confirm',
        name: 'includeRepository',
        message: 'Would you like to include a repository?',
        default: true
      },
      {
        type: 'confirm',
        name: 'includeGraphQL',
        message: 'Would you like to include GraphQL support?',
        default: true
      }
    ];

    const module = changeCase.pascalCase(this.options.module);
    const typeName = pluralize.singular(module);
    const lowerTypeName = changeCase.camelCase(typeName);
    this.props = {
      ...(await this.prompt(prompts)),
      module,
      typeName,
      lowerTypeName,
      lowerTypeNamePlural: changeCase.camelCase(module),
      moduleSlugged: changeCase.headerCase(module).toLowerCase()
    };
  }

  writing() {
    const context = {
      ...this.props
    };

    const copyTpl = (src, dest, additionalContext) => {
      const destName = dest || src;
      const srcParam = _.isArray(src)
        ? _.map(
            src,
            entry => (_.startsWith(entry, '!') ? entry : this.templatePath(entry))
          )
        : this.templatePath(src);

      return this.fs.copyTpl(
        srcParam,
        this.destinationPath(destName),
        _.merge(context, additionalContext || {})
      );
    };

    copyTpl(
      'module.ts',
      `server/src/${this.props.moduleSlugged}/${this.props.moduleSlugged}.module.ts`
    );

    copyTpl(
      'service.ts',
      `server/src/${this.props.moduleSlugged}/${this.props.moduleSlugged}.service.ts`
    );

    if (this.props.includeRepository) {
      copyTpl(
        'repository.ts',
        `server/src/${this.props.moduleSlugged}/${this.props.moduleSlugged}.repository.ts`
      );
    }

    if (this.props.includeGraphQL) {
      copyTpl(
        'resolver.ts',
        `server/src/${this.props.moduleSlugged}/${this.props.moduleSlugged}.resolver.ts`
      );

      copyTpl(
        'schema.graphqls',
        `server/src/${this.props.moduleSlugged}/${this.props.moduleSlugged}.graphqls`
      );
    }
  }

  install() {
    this.spawnCommand('npm', ['--prefix=./server', 'run', 'format']);
  }
};
