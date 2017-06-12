import * as ts from 'typescript';
import {for_each, ForEachCallbackX} from './for-each';

export type GetsCallback<T> = ForEachCallbackX<T>;

export function gets(source: string | ts.SourceFile): string[];
export function gets<T>(source: string | ts.SourceFile, callback: GetsCallback<T>): T[];
export function gets(source: string | ts.SourceFile, callback: GetsCallback<any> = comment => comment): any[] {
  const results: any[] = [];

  for_each(source, (comment: string, scanner: ts.Scanner, source_file: ts.SourceFile) => {
    const result = callback(comment, scanner, source_file);
    results.push(result);
  });

  return results;
}
