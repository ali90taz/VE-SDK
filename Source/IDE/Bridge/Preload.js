
const { contextBridge, ipcRenderer } = require('electron');
const IPC = require('./IpcChannels');

contextBridge.exposeInMainWorld('veApi', {

  window: {
    close: () => ipcRenderer.send(IPC.CHANNELS.WINDOW, {
      action: IPC.WINDOW_ACTIONS.CLOSE
    }),

    minimize: () => ipcRenderer.send(IPC.CHANNELS.WINDOW, {
      action: IPC.WINDOW_ACTIONS.MINIMIZE
    }),

    maximize: () => ipcRenderer.send(IPC.CHANNELS.WINDOW, {
      action: IPC.WINDOW_ACTIONS.MAXIMIZE
    }),

    restore: () => ipcRenderer.send(IPC.CHANNELS.WINDOW, {
      action: IPC.WINDOW_ACTIONS.RESTORE
    }),
  },

  shell: {
    openUrl: (url) => ipcRenderer.send(IPC.CHANNELS.SHELL, {
      action: IPC.SHELL_ACTIONS.OPEN_URL,
      data: { url }
    }),
  },

  project: {
    getRecent: () => ipcRenderer.send(IPC.CHANNELS.PROJECT, {
      action: IPC.PROJECT_ACTIONS.GET_RECENT
    }),

    create: () => ipcRenderer.send(IPC.CHANNELS.PROJECT, {
      action: IPC.PROJECT_ACTIONS.CREATE
    }),

    open: (projectPath) => ipcRenderer.send(IPC.CHANNELS.PROJECT, {
      action: IPC.PROJECT_ACTIONS.OPEN,
      data: { projectPath }
    }),

    close: () => ipcRenderer.send(IPC.CHANNELS.PROJECT, {
      action: IPC.PROJECT_ACTIONS.CLOSE
    }),

    save: () => ipcRenderer.send(IPC.CHANNELS.PROJECT, {
      action: IPC.PROJECT_ACTIONS.SAVE
    }),
  },

  build: {
    vpk: () => ipcRenderer.send(IPC.CHANNELS.BUILD, {
      action: IPC.BUILD_ACTIONS.VPK
    }),
  },

  deploy: {
    vpk: () => ipcRenderer.send(IPC.CHANNELS.DEPLOY, {
      action: IPC.DEPLOY_ACTIONS.VPK
    }),

    vpkAndRun: () => ipcRenderer.send(IPC.CHANNELS.DEPLOY, {
      action: IPC.DEPLOY_ACTIONS.VPK_AND_RUN
    }),
  },

  package: {
    exportVpk: () => ipcRenderer.send(IPC.CHANNELS.PACKAGE, {
      action: IPC.PACKAGE_ACTIONS.EXPORT_VPK
    }),
  },

  companion: {
    connect: () => ipcRenderer.send(IPC.CHANNELS.COMPANION, {
      action: IPC.COMPANION_ACTIONS.CONNECT
    }),

    disconnect: () => ipcRenderer.send(IPC.CHANNELS.COMPANION, {
      action: IPC.COMPANION_ACTIONS.DISCONNECT
    }),

    getStatus: () => ipcRenderer.send(IPC.CHANNELS.COMPANION, {
      action: IPC.COMPANION_ACTIONS.GET_STATUS
    }),

    run: () => ipcRenderer.send(IPC.CHANNELS.COMPANION, {
      action: IPC.COMPANION_ACTIONS.RUN
    }),

    runAndDebug: () => ipcRenderer.send(IPC.CHANNELS.COMPANION, {
      action: IPC.COMPANION_ACTIONS.RUN_AND_DEBUG
    }),

    stop: () => ipcRenderer.send(IPC.CHANNELS.COMPANION, {
      action: IPC.COMPANION_ACTIONS.STOP
    }),

    restart: () => ipcRenderer.send(IPC.CHANNELS.COMPANION, {
      action: IPC.COMPANION_ACTIONS.RESTART
    }),

    getLogs: () => ipcRenderer.send(IPC.CHANNELS.COMPANION, {
      action: IPC.COMPANION_ACTIONS.GET_LOGS
    }),
  },

  settings: {
    setTheme: (theme) => ipcRenderer.send(IPC.CHANNELS.SETTINGS, {
      action: IPC.SETTINGS_ACTIONS.SET_THEME,
      data: { theme }
    }),

    setLanguage: (language) => ipcRenderer.send(IPC.CHANNELS.SETTINGS, {
      action: IPC.SETTINGS_ACTIONS.SET_LANGUAGE,
      data: { language }
    }),
  },
});