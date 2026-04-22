const { BrowserWindow } = require('electron');

function closeWindow(sender) {
  const window = BrowserWindow.fromWebContents(sender);
  window?.close();
}

function minimizeWindow(sender) {
  const window = BrowserWindow.fromWebContents(sender);
  window?.minimize();
}

function maximizeWindow(sender) {
  const window = BrowserWindow.fromWebContents(sender);
  window?.maximize();
}

function restoreWindow(sender) {
  const window = BrowserWindow.fromWebContents(sender);
  window?.unmaximize();
}

module.exports = {
  closeWindow,
  minimizeWindow,
  maximizeWindow,
  restoreWindow
};