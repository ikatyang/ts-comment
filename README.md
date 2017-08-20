# ts-comment

[![npm](https://img.shields.io/npm/v/ts-comment.svg)](https://www.npmjs.com/package/ts-comment)
[![build](https://img.shields.io/travis/ikatyang/ts-comment/master.svg)](https://travis-ci.org/ikatyang/ts-comment/builds)
[![coverage](https://img.shields.io/codecov/c/github/ikatyang/ts-comment.svg)](https://codecov.io/gh/ikatyang/ts-comment)

utils for comments in TypeScript/JavaScript file

[Changelog](https://github.com/ikatyang/ts-comment/blob/master/CHANGELOG.md)

## Install

```sh
# using npm
npm install --save ts-comment

# using yarn
yarn add ts-comment
```

## Usage

```ts
import * as ts_comment from 'ts-comment';

const file_content = `
  class X {}
  // comment 1
  const y = 0;
  /* comment 2 */
  function z() {}
`;

ts_comment.gets(file_content); //=> ['// comment 1', '/* comment 2 */']
```

## API

```ts
/**
 * iterate every comment, return `false` to stop iteration
 */
function for_each(
  source: string | ts.SourceFile,
  callback: (comment: string, scanner: ts.Scanner, source_file: ts.SourceFile) => boolean | void,
  ts?: typeof ts,
): void;

/**
 * get comments from source, optional callback for custom results
 */
function gets(source: string | ts.SourceFile): string[];
function gets<T>(
  source: string | ts.SourceFile,
  callback: (comment: string, scanner: ts.Scanner, source_file: ts.SourceFile) => T,
  ts?: typeof ts,
): T[];
```

## Development

```sh
# lint
yarn run lint

# build
yarn run build

# test
yarn run test
```

## License

MIT © [Ika](https://github.com/ikatyang)
