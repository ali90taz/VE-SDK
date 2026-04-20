const { app } = require('electron');
const path = require('node:path');
const fs = require('node:fs');

const workspaceRootPath = path.join(app.getPath('documents'), 'VitaEngine');
const ideWorkspacePath = path.join(workspaceRootPath, '.VE');
const projectsRootPath = path.join(workspaceRootPath, 'Projects');

const projectsIndexFilePath = path.join(ideWorkspacePath, 'ProjectsIndex.json');
const recentProjectsFilePath = path.join(ideWorkspacePath, 'RecentProjects.json');

function getProjectRootPath(projectId) {
  return path.join(projectsRootPath, projectId);
}
function getProjectWorkspacePath(projectId) {
  return path.join(getProjectRootPath(projectId), '.VEP');
}
function getIntegrityFilePath(projectId) {
  return path.join(getProjectWorkspacePath(projectId), 'Integrity.json');
}
function getProjectStateFilePath(projectId) {
  return path.join(getProjectWorkspacePath(projectId), 'ProjectState.json');
}
function getResourceIndexFilePath(projectId) {
  return path.join(getProjectWorkspacePath(projectId), 'ResourceIndex.json');
}

// https://chatgpt.com/share/69e59d77-7d50-83e9-a269-abd11a7785f0

function getRecentProjects() {
  try {
    if (!fs.existsSync(recentProjectsFilePath)) {
      return [];
    }
    const rawData = fs.readFileSync(recentProjectsFilePath, 'utf-8');
    var projects = JSON.parse(rawData);
    if (!Array.isArray(projects)) {
      return [];
    }
    projects = projects.filter((project) => {
      const exists =  project.path && fs.existsSync(project.path);
      return exists;
    });
    return projects;
    } catch (error) {
    console.error('Error reading recent projects: ', error);
    return [];
    }
}

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