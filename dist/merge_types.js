'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // Test


var _graphql = require('graphql');

var _buildASTSchema = require('graphql/utilities/buildASTSchema');

var _astPrinter = require('./utilities/astPrinter');

var _astPrinter2 = _interopRequireDefault(_astPrinter);

var _astHelpers = require('./utilities/astHelpers');

var _makeSchema = require('./utilities/makeSchema');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var _isMergeableTypeDefinition = function _isMergeableTypeDefinition(def) {
  return (0, _astHelpers.isObjectTypeDefinition)(def) && _makeSchema.mergeableTypes.includes(def.name.value);
};

var _isNonMergeableTypeDefinition = function _isNonMergeableTypeDefinition(def) {
  return !_isMergeableTypeDefinition(def);
};

var _makeCommentNode = function _makeCommentNode(value) {
  return { kind: 'Comment', value };
};

var _addCommentsToAST = function _addCommentsToAST(nodes) {
  var flatten = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

  var astWithComments = nodes.map(function (node) {
    var description = (0, _buildASTSchema.getDescription)(node);
    if (description) {
      return [_makeCommentNode(description), node];
    }

    return [node];
  });

  if (flatten) {
    return astWithComments.reduce(function (a, b) {
      return a.concat(b);
    }, []);
  }

  return astWithComments;
};

var _makeRestDefinitions = function _makeRestDefinitions(defs) {
  return defs.filter(function (def) {
    return _isNonMergeableTypeDefinition(def) && !(0, _astHelpers.isObjectSchemaDefinition)(def);
  }).map(function (def) {
    if ((0, _astHelpers.isObjectTypeDefinition)(def)) {
      return _extends({}, def, {
        fields: _addCommentsToAST(def.fields)
      });
    }

    return def;
  });
};

var _makeMergedDefinitions = function _makeMergedDefinitions(defs) {
  // TODO: This function can be cleaner!
  var groupedMergableDefinitions = defs.filter(_isMergeableTypeDefinition).reduce(function (mergableDefs, def) {
    var name = def.name.value;

    if (!mergableDefs[name]) {
      return _extends({}, mergableDefs, {
        [name]: _extends({}, def, {
          fields: _addCommentsToAST(def.fields)
        })
      });
    }

    return _extends({}, mergableDefs, {
      [name]: _extends({}, mergableDefs[name], {
        fields: [].concat(_toConsumableArray(mergableDefs[name].fields), _toConsumableArray(_addCommentsToAST(def.fields)))
      })
    });
  }, {
    Query: null,
    Mutation: null,
    Subscription: null
  });

  return Object.values(groupedMergableDefinitions).reduce(function (array, def) {
    return def ? [].concat(_toConsumableArray(array), [def]) : array;
  }, []);
};

var _makeDocumentWithDefinitions = function _makeDocumentWithDefinitions(definitions) {
  return {
    kind: 'Document',
    definitions: definitions instanceof Array ? definitions : [definitions]
  };
};

var printDefinitions = function printDefinitions(defs) {
  return (0, _astPrinter2.default)(_makeDocumentWithDefinitions(defs));
};

var mergeTypes = function mergeTypes(types) {
  var allDefs = types.map(_graphql.parse).map(function (ast) {
    return ast.definitions;
  }).reduce(function (defs, newDef) {
    return [].concat(_toConsumableArray(defs), _toConsumableArray(newDef));
  }, []);

  var mergedDefs = _makeMergedDefinitions(allDefs);
  var rest = _addCommentsToAST(_makeRestDefinitions(allDefs), false).map(printDefinitions);
  var schemaDefs = allDefs.filter(_astHelpers.isObjectSchemaDefinition);
  var schema = printDefinitions([(0, _makeSchema.makeSchema)(mergedDefs, schemaDefs)].concat(_toConsumableArray(mergedDefs)));

  return [schema].concat(_toConsumableArray(rest)).join('\n');
};

exports.default = mergeTypes;