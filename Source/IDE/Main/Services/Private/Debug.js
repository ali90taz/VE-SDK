const veArg = require('../../../System/Arg');

const warningPrefix = "VE-IDE Warning: ";
const messagePrefix = "VE-IDE Message: ";
const errorPrefix = "VE-IDE Error: ";

function devMode() {
  return veArg.getArgs().includes('--dev-mode') ? true : false;
}

function sendMessage(message, details) {
  if (details) {
    console.log(`${messagePrefix}${message}${details}`);
    return;
  }
  console.log(`${messagePrefix}${message}`);
}

function sendWarning(warning, details) {
  if (details) {
    console.warn(`${warningPrefix}${warning}${details}`);
    return;
  }
  console.warn(`${warningPrefix}${warning}`);
}

function sendError(error, details) {
  if (details) {
    console.error(`${errorPrefix}${error}${details}`);
    return;
  }
  console.error(`${errorPrefix}${error}`);
}

module.exports = {
  devMode,
  sendMessage,
  sendWarning,
  sendError
}