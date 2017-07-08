'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isObjectSchemaDefinition = exports.isObjectTypeDefinition = exports.hasDefinitionWithName = undefined;

var _graphql = require('graphql');

var hasDefinitionWithName = function hasDefinitionWithName(nodes, name) {
  return nodes.findIndex(function (node) {
    return node.name.value === name;
  }) !== -1;
};

var isObjectTypeDefinition = function isObjectTypeDefinition(def) {
  return def.kind === _graphql.Kind.OBJECT_TYPE_DEFINITION;
};

var isObjectSchemaDefinition = function isObjectSchemaDefinition(def) {
  return def.kind === _graphql.Kind.SCHEMA_DEFINITION;
};

exports.hasDefinitionWithName = hasDefinitionWithName;
exports.isObjectTypeDefinition = isObjectTypeDefinition;
exports.isObjectSchemaDefinition = isObjectSchemaDefinition;