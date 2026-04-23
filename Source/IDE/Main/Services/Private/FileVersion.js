// System modules
const veFile = require('../../../System/File');
// IDE Services
const pathService = require('../Private/Path');
const debugService = require('../Private/Debug');

const FILE_ID = {
  SETTINGS_FILE: 'settingsFile',
  LOCALIZATION_FILE: 'localizationFile',
  LINKS_FILE: 'linksFile',
  PROJECTS_INDEX_FILE: 'projectsIndexFile',
  RECENT_PROJECTS_FILE: 'recentProjectsFile',
  VEP_FILE: 'vepFile',
  INTEGRITY_FILE: 'integrityFile',
  PROJECT_STATE_FILE: 'projectStateFile',
  RESOURCE_INDEX_FILE: 'resourceIndexFile'
};

function isValidFormatSupport(data) {
  if (!data || typeof data != 'object' || Array.isArray(data)) {
    return false;
  }
  const requiredKeys = [
    FILE_ID.SETTINGS_FILE,
    FILE_ID.LOCALIZATION_FILE,
    FILE_ID.LINKS_FILE,
    FILE_ID.PROJECTS_INDEX_FILE,
    FILE_ID.RECENT_PROJECTS_FILE,
    FILE_ID.VEP_FILE,
    FILE_ID.INTEGRITY_FILE,
    FILE_ID.PROJECT_STATE_FILE,
    FILE_ID.RESOURCE_INDEX_FILE
  ];
  for (const key of requiredKeys) {
    const entry = data[key];
    if (!entry || typeof entry !== 'object' || Array.isArray(entry)) {
      return false;
    }
    if (typeof entry.preferred !== 'number') {
      return false;
    }
    if (!Array.isArray(entry.supported)) {
      return false;
    }
    if (!entry.supported.every(value => typeof value === 'number')) {
      return false;
    }
  }
  return true;
}

function isFileVersionSupported(fileVersion, fileId) {
  if (!veFile.fileExists(pathService.formatSupportFile)) {
    debugService.sendError('FormatSupport.json file is missing!');
    return false;
  }

  const data = veFile.readJsonFile(pathService.formatSupportFile);

  if (!isValidFormatSupport(data)) {
    debugService.sendError('FormatSupport.json file is invalid!');
    return false;
  }

  const ideFileSupport = data[fileId];

  if (!ideFileSupport) {
    debugService.sendError('Unknown fileId in FormatSupport.json!', ` ${fileId}`);
    return false;
  }

  if (fileVersion !== ideFileSupport.preferred) {
    const isSupported = ideFileSupport.supported.includes(fileVersion);

    if (isSupported) {
      debugService.sendWarning(
        'File version mismatch!',
        ` ${fileId} -> file version ${fileVersion}, preferred ${ideFileSupport.preferred}`
      );
      return true;
    }

    return false;
  }

  return true;
}

module.exports = {
  FILE_ID,
  isFileVersionSupported
}