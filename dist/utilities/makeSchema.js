'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeSchema = exports.mergeableTypes = undefined;

var _graphql = require('graphql');

var _astHelpers = require('./astHelpers');

var typesMap = {
  query: 'Query',
  mutation: 'Mutation',
  subscription: 'Subscription'
};

var _mergeableOperationTypes = Object.keys(typesMap);

var _makeOperationType = function _makeOperationType(operation, value) {
  return {
    kind: _graphql.Kind.OPERATION_TYPE_DEFINITION,
    operation,
    type: {
      kind: _graphql.Kind.NAMED_TYPE,
      name: {
        kind: _graphql.Kind.NAME,
        value
      }
    }
  };
};

var mergeableTypes = Object.values(typesMap);

var makeSchema = function makeSchema(definitions, schemaDefs) {
  var operationMap = {
    query: _makeOperationType(_mergeableOperationTypes[0], mergeableTypes[0]),
    mutation: null,
    subscription: null
  };

  mergeableTypes.slice(1).forEach(function (type, key) {
    if ((0, _astHelpers.hasDefinitionWithName)(definitions, type)) {
      var operation = _mergeableOperationTypes[key + 1];

      operationMap[operation] = _makeOperationType(operation, type);
    }
  });

  var operationTypes = Object.values(operationMap).map(function (operation, i) {
    if (!operation) {
      var type = Object.keys(operationMap)[i];

      if (schemaDefs.some(function (def) {
        return def.operationTypes.some(function (op) {
          return op.operation === type;
        });
      })) {
        return _makeOperationType(type, typesMap[type]);
      }
    }

    return operation;
  }).filter(function (op) {
    return op;
  });

  return {
    kind: _graphql.Kind.SCHEMA_DEFINITION,
    directives: [],
    operationTypes
  };
};

exports.mergeableTypes = mergeableTypes;
exports.makeSchema = makeSchema;