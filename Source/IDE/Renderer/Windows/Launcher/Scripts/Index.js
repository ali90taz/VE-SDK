
import * as ui from './Ui.js';
import * as event from './Event.js';
import * as project from './Project.js';

function setupWindow() {
  (0, project.listRecentProjects)();
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