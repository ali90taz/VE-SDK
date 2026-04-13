
const IPC = {
  CHANNELS: {
    WINDOW: "veApi:window",
    SHELL: "veApi:shell",
    PROJECT: "veApi:project",
    BUILD: "veApi:build",
    DEPLOY: "veApi:deploy",
    PACKAGE: "veApi:package",
    COMPANION: "veApi:companion",
    SETTINGS: "veApi:settings",
  },
  WINDOW_ACTIONS: {
    CLOSE: "close",
    MINIMIZE: "minimize",
    MAXIMIZE: "maximize",
    RESTORE: "restore",
  },
  SHELL_ACTIONS: {
    OPEN_URL: "open-url",
  },
  PROJECT_ACTIONS: {
    GET_RECENT: "get-recent",
    CREATE: "create",
    OPEN: "open",
    CLOSE: "close",
    SAVE: "save",
  },
  BUILD_ACTIONS: {
    VPK: "build-vpk"
  },
  DEPLOY_ACTIONS: {
    VPK: "deploy-vpk",
    VPK_AND_RUN: "deploy-vpk-and-run"
  },
  PACKAGE_ACTIONS: {
    EXPORT_VPK : 'export-vpk'
  },
  COMPANION_ACTIONS: {
    CONNECT: "connect",
    DISCONNECT: "disconnect",
    GET_STATUS: "get-status",
    RUN: "run",
    RUN_AND_DEBUG: "run-and-debug",
    STOP: "stop",
    RESTART: "restart",
    GET_LOGS: "get-logs",
  },
  SETTINGS_ACTIONS: {
    SET_LANGUAGE: "set-language",
    SET_THEME: "set-theme",
  }
}

module.exports = IPC;