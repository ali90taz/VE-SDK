
const registerWindowHandlers = require('./Main/Handlers/WindowHandlers');
const registerShellHandlers = require('./Main/Handlers/ShellHandlers');
const registerProjectHandlers = require('./Main/Handlers/ProjectHandlers');
const registerBuildHandlers = require('./Main/Handlers/BuildHandlers');
const registerDeployHandlers = require('./Main/Handlers/DeployHandlers');
const registerPackageHandlers = require('./Main/Handlers/PackageHandlers');
const registerPackageHandlers = require('./Main/Handlers/CompanionHandlers');
const registerSettingHandlers = require('./Main/Handlers/SettingHandlers');

function registerAllHandlers() {
  registerWindowHandlers();
  registerShellHandlers();
  registerProjectHandlers();
  registerBuildHandlers();
  registerDeployHandlers();
  registerPackageHandlers();
  registerPackageHandlers();
  registerSettingHandlers();
}

module.exports = registerAllHandlers;