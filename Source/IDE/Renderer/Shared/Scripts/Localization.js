import languagesFile from "../Languages/Languages.json" with { type: 'json' };

export const MODE = {
  DEFAULT: "default", // Nunca definido
  AUTO: "auto", // Definido como automático
  CUSTOM: "custom" // Especificamente definido
};

export const LANGUAGE_ID = {
  EN_US: "en-us",
};

export function getAvailableLanguages() {

}

export async function getLanguageDefinition() {
  
}

export function resolveLanguageId(mode, languageId) {

}

export function applyLanguageToWindow(windowId, languageData) {

}

export function restoreLanguage(windowId) {

}

export function setLanguage(windowId, mode, languageId, persist = true) {

  switch (languageId) {

  }

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