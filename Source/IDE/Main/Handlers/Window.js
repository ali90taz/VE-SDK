const IPC = require('../../Bridge/IpcChannels');
const windowServices = require('../Services/Public/Window');

function registerWindowHandlers() {

  ipc.on(IPC.CHANNELS.WINDOW, (event, payload) => {

    const { action } = payload;
    
    switch (action) {
      case IPC.WINDOW_ACTIONS.CLOSE:
        windowServices.closeWindow(event.sender);
      break;
      case IPC.WINDOW_ACTIONS.MINIMIZE:
        windowServices.minimizeWindow(event.sender);
      break;
      case IPC.WINDOW_ACTIONS.MAXIMIZE:
        windowServices.maximizeWindow(event.sender);
      break;
      case IPC.WINDOW_ACTIONS.RESTORE:
        windowServices.restoreWindow(event.sender);
      break;
      default:
        console.warn(`Unknown window action: ${action}`);
      break;
    }
  });
}

module.exports = registerWindowHandlers;