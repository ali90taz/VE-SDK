
const { contextBridge, ipcRenderer } = require('electron');
const ipc = require('../Bridge/IpcChannels');

contextBridge.exposeInMainWorld('veApi', {

  windowActions: {
    close: () => ipcRenderer.send(
      ipc.channel.window, 
      ipc.windowActions.close,
    ),
    minimize: () => ipcRenderer.send(
      ipc.channel.window, 
      ipc.windowActions.minimize,
    ),
    maximize: () => ipcRenderer.send(
      ipc.channel.window, 
      ipc.windowActions.maximize,
    ),
    restore: () => ipcRenderer.send(
      ipc.channel.window, 
      ipc.windowActions.restore,
    ),
  },

  shellActions: {
    openUrl: (url) => ipcRenderer.send(
      ipc.channel.shell,
      ipc.shellActions.openUrl, 
      url,
    ),
  },

  projectActions: {
    getRecentProjects: () => ipcRenderer.invoke(
      ipc.channel.project,
      ipc.projectActions.getRecentProjects,
    ),
    newProject: (projectName) => ipcRenderer.invoke(
      ipc.channel.project, 
      ipc.projectActions.newProject,
      projectName
    ),
    loadProject: (projectPath) => ipcRenderer.invoke(
      ipc.channel.project, 
      ipc.projectActions.loadProject,
      projectPath
    ),
  },

  vitaActions: {
    runAndDebug: (projectPath) => ipcRenderer.send(
      ipc.channel.vita,
      ipc.vitaActions.runAndDebug,
      projectPath,
    ),
    createVpk: (projectPath) => ipcRenderer.send(
      ipc.channel.vita,
      ipc.vitaActions.createVpk,
      projectPath,
    ),
    sendVpk: (projectPath) => ipcRenderer.send(
      ipc.channel.vita,
      ipc.vitaActions.sendVpk,
      projectPath
    )
  },
});

window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
      const element = document.getElementById(selector);
      if (element) element.innerText = text;
    }
    for (const dependency of ['chrome', 'node', 'electron']) {
      replaceText(`${dependency}-version`, process.versions[dependency]);
    }
});