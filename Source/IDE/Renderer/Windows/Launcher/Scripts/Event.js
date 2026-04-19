import cssVarsFile from "../Styles/Variables.json" with { type: 'json' }
import linksFile from "../../../../Config/Links.json" with { type: 'json' }

import * as eventHelpers from "../../../Shared/Scripts/EventHelpers.js";
import * as cssHelpers from "../../../Shared/Scripts/CssHelpers.js"

import * as ui from "./Ui.js";

const links = linksFile;
const cssVars = cssVarsFile;

function registerLinkEvents() {
  for (const key in links.launcherWindow) {
    if (key !== "") {
      eventHelpers.addElementEvent(
        key,
        eventHelpers.EVENT.MOUSE.CLICK,
        () => {
          window.veApi.shell.openUrl(links.launcherWindow[key]);
        } 
      );
    }
  }
}

/* Public */

export function registerEvents() {
  
  /* Global */

  eventHelpers.addWindowEvent(eventHelpers.EVENT.WINDOW.RESIZE, () => {
    ui.refresh();
  });
  
  registerLinkEvents();

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
    'infoButton',
    eventHelpers.EVENT.MOUSE.CLICK,
    () => {
      cssHelpers.setCssVariable(cssVars.misc.infoWindowVisibility, 'visible')
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

  eventHelpers.addElementEvent(
    'infoWindow-closeButton',
    eventHelpers.EVENT.MOUSE.CLICK,
    () => {
      if (cssHelpers.getCssVariable(cssVars.misc.infoWindowVisibility) === 'visible'){
        cssHelpers.setCssVariable(cssVars.misc.infoWindowVisibility, 'hidden')
      }
    }
  );
}