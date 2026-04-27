const { BrowserWindow } = require('electron');
const windowStateKeeper = require('electron-window-state');
const vePath = require('../../System/Path');

function createEditorWindow(devMode) {
  const editorWindowState = devMode
    ? windowStateKeeper({
      defaultWidth: 1020,
      defaultHeight: 770,
      file: 'editor-window-state-dev.json'
    })
    : null;

  const windowOptions = {
    width: editorWindowState?.width ?? 1024,
    height: editorWindowState?.height ?? 768,
    x: editorWindowState?.x,
    y: editorWindowState?.y,
    resizable: true,
    fullscreenable: true,
    frame: false,
    useContentSize: true,
    show: false,
    center: !editorWindowState,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: false,
      devTools: devMode,
      preload: vePath.pathJoin(__dirname, 'Bridge', 'Preload.js'),
    }
  };

  var editorWindow = new BrowserWindow(windowOptions);
  editorWindowState?.manage(editorWindow);
  return editorWindow;
}

module.exports = createEditorWindow;