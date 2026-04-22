
const { app, shell, BrowserWindow, ipcMain } = require('electron');

const renderCall = require('./Bridge/IpcChannels');
const ipc = ipcMain;
const projectRoot = path.join(__dirname);

const args = process.argv;
const devMode = args.includes('--dev-mode') ? true : false;

if (devMode) {
  require('electron-reload')(projectRoot, {
    electron: require(path.join(projectRoot,'node_modules', 'electron')),
    hardResetMethod: 'exit'
  });
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.whenReady().then( async () => {

    registerHandlers();
    await openLauncherWindow();

    app.on('activate', async () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        await openLauncherWindow();
      }
    });
});