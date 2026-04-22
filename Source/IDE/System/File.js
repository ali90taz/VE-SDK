const path = require('node:path');
const fs = require('node:fs');

function fileExists(filePath) {
  try {
    if (typeof filePath !== 'string' || filePath.trim() === '') {
      return false;
    }
    return fs.existsSync(filePath) && fs.statSync(filePath).isFile();
  } catch {
    return false;
  }
}

function directoryExists(dirPath) {
  try {
    if (typeof dirPath !== 'string' || dirPath.trim() === '') {
      return false;
    }
    return fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory();
  } catch {
    return false;
  }
}

function ensureDirectory(dirPath) {
  if (directoryExists(dirPath)) { return; }
  fs.mkdirSync(dirPath, { recursive: true });
}

function readTextFile(filePath) {
  if (!fileExists(filePath)) { return null; }
  return fs.readFileSync(filePath, 'utf-8');
}

function writeTextFile(filePath, data) {
  const parentDir = path.dirname(filePath);
  ensureDirectory(parentDir);
  fs.writeFileSync(filePath, data, 'utf-8');
}

function readJsonFile(filePath) {
  const rawData = readTextFile(filePath);
  if (rawData === null) return null;
  return JSON.parse(rawData);
}

function writeJsonFile(filePath, data) {
  const json = JSON.stringify(data, null, 2);
  writeTextFile(filePath, json);
}

function deleteDirectory(dirPath) {
  if (!directoryExists(dirPath)) { return; }
  fs.rmSync(dirPath, { recursive: true, force: true }); 
}

function deleteFile(filePath) {
  if (!fileExists(filePath)) { return }
  fs.unlinkSync(filePath);
}

function appendTextFile(filePath, data) {
  const parentDir = path.dirname(filePath);
  ensureDirectory(parentDir);
  fs.appendFileSync(filePath, data, 'utf-8');
}

module.exports = {
  fileExists,
  directoryExists,
  readTextFile,
  writeTextFile,
  readJsonFile,
  writeJsonFile,
  ensureDirectory,
  deleteDirectory,
  deleteFile,
  appendTextFile
}
