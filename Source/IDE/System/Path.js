const { app } = require('electron');
const path = require('node:path');

function getUserDocumentsFolder() {
  return app.getPath('documents');
}

function pathJoin(...path) {
  return path.join(path);
}

module.exports = {
  getUserDocumentsFolder,
  pathJoin
};