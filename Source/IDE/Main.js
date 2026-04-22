
const { app } = require('electron');
const vePath = require('./System/Path');
const debugServices = require('./Main/Services/Private/Debug');

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
  if (process.platform !== 'darwin') aspp.quit();
});

app.whenReady().then( async () => {

    app.on('activate', async () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        
      }
    });
});