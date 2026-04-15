
const recentProjectsTable = document.getElementById('recentProjects');

import * as ui from './Ui.js';
import * as event from './Event.js';

function setupWindow() {
  (0, ui.initialize)();
  (0, event.registerEvents)();
}

window.onload = function () {
  if (document.readyState !== 'loading') setTimeout(onRead, 0);
  else document.addEventListener('DOMContentLoaded', onRead);
  function onRead() {
    setupWindow();
  }
}

function readRecentProjects(projects) {
    recentProjectsTable.innerHTML = '';
    if (!projects || projects.length === 0) {
        recentProjectsTable.innerHTML = `
            <tr>
                <td>No recent projects yet.</td>
            </tr>
        `;
        return;
    }
    projects.forEach(project => {
        const row = document.createElement('tr');
        const cell = document.createElement('td');

        cell.className = 'link clickableItem vep';
        cell.textContent = project.name;
        cell.title = project.path;
        cell.dataset.projectPath = project.path;

        row.appendChild(cell);
        recentProjectsTable.appendChild(row);
    });
}

window.addEventListener('DOMContentLoaded', async () => {
    const recentProjects = await window.veApi.projectActions.getRecentProjects();
    readRecentProjects(recentProjects);
});