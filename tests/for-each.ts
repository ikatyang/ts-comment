import * as fs from 'fs';
import * as path from 'path';
import * as ts from 'typescript';
import {for_each} from '../src/index';

const load_fixture = (name: string) =>
  fs.readFileSync(path.resolve(__dirname, `../fixtures/${name}.ts`), 'utf8');

it('should work correctly with source (SourceFile)', () => {
  const source_file = ts.createSourceFile('', load_fixture('general'), ts.ScriptTarget.Latest, false);
  const comments: string[] = [];
  for_each(source_file, comment => {
    comments.push(comment);
  });
  expect(comments).toMatchSnapshot();
});

it('should work correctly with source (string)', () => {
  const comments: string[] = [];
  for_each(load_fixture('general'), comment => {
    comments.push(comment);
  });
  expect(comments).toMatchSnapshot();
});

it('should break loop with callback return false', () => {
  const comments: string[] = [];
  for_each(load_fixture('general'), comment => {
    comments.push(comment);

    // tslint:disable-next-line:no-magic-numbers
    return (comments.length < 5);
  });

  expect(comments).toMatchSnapshot();
});

it('should parse correctly with Template Literal', () => {
  const comments: string[] = [];
  for_each(load_fixture('template'), comment => {
    comments.push(comment);
  });
  expect(comments).toMatchSnapshot();
});

it('should parse correctly with Regex Literal', () => {
  const comments: string[] = [];
  for_each(load_fixture('regex'), comment => {
    comments.push(comment);
  });
  expect(comments).toMatchSnapshot();
});
