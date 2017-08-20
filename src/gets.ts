import * as _ts from 'typescript';
import { for_each, ForEachCallbackX } from './for-each';

export type GetsCallback<T> = ForEachCallbackX<T>;

/**
 * get comments from source, optional callback for custom results
 */
export function gets(source: string | _ts.SourceFile): string[];
export function gets<T>(
  source: string | _ts.SourceFile,
  callback: GetsCallback<T>,
  ts?: typeof _ts,
): T[];
export function gets(
  source: string | _ts.SourceFile,
  callback: GetsCallback<any> = comment => comment,
  // istanbul ignore next
  ts = _ts,
): any[] {
  const results: any[] = [];

  for_each(
    source,
    (comment: string, scanner: _ts.Scanner, source_file: _ts.SourceFile) => {
      const result = callback(comment, scanner, source_file);
      results.push(result);
    },
    ts,
  );

  return results;
}
