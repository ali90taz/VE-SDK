const { BrowserWindow } = require('electron');
const windowStateKeeper = require('electron-window-state');

function createLauncherWindow(devMode) {
  const launcherWindowState = devMode
    ? windowStateKeeper({
      defaultWidth: 1020,
      defaultHeight: 770,
      file: 'launcher-window-state-dev.json'
    })
    : null;

  const windowOptions = {
    width: launcherWindowState?.width ?? 900,
    height: launcherWindowState?.height ?? 650,
    x: launcherWindowState?.x,
    y: launcherWindowState?.y,
    resizable: false,
    fullscreenable: false,
    frame: false,
    useContentSize: true,
    show: false,
    center: !launcherWindowState,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: false,
      devTools: devMode,
      preload: path.join(__dirname, 'Bridge', 'Preload.js'),
    }
  };

  var launcherWindow = new BrowserWindow(windowOptions);
  launcherWindowState?.manage(launcherWindow);
  launcherWindow.on('closed', () => {
    launcherWindow = null;
  });
  return launcherWindow;
}

module.exports = createLauncherWindow;