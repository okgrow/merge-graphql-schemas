'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _deepmerge = require('deepmerge');

var _deepmerge2 = _interopRequireDefault(_deepmerge);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mergeResolvers = function mergeResolvers(resolvers) {
  return _deepmerge2.default.all(resolvers);
};

exports.default = mergeResolvers;