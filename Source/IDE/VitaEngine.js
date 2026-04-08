
const { app, shell, BrowserWindow, ipcMain } = require('electron');
const global = require('./Shared/Global')
const path = require('node:path');
const fs = require('node:fs');
const renderCall = require('./Bridge/IpcChannels');
const ipc = ipcMain;
var launcherWindow = null;
var mainWindow = null;
const projectRoot = path.join(__dirname);
const windowStateKeeper = require('electron-window-state');

if (global.devMode) {
    require('electron-reload')(projectRoot, {
        electron: require(path.join(projectRoot,'node_modules', 'electron')),
        hardResetMethod: 'exit'
    });
}

function createLauncherWindow() {
    const launcherWindowState = global.devMode
        ? windowStateKeeper({
            defaultWidth: 1020,
            defaultHeight: 770,
            file: 'launcher-window-state-dev.json'
        })
        : null;

    const windowOptions = {
        width: launcherWindowState?.width ?? 900,
        height: launcherWindowState?.height ?? 650,
        x: launcherWindowState?.x,
        y: launcherWindowState?.y,
        resizable: false,
        fullscreenable: false,
        frame: false,
        useContentSize: true,
        show: false,
        center: !launcherWindowState,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: true,
            devTools: global.devMode,
            preload: path.join(__dirname, 'Shared', 'Preload.js'),
        }
    };

    launcherWindow = new BrowserWindow(windowOptions);
    launcherWindowState?.manage(launcherWindow);
    launcherWindow.on('closed', () => {
        launcherWindow = null;
    });
    return launcherWindow;
}

function createMainWindow() {
    const mainWindowState = global.devMode
        ? windowStateKeeper({
            defaultWidth: 1020,
            defaultHeight: 770,
            file: 'main-window-state-dev.json'
        })
        : null;

    const windowOptions = {
        width: mainWindowState?.width ?? 1024,
        height: mainWindowState?.height ?? 768,
        x: mainWindowState?.x,
        y: mainWindowState?.y,
        resizable: true,
        fullscreenable: true,
        frame: false,
        useContentSize: true,
        show: false,
        center: !mainWindowState,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: true,
            devTools: global.devMode,
            preload: path.join(__dirname, 'Shared', 'Preload.js'),
        }
    };

    mainWindow = new BrowserWindow(windowOptions);
    mainWindowState?.manage(mainWindow);
    return mainWindow;
}

async function openMainWindow() {
    if (launcherWindow && !launcherWindow.isDestroyed()) {
        launcherWindow.close();
    }
    if (!mainWindow || mainWindow.isDestroyed()) {
        createMainWindow();
    }
    await mainWindow.loadFile('./Main/Main.html');
    mainWindow.show();
    if (global.devMode && !mainWindow.webContents.isDevToolsOpened()) {
        mainWindow.webContents.openDevTools({ mode: 'detach' });
    }
    mainWindow.webContents.send('window-is-ready');
}

async function openLauncherWindow() {
    if (mainWindow && !mainWindow.isDestroyed()) {
        mainWindow.close();
    }
    if (!launcherWindow || launcherWindow.isDestroyed()) {
        createLauncherWindow();
    }
    await launcherWindow.loadFile('./Launcher/Launcher.html');
    launcherWindow.show();
    if (global.devMode && !launcherWindow.webContents.isDevToolsOpened()) {
        launcherWindow.webContents.openDevTools({mode: 'detach'});
    }
    launcherWindow.send('window-is-ready');
}

function getRecentProjectsFilePath() {
    return path.join(app.getPath('userData'), 'RecentProjects.json');
}

function readRecentProjects() {
    const filePath = getRecentProjectsFilePath();
    try {
        if (!fs.existsSync(filePath)) {
            return [];
        }
        const rawData = fs.readFileSync(filePath, 'utf-8');
        var projects = JSON.parse(rawData);
        if (!Array.isArray(projects)) {
            return [];
        }
        console.log('Recent projects raw: ', projects);
        projects = projects.filter((project) => {
            const exists =  project.path && fs.existsSync(project.path);
            return exists;
        });
        return projects;
    } catch (error) {
        console.error('Error reading recent projects: ', error);
        return [];
    }
}

function registerHandlers(){
    
    ipc.on(renderCall.channel.window, (event, action) => {
        const window = BrowserWindow.fromWebContents(event.sender);
        switch (action) {
            case renderCall.windowActions.close:
                window?.close();
                break;
            case renderCall.windowActions.minimize:
                window?.minimize();
                break;
            case renderCall.windowActions.maximize:
                window?.maximize();
                break;
            case renderCall.windowActions.restore:
                window?.unmaximize();
                break;
            default:
                console.warn(`Unknown window action: ${action}`);
                break;
        }
    })
    
    ipc.on(renderCall.channel.shell, (event, action, data) => {
        switch (action) {
            case renderCall.shellActions.openUrl:
                if (data) shell.openExternal(data);
                break;
            default:
                console.warn(`Unknown window action: ${action}`);
                break;
        }
    });

    ipc.handle(renderCall.channel.project, async (event, action, data) => {
        switch (action) {
            case renderCall.projectActions.getRecentProjects:
                return readRecentProjects();
            case renderCall.projectActions.newProject:
                return openMainWindow();
            case renderCall.projectActions.loadProject:
                break;
            default:
                console.warn(`Unknown project action: ${action}`);
                break;
        }
    });
}

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

app.whenReady().then( async () => {

    registerHandlers();
    await openLauncherWindow();

    app.on('activate', async () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        await openLauncherWindow();
      }
    });
});