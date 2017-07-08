'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fileLoader = exports.mergeTypes = exports.mergeResolvers = undefined;

var _file_loader = require('./file_loader');

var _file_loader2 = _interopRequireDefault(_file_loader);

var _merge_types = require('./merge_types');

var _merge_types2 = _interopRequireDefault(_merge_types);

var _merge_resolvers = require('./merge_resolvers');

var _merge_resolvers2 = _interopRequireDefault(_merge_resolvers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.mergeResolvers = _merge_resolvers2.default;
exports.mergeTypes = _merge_types2.default;
exports.fileLoader = _file_loader2.default;