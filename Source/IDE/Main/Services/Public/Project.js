// System modules
const veFile = require('../../../System/File');
// IDE Services
const pathService = require('../Private/Path');
const fileSupportService = require('../Private/FileVersion');
const debugService = require('../Private/Debug');

// Local functions

function isValidRecentProjects(data) {
  if (!data || typeof data !== 'object' || Array.isArray(data)) { return false; }
  if (data.fileId !== fileSupportService.FILE_ID.RECENT_PROJECTS_FILE) {
    return false;
  }
  if (typeof data.formatVersion !== 'number') { return false; }
  if (!Array.isArray(data.projects)) { return false; }
  for (const project of data.projects) {
    if (!project || typeof project !== 'object' || Array.isArray(project)) {
      return false;
    }
    if (typeof project.projectId !== 'string') { return false; }
    if (typeof project.name !== 'string') { return false; }
    if (typeof project.lastOpened !== 'string') { return false; }
  }
  return true;
}

// Public functions

function getRecentProjects() {
  try {
    if (!veFile.fileExists(pathService.recentProjectsFile)) { return []; }
    const data = veFile.readJsonFile(pathService.recentProjectsFile);
    if (!isValidRecentProjects(data)) {
      debugService.sendError('RecentProjects.json file is invalid!');
      return [];
    }
    if (!fileSupportService.isFileVersionSupported(data.formatVersion, data.fileId)) {
      debugService.sendError('Unsupported file version! ', ` ${data.fileId}`);
      return []; 
    }
    return data.projects;
  } catch (error) {
    debugService.sendError('Error reading recent projects!', ` ${error.message}`);
    return [];
  }
}

https://chatgpt.com/share/69e98744-09e4-83e9-a6b5-226b95162b23

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