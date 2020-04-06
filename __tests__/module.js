'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('@mondomob/generator-gae-node-nestjs:module', () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, '../generators/module'))
      .withPrompts({ someAnswer: true });
  });

  it('creates files', () => {
    assert.file(['dummyfile.txt']);
  });
});
