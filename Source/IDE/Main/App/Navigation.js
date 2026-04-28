const veArg = require('../../System/Arg');
const pathServices = require('../Services/Private/Path');
const debugServices = require('../Services/Private/Debug');
const createEditorWindow = require('../Windows/EditorWindow');
const createLauncherWindow = require('../Windows/LauncherWindow');

let editorWindow = null;
let launcherWindow = null;

function getEditorWindow() {
  if (editorWindow && editorWindow.isDestroyed()) {
    editorWindow = null;
  }
  return editorWindow;
}

function getLauncherWindow() {
  if (launcherWindow && launcherWindow.isDestroyed()) {
    launcherWindow = null;
  }
  return launcherWindow;
}

function hasOpenWindow() {
  return !!(getEditorWindow() || getLauncherWindow());
}

function getStartupProjectFilePath() {
  return pathServices.getVepFilePathFromArg(...veArg.getArgs());
}

function closeEditorWindow() {
  const currentEditorWindow = getEditorWindow();
  if (!currentEditorWindow) {
    return;
  }
  currentEditorWindow.close();
  editorWindow = null;
}

function closeLauncherWindow() {
  const currentLauncherWindow = getLauncherWindow();
  if (!closeLauncherWindow) {
    return;
  }
  currentLauncherWindow.close();
  launcherWindow = null;
}

async function handleStartup() {
  const projectFilePath = getStartupProjectFilePath();
  if (projectFilePath) {
    await openEditorWindow();
    return;
  }
  await openLauncherWindow()
}

async function openEditorWindow() {
  closeLauncherWindow();

  let currentEditorWindow = getEditorWindow();
  if (!currentEditorWindow) {
    currentEditorWindow = createEditorWindow(debugServices.devMode);
    editorWindow = currentEditorWindow;
  }

  await currentEditorWindow.loadFile('./Renderer/Windows/Editor/Index.html');
  currentEditorWindow.show();

  if (
    debugServices.devMode &&
    !currentEditorWindow.webContents.isDevToolsOpened()
  ) {
    currentEditorWindow.webContents.openDevTools({ mode: 'detach' });
  }

  currentEditorWindow.webContents.send('window-is-ready');
}

async function openLauncherWindow() {
  closeEditorWindow();

  let currentLauncherWindow = getLauncherWindow();
  if (!currentLauncherWindow) {
    currentLauncherWindow = createLauncherWindow(debugServices.devMode);
    launcherWindow = currentLauncherWindow;
  }

  await currentLauncherWindow.loadFile('./Renderer/Windows/Launcher/Index.html');
  currentLauncherWindow.show();

  if (
    debugServices.devMode &&
    !currentLauncherWindow.webContents.isDevToolsOpened()
  ) {
    currentLauncherWindow.webContents.openDevTools({ mode: 'detach' });
  }

  currentLauncherWindow.webContents.send('window-is-ready');
}

module.exports = {
  handleStartup
};

