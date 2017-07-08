'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fileLoader = function fileLoader(folderPath) {
  var dir = folderPath;
  var files = [];
  _fs2.default.readdirSync(dir).forEach(function (f) {
    var pathObj = _path2.default.parse(f);
    var filesDir = _path2.default.join(dir, f);

    if (pathObj.name.toLowerCase() === 'index') {
      return;
    }

    switch (pathObj.ext) {
      case '.js':
        {
          var file = require(filesDir); // eslint-disable-line
          files.push(file.default || file);
          break;
        }

      case '.graphqls':
      case '.graphql':
        {
          var _file = _fs2.default.readFileSync(filesDir, 'utf8');
          files.push(_file.toString());
          break;
        }

      default:
    }
  });
  return files;
};

exports.default = fileLoader;