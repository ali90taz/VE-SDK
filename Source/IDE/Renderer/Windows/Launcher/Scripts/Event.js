import cssVarsFile from "../Styles/Variables.json" with { type: 'json' }

import * as eventHelpers from "../../../Shared/Scripts/EventHelpers.js";
import * as cssHelpers from "../../../Shared/Scripts/CssHelpers.js"

import * as ui from "./Ui.js";

/* Public */

export function registerEvents() {
  /* Global */
  addWindowEvent(eventHelpers.EVENT.WINDOW.RESIZE, () => {
    ui.update();
  });
  /* Launcher window */
  eventHelpers.addElementEvent(
    'closeButton',
    eventHelpers.EVENT.MOUSE.CLICK, 
    () => {
      window.veApi.window.close();
    }
  );
  eventHelpers.addElementEvent(
    'minimizeButton',
    eventHelpers.EVENT.MOUSE.CLICK,
    () => {
      window.veApi.window.minimize();
    } 
  );
  eventHelpers.addElementEvent(
    'githubButton',
    eventHelpers.EVENT.MOUSE.CLICK,
    () => {
      window.veApi.shell.openUrl("https://github.com/ali90taz/VE-SDK");
    } 
  );
  eventHelpers.addElementEvent(
    'infoButton',
    eventHelpers.EVENT.MOUSE.CLICK,
    () => {
      cssHelpers.setCssVariable(cssVarsFile.misc.infoWindowVisibility, 'visible')
    }
  );
  eventHelpers.addElementEvent(
    'newProject',
    eventHelpers.EVENT.MOUSE.CLICK,
    async () => {
      await window.veApi.project.create();
    }
  );
  eventHelpers.addElementEvent(
    'openProject',
    eventHelpers.EVENT.MOUSE.CLICK,
    async () => {
      await window.veApi.project.open();
    }
  );
  /* Launcher window -> infoWindow */

}