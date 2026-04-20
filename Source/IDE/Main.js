
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

function readRecentProjects() {
  
}

function registerHandlers(){  
  
    
  ipc.on(renderCall.channel.shell, (event, action, data) => {
    switch (action) {
      case renderCall.shellActions.openUrl:
        if (data) shell.openExternal(data);
        break;
      default:
        console.warn(`Unknown window action: ${action}`);
        break;
    }
  });

  ipc.handle(renderCall.channel.project, async (event, action, data) => {
    switch (action) {
      case renderCall.projectActions.getRecentProjects:
        return readRecentProjects();
      case renderCall.projectActions.newProject:
        return openEditorWindow();
      case renderCall.projectActions.loadProject:
        break;
      default:
        console.warn(`Unknown project action: ${action}`);
        break;
    }
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