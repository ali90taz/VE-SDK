const vePath = require('../../../System/Path');

const RESOURCE_TYPE = {
  IMAGE: 1,
  AUDIO: 2,
  DATA: 3,
  FONT: 4
};

const globalWorkspaceFolder = vePath.pathJoin(
  vePath.getUserDocumentsFolder(), 'VitaEngine'
);
const ideWorkspaceFolder = vePath.pathJoin(
  globalWorkspaceFolder, '.VE'
);
const projectsFolder = vePath.pathJoin(
  globalWorkspaceFolder, 
  'Projects'
);
const projectsIndexFile = vePath.pathJoin(
  ideWorkspaceFolder, 
  'ProjectsIndex.json'
);
const recentProjectsFile = vePath.pathJoin(
  ideWorkspaceFolder, 
  'RecentProjects.json'
);
const formatSupportFile = vePath.pathJoin(

);
const langFile = vePath.pathJoin(

);
const linksFile = vePath.pathJoin(

);
const settingsFile = vePath.pathJoin(

);
function getProjectFolder(projectId) {
  return vePath.pathJoin(
    projectsFolder, 
    projectId
  );
}
function getProjectWorkspaceFolder(projectId) {
  return vePath.pathJoin(
    getProjectRootFolder(projectId), 
    '.VEP'
  );
}
function getProjectIntegrityFile(projectId) {
  return vePath.pathJoin(
    getProjectWorkspaceFolder(projectId), 
    'Integrity.json'
  );
}
function getProjectStateFile(projectId) {
  return vePath.pathJoin(
    getProjectWorkspaceFolder(projectId), 
    'ProjectState.json'
  );
}
function getProjectResourceIndexFile(projectId) {
  return vePath.pathJoin(
    getProjectWorkspaceFolder(projectId), 
    'ResourceIndex.json'
  );
}
function getProjectResourceFolder(projectId, resourceType) {
  switch (resourceType) {
    case RESOURCE_TYPE.IMAGE:
      return vePath.pathJoin(
        getProjectFolder(projectId), 
        'Resources', 
        'Images'
      );
    break;
    case RESOURCE_TYPE.AUDIO:
      return vePath.pathJoin(
        getProjectFolder(projectId), 
        'Resources', 
        'Audio'
      );
    break;
    case RESOURCE_TYPE.DATA:
      return vePath.pathJoin(
        getProjectFolder(projectId), 
        'Resources', 
        'Data'
      );
    break;
    case RESOURCE_TYPE.FONT:
      return vePath.pathJoin(
        getProjectFolder(projectId), 
        'Resources', 
        'Fonts'
      );
    break;
    default:
      return vePath.pathJoin(
        getProjectFolder(projectId), 
        'Resources'
      );
    break;
  }
}

module.exports = {
  globalWorkspaceFolder,
  ideWorkspaceFolder,
  projectsFolder,
  projectsIndexFile,
  recentProjectsFile,
  formatSupportFile,
  langFile,
  linksFile,
  settingsFile,
  getProjectFolder,
  getProjectWorkspaceFolder,
  getProjectIntegrityFile,
  getProjectStateFile,
  getProjectResourceIndexFile
};