// System modules
const veFile = require('../../../System/File');
// IDE Services
const pathService = require('../Private/Path');
const versioningService = require('../Private/FileVersion');

function getRecentProjects() {
  try {
    if (!veFile.fileExists(pathService.recentProjectsFile)) { 
      return []; 
    }
    const data = veFile.readJsonFile(pathService.recentProjectsFile);
    if (typeof data !== 'object' || data === null) { 
      return []; 
    }
    if (!versioningService.isCompatible(data.formatVersion)) {
      return 
    }
  } catch (error) {
    console.error('Error reading recent projects: ', error);
    return [];
  }
}

https://chatgpt.com/share/69e59d77-7d50-83e9-a269-abd11a7785f0

function createProject() {

}

function openProject() {

}

function openRecentProject() {

}

function closeProject() {

}

function saveProject() {

}

module.exports = {
  getRecentProjects,
  createProject,
  openProject,
  openRecentProject,
  closeProject,
  saveProject
};