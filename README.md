# generator-gae-node-nestjs [![NPM version][npm-image]][npm-url]
> A generator for building nestjs apps on app engine node

## Installation

First, install [Yeoman](http://yeoman.io) and `@mondomob/generator-gae-node-nestjs` using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g @mondomob/generator-gae-node-nestjs
```

Then generate your new project:

```bash
yo @mondomob/gae-node-nestjs
```

## Testing

Use `npm link` or whatever you prefer to locally keep up-to-date with the latest.

Once you've done that it's best to make all changes to a concrete project and then copy them back into this generator in order
to utilise your IDE and test the app first. There is a script that helps with this and does the following:
 * Given a working directory for your target project ...
 * Recursively delete the dir, and re-create it
 * Change into that dir and run the yo generator
 * Initialise a local git rep and commit all files so that you can track changes more easily

Usage for non-windows: `./etc/test-generate.sh /some/path/to/any-test-dir`   (dir does not need to exist

Be careful ... it recursively deletes from that point ... if you call it with a bad dir it's on you :).

## Releases

See the [changelog](./CHANGELOG.md)

## License

Apache-2.0 © [Glenn Molnar]()


[npm-image]: https://badge.fury.io/js/@mondomob/generator-gae-node-nestjs.svg
[npm-url]: https://npmjs.org/package/@mondomob/generator-gae-node-nestjs
