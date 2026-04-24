import cssVarsFile from "../Styles/Variables.json" with { type: 'json' }

import * as miscHelpers from "../../../Shared/Scripts/MiscHelpers.js"
import * as cssHelpers from "../../../Shared/Scripts/CssHelpers.js"
import * as domHelpers from "../../../Shared/Scripts/DomHelpers.js"

const cssVars = cssVarsFile;

function defineBehaviors() {
}

function applyTheme() {

}

function applyLanguage() {
  for (const elementId in lang.launcherWindow) {
    for (const propertyId in lang.launcherWindow[elementId]) {
      for (const domProperty in domHelpers.DOM_PROPERTY) {
        if (propertyId === domHelpers.DOM_PROPERTY[domProperty]) {
          domHelpers.setDomElementValue(
            elementId,
            lang.launcherWindow[elementId][propertyId],
            domHelpers.DOM_PROPERTY[domProperty]
          );
        }
      }
    }
  }
}

/* Public functions */

export function refresh() {
  cssHelpers.setCssVariable(
    cssVars.system.viewportWidth,
    miscHelpers.getWindowInnerWidth() + "px"
  );
  cssHelpers.setCssVariable(
    cssVars.system.viewportHeight,
    miscHelpers.getWindowInnerHeight() + "px"
  );
}

export function initialize() {
  defineBehaviors();
  applyTheme();
  applyLanguage();
}