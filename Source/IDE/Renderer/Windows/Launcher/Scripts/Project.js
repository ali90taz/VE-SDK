import recentProjectsFile from "../../../../Config/RecentProjects.json" with { type: 'json' };
import cssVarsFile from "../Styles/Variables.json" with { type: 'json' }

import * as cssHelpers from "../../../Shared/Scripts/CssHelpers.js"

const recentProjects = recentProjectsFile;
const cssVars = cssVarsFile;

const recentProjectsTable = document.getElementById('recentProjects');

export function listRecentProjects() {
  recentProjectsTable.innerHTML = '';

  if (!recentProjects || recentProjects.length === 0) {
    cssHelpers.setCssVariable(
      cssVars.misc["noRecentProjects-message"],
      'visible'
    );
    return;
  } else {
    cssHelpers.setCssVariable(
      cssVars.misc["noRecentProjects-message"],
      'hidden'
    );
  }
  recentProjects.forEach(project => {
    const row = document.createElement('tr');
    const cell = document.createElement('td');

    cell.className = 'link clickableItem vep';
    cell.textContent = project.name;
    cell.title = 'Project ID: ' + project.projectId;
    cell.dataset.projectId = project.projectId;

    row.appendChild(cell);
    recentProjectsTable.appendChild(row);
  });
}