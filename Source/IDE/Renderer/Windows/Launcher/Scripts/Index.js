
const recentProjectsTable = document.getElementById('recentProjects');

import * as ui from './Ui.js';
import * as event from './Event.js';

window.onload = function () {
  if (document.readyState !== 'loading') setTimeout(onRead, 0);
  else document.addEventListener('DOMContentLoaded', onRead);
  function onRead() {
    setupWindow();
  }
}

function setupWindow() {
  (0, ui.initialize)();
  (0, event.registerEvents)();
}

document.getElementById('newProject').addEventListener(
    'click', async () => {
        await window.veApi.projectActions.newProject('test');
    }
);

document.getElementById('loadProject').addEventListener(
    'click', () => {
        console.log('loadProject call');
    }
);

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

recentProjectsTable.addEventListener('click', (event) => {
    const target = event.target;
    if (!target.matches('td[data-project-path]')) return;
    const projectPath = target.dataset.projectPath;
    window.veApi.projectActions.loadProject(projectPath);
})

// infoWindow ------------------------------------------------------------------

document.getElementById('infoWindow-closeButton').addEventListener(
    'click', () => {
        const overlay = document.getElementById('overlay');
        if (overlay.style.visibility === 'visible'){
            overlay.style.visibility = 'hidden';
        }
    }
);

document.getElementById('infoWindow-releases').addEventListener(
    'click', () => {
        window.veApi.shellActions.openUrl(githubRepository + '/releases');
    }
);

document.getElementById('infoWindow-about').addEventListener(
    'click', () => {
        window.veApi.shellActions.openUrl(
            githubRepository + '#what-is-vitaengine'
        );
    }
);

document.getElementById('infoWindow-license').addEventListener(
    'click', () => {
        window.veApi.shellActions.openUrl(githubRepository + '?tab=GPL-3.0-1-ov-file');
    }
);