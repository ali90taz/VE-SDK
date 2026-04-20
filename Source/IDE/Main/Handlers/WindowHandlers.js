const { BrowserWindow } = require('electron');
const IPC = require('../../Bridge/IpcChannels');

function registerWindowHandlers() {

  ipc.on(IPC.CHANNELS.WINDOW, (event, payload) => {

    const { action } = payload;
    const window = BrowserWindow.fromWebContents(event.sender);
    
    switch (action) {
      case IPC.WINDOW_ACTIONS.CLOSE:
        window?.close();
        break;
      case IPC.WINDOW_ACTIONS.MINIMIZE:
        window?.minimize();
        break;
      case IPC.WINDOW_ACTIONS.MAXIMIZE:
        window?.maximize();
        break;
      case IPC.WINDOW_ACTIONS.RESTORE:
        window?.unmaximize();
        break;
      default:
        console.warn(`Unknown window action: ${action}`);
        break;
    }
  });
}

module.exports = registerWindowHandlers;