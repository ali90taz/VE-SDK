
import * as Ui from './Ui.js';

window.onload = function () {
  if (document.readyState !== 'loading') setTimeout(onRead, 0);
  else document.addEventListener('DOMContentLoaded', onRead);
  function onRead() {
    setupWindow();
  }
}

function setupWindow() {
  (0, Ui.setUi)();
}