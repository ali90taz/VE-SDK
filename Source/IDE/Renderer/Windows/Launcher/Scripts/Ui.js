import settingsFile from "../../../../Config/Settings.json" with { type: 'json' }
import themesFile from "../../../Shared/Themes/Themes.json" with { type: 'json' }
import cssVarsFile from "../Styles/Variables.json" with { type: 'json' }
import linksFile from "../../../../Config/Links.json" with { type: 'json' }

import * as miscHelpers from "../../../Shared/Scripts/MiscHelpers.js"
import * as cssHelpers from "../../../Shared/Scripts/CssHelpers.js"

function applyTheme() {

}

function setLinks() {

}

/* Public functions */

export function update() {
  cssHelpers.setCssVariable(
    cssVarsFile.system.viewportWidth,
    miscHelpers.getWindowInnerWidth() + "px"
  );
  cssHelpers.setCssVariable(
    cssVarsFile.system.viewportHeight,
    miscHelpers.getWindowInnerHeight() + "px"
  );
}

export function initialize() {
  applyTheme(); 
}