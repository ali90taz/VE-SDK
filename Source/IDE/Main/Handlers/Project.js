const IPC = require('../../Bridge/IpcChannels');
const projectServices = require('../Services/Public/Project');

function registerProjectHandlers() {

  ipc.handle(IPC.CHANNELS.PROJECT, async (event, action, data) => {

    switch (action) {
      case IPC.PROJECT_ACTIONS.GET_RECENT:
        return projectServices.getRecentProjects();
      break;
      case IPC.PROJECT_ACTIONS.CREATE:
        return projectServices.createProject();
      break;
      case IPC.PROJECT_ACTIONS.OPEN:
        return projectServices.openProject();
      break;
      case IPC.PROJECT_ACTIONS.OPEN_RECENT:
        return projectServices.openRecentProject();
      break;
      case IPC.PROJECT_ACTIONS.CLOSE:
        return projectServices.closeProject();
      break;
      case IPC.PROJECT_ACTIONS.SAVE:
        return projectServices.saveProject();
      break;
      default:
        console.warn(`Unknown project action: ${action}`);
      break;
    }
  });
}