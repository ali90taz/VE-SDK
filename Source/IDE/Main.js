const { app, BrowserWindow } = require('electron');
const vePath = require('./System/Path');
const debugServices = require('./Main/Services/Private/Debug');
const navigation = require('./Main/App/Navigation');

if (debugServices.devMode) {
  require('electron-reload')(vePath.getAppPath(), {
    electron: require(
      vePath.pathJoin(
        vePath.getAppPath(),   
        'node_modules', 
        'electron'
      )
    ),
    hardResetMethod: 'exit'
  });
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.whenReady().then( async () => {
  await navigation.handleStartup();
  app.on('activate', async () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      await navigation.handleStartup();
    }
  });
});