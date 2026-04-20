
function handleStartup() {

}

async function openEditorWindow() {
  if (launcherWindow && !launcherWindow.isDestroyed()) {
      launcherWindow.close();
  }
  if (!editorWindow || editorWindow.isDestroyed()) {
      createEditorWindow();
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
    editorWindow.close();
  }
  if (!launcherWindow || launcherWindow.isDestroyed()) {
    createLauncherWindow();
  }
  await launcherWindow.loadFile('./Renderer/Windows/Launcher/Index.html');
  launcherWindow.show();
  if (devMode && !launcherWindow.webContents.isDevToolsOpened()) {
    launcherWindow.webContents.openDevTools({mode: 'detach'});
  }
  launcherWindow.send('window-is-ready');
}

module.exports = {
  handleStartup,
  openEditorWindow,
  openLauncherWindow
};

