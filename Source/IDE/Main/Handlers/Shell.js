const IPC = require('../../Bridge/IpcChannels');

const debugServices = require('../Services/Private/Debug');
const shellServices = require('../Services/Public/Shell');

ipc.on(IPC.CHANNELS.SHELL, (event, action, data) => {
    switch (action) {
      case IPC.SHELL_ACTIONS.OPEN_URL:
        if (data) shellServices;
      break;
      default:
        if (debugServices.devMode()) {
          debugServices.sendWarning("Unknow shell action", action);     
        }
      break;
    }
});