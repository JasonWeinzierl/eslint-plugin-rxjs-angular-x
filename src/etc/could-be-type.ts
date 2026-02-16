import * as tsutils from 'ts-api-utils';
import ts from 'typescript';

export function couldBeType(
  type: ts.Type,
  name: string | RegExp,
): boolean {
  if (tsutils.isTypeReference(type)) {
    type = type.target;
  }

  if (isType(type, name)) {
    return true;
  }

  if (tsutils.isUnionOrIntersectionType(type)) {
    return type.types.some(t => couldBeType(t, name));
  }

  const baseTypes = type.getBaseTypes();
  if (baseTypes?.some(t => couldBeType(t, name))) {
    return true;
  }

  if (couldImplement(type, name)) {
    return true;
  }

  return false;
}

function isType(
  type: ts.Type,
  name: string | RegExp,
): boolean {
  if (!type.symbol) {
    return false;
  }
  return typeof name === 'string'
    ? type.symbol.name === name
    : Boolean(type.symbol.name.match(name));
}

function couldImplement(
  type: ts.Type,
  name: string | RegExp,
): boolean {
  const { symbol } = type;
  if (symbol) {
    const { valueDeclaration } = symbol;
    if (valueDeclaration && ts.isClassDeclaration(valueDeclaration)) {
      const { heritageClauses } = valueDeclaration;
      if (heritageClauses) {
        const implemented = heritageClauses.some(
          ({ token, types }) =>
            token === ts.SyntaxKind.ImplementsKeyword
            && types.some(node => isMatchingNode(node, name)),
        );
        if (implemented) {
          return true;
        }
      }
    }
  }
  return false;
}

function isMatchingNode(
  node: ts.ExpressionWithTypeArguments,
  name: string | RegExp,
): boolean {
  const { expression } = node;
  const text = expression.getText();
  return typeof name === 'string' ? text === name : Boolean(text.match(name));
}
