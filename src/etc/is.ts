import { AST_NODE_TYPES, TSESTree } from '@typescript-eslint/utils';

export function isAssignmentExpression(
  node: TSESTree.Node,
): node is TSESTree.AssignmentExpression {
  return node.type === AST_NODE_TYPES.AssignmentExpression;
}

export function isCallExpression(node: TSESTree.Node): node is TSESTree.CallExpression {
  return node.type === AST_NODE_TYPES.CallExpression;
}

export function isIdentifier(node: TSESTree.Node): node is TSESTree.Identifier {
  return node.type === AST_NODE_TYPES.Identifier;
}

export function isMemberExpression(node: TSESTree.Node): node is TSESTree.MemberExpression {
  return node.type === AST_NODE_TYPES.MemberExpression;
}

export function isThisExpression(node: TSESTree.Node): node is TSESTree.ThisExpression {
  return node.type === AST_NODE_TYPES.ThisExpression;
}

export function isVariableDeclarator(
  node: TSESTree.Node,
): node is TSESTree.VariableDeclarator {
  return node.type === AST_NODE_TYPES.VariableDeclarator;
}
