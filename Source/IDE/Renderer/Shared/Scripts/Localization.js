import languagesFile from "../Languages/Languages.json" with { type: 'json' };

export const MODE = {
  DEFAULT: "default", // Nunca definido
  AUTO: "auto", // Definido como automático
  CUSTOM: "custom" // Especificamente definido
};

export const LANGUAGE_ID = {
  EN_US: "en-us",
};

export async function getLanguage() {
  try {
    const latestLanguage = await window.veApi.localization.getLanguage();
  } catch (error) {

  }
}

export function getAvailableLanguages() {
  try {
    languagesFile.
  } catch (error) {

  }
}

export function setLanguage(mode, languageId) {

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