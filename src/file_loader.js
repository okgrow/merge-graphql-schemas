const fs = require('fs');
const path = require('path');

const fileLoader = (folderPath) => {
  const dir = folderPath; // path.join(__dirname, folderPath);
  const files = [];
  fs.readdirSync(dir).forEach((f) => {
    if (f.slice(-3) !== '.js') { return; }
    const filesDir = path.join(dir, f);
    const file = require(filesDir); // eslint-disable-line
    files.push(file);
  });
  return files;
};

module.exports = fileLoader;
