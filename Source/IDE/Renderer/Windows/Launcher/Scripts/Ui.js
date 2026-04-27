import cssVarsFile from "../Styles/Variables.json" with { type: 'json' };

import * as miscHelpers from "../../../Shared/Scripts/MiscHelpers.js";
import * as cssHelpers from "../../../Shared/Scripts/CssHelpers.js";
import * as domHelpers from "../../../Shared/Scripts/DomHelpers.js";

import * as localizationService from "../../../Shared/Scripts/Localization.js";
import * as themeService from "../../../Shared/Scripts/Theme.js";

const cssVars = cssVarsFile;

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

}