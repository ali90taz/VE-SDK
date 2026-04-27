
const IPC = {
  CHANNELS: {
    WINDOW: "veApi:window",
    SHELL: "veApi:shell",
    PROJECT: "veApi:project",
    BUILD: "veApi:build",
    DEPLOY: "veApi:deploy",
    PACKAGE: "veApi:package",
    COMPANION: "veApi:companion",
    LOCALIZATION: "veApi:localization",
    THEME: "veApi:theme"
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
    OPEN_RECENT: "open-recent",
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
  LOCALIZATION_ACTIONS: {
    SET_LANGUAGE: "set-language",
    GET_LANGUAGE: "get-language"
  },
  THEME_ACTIONS: {
    SET_THEME: "set-theme",
    GET_THEME: "get-theme"
  }
}

module.exports = IPC;