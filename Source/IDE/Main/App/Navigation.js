const veArg = require('../../System/Arg');
const pathServices = require('../Services/Private/Path');
const debugServices = require('../Services/Private/Debug');
const createEditorWindow = require('../Windows/EditorWindow');
const createLauncherWindow = require('../Windows/LauncherWindow');

let editorWindow = null;
let launcherWindow = null;

async function handleStartup() {
  const projectFilePath = pathServices.getVepFilePathFromArg(...veArg.getArgs());
  if (projectFilePath) {
    await openEditorWindow();
    return;
  }
  await openLauncherWindow()
}

function closeWindow(window) {
  if (window && !window.isDestroyed()) {
    window.close();
  }
}

async function openEditorWindow() {
  if (launcherWindow && !launcherWindow.isDestroyed()) {
      closeWindow(launcherWindow);
  }
  if (!editorWindow || editorWindow.isDestroyed()) {
      createEditorWindow(debugServices.devMode());
  }
  await editorWindow.loadFile('./Renderer/Windows/Editor/Index.html');
  editorWindow.show();
  if (devMode && !editorWindow.webContents.isDevToolsOpened()) {
      editorWindow.webContents.openDevTools({ mode: 'detach' });
  }
  editorWindow.webContents.send('window-is-ready');
}

async function openLauncherWindow() {
  if (editorWindow && !editorWindow.isDestroyed()) {
    closeWindow(editorWindow);
  }
  if (!launcherWindow || launcherWindow.isDestroyed()) {
    createLauncherWindow(debugServices.devMode());
  }
  await launcherWindow.loadFile('./Renderer/Windows/Launcher/Index.html');
  launcherWindow.show();
  if (devMode && !launcherWindow.webContents.isDevToolsOpened()) {
    launcherWindow.webContents.openDevTools({mode: 'detach'});
  }
  launcherWindow.webContents.send('window-is-ready');
}

module.exports = {
  handleStartup
};

