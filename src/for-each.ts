import * as ts from 'typescript';

// modified from https://github.com/eslint/typescript-eslint-parser/blob/f5fcc87/lib/convert-comments.js

export type ForEachCallback = ForEachCallbackX<void | boolean>;
export type ForEachCallbackX<T> = (comment: string, scanner: ts.Scanner, source_file: ts.SourceFile) => T;

export const for_each = (source: string | ts.SourceFile, callback: ForEachCallback) => {
  const source_file = (typeof source === 'string')
    ? ts.createSourceFile('', source, ts.ScriptTarget.Latest, false)
    : source;
  const source_text = source_file.getFullText();
  const scanner = ts.createScanner(ts.ScriptTarget.Latest, false, ts.LanguageVariant.Standard, source_text);

  let token = scanner.scan();
  while (token !== ts.SyntaxKind.EndOfFileToken) {
    const start = scanner.getTokenPos();
    const end = scanner.getTextPos();

    switch (token) {
      case ts.SyntaxKind.SingleLineCommentTrivia:
      case ts.SyntaxKind.MultiLineCommentTrivia: {
        const comment = scanner.getTokenText();
        if (callback(comment, scanner, source_file) === false) {
          return;
        }
        break;
      }
      case ts.SyntaxKind.CloseBraceToken: {
        const container = get_node_container(source_file, start, end);
        if (container && (
            container.kind === ts.SyntaxKind.TemplateMiddle ||
            container.kind === ts.SyntaxKind.TemplateTail
          )) {
          token = scanner.reScanTemplateToken();
          continue;
        }
        break;
      }
      case ts.SyntaxKind.SlashToken:
      case ts.SyntaxKind.SlashEqualsToken: {
        const container = get_node_container(source_file, start, end);
        if (container && container.kind === ts.SyntaxKind.RegularExpressionLiteral) {
          token = scanner.reScanSlashToken();
          continue;
        }
        break;
      }
      default:
        // do nothing
        break;
    }
    token = scanner.scan();
  }
};

function get_node_container(source_file: ts.SourceFile, start: number, end: number) {
  let container: undefined | ts.Node;
  find_container(source_file, start, end, target_container => {
    container = target_container;
  });
  return container;
}

function find_container(node: ts.Node, start: number, end: number, callback: (container: ts.Node) => void) {
  const node_start = node.pos;
  const node_end = node.end;
  if (start >= node_start && end <= node_end) {
    if (is_token(node)) {
      callback(node);
    } else {
      ts.forEachChild(node, child_node => find_container(child_node, start, end, callback));
    }
  }
}

function is_token(node: ts.Node) {
  return node.kind >= ts.SyntaxKind.FirstToken && node.kind <= ts.SyntaxKind.LastToken;
}
