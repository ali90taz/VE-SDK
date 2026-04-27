const { app } = require('electron');
const path = require('node:path');

function getUserDocumentsFolder() {
  return app.getPath('documents');
}

function pathJoin(...paths) {
  return path.join(...paths);
}

function getAppPath() {
  return path.join(__dirname);
}

module.exports = {
  getUserDocumentsFolder,
  pathJoin,
  getAppPath
};