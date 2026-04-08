
const ipc = {
  channel: {
    window: 'window-action',
    shell: 'shell-action',
    project: 'project-action',
    vita: 'vita-action',
  },
  windowActions: {
    close: 'window-close',
    minimize: 'window-minimize',
    maximize: 'window-maximize',
    restore: 'window-restore',
  },
  shellActions: {
    openUrl: 'open-url',
  },
  projectActions: {
    getRecentProjects: 'recent-projects',
    newProject: 'new-project',
    loadProject: 'load-project',
  },
  vitaActions: {
    runAndDebug: 'run-and-debug',
    createVpk: 'create-vpk',
    sendVpk: 'send-vpk',
  }
};

module.exports = ipc;