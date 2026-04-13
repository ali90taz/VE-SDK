
const { app, shell, BrowserWindow, ipcMain } = require('electron');
const path = require('node:path');
const fs = require('node:fs');
const renderCall = require('./Bridge/IpcChannels');
const ipc = ipcMain;
var launcherWindow = null;
var editorWindow = null;
const devMode = true;
const projectRoot = path.join(__dirname);
const windowStateKeeper = require('electron-window-state');

if (devMode) {
    require('electron-reload')(projectRoot, {
        electron: require(path.join(projectRoot,'node_modules', 'electron')),
        hardResetMethod: 'exit'
    });
}

function createLauncherWindow() {
    const launcherWindowState = devMode
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
            nodeIntegration: false,
            contextIsolation: true,
            sandbox: false,
            devTools: devMode,
            preload: path.join(__dirname, 'Bridge', 'Preload.js'),
        }
    };

    launcherWindow = new BrowserWindow(windowOptions);
    launcherWindowState?.manage(launcherWindow);
    launcherWindow.on('closed', () => {
        launcherWindow = null;
    });
    return launcherWindow;
}

function createEditorWindow() {
    const editorWindowState = devMode
        ? windowStateKeeper({
            defaultWidth: 1020,
            defaultHeight: 770,
            file: 'editor-window-state-dev.json'
        })
        : null;

    const windowOptions = {
        width: editorWindowState?.width ?? 1024,
        height: editorWindowState?.height ?? 768,
        x: editorWindowState?.x,
        y: editorWindowState?.y,
        resizable: true,
        fullscreenable: true,
        frame: false,
        useContentSize: true,
        show: false,
        center: !editorWindowState,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            sandbox: false,
            devTools: devMode,
            preload: path.join(__dirname, 'Bridge', 'Preload.js'),
        }
    };

    editorWindow = new BrowserWindow(windowOptions);
    editorWindowState?.manage(editorWindow);
    return editorWindow;
}

async function openEditorWindow() {
    if (launcherWindow && !launcherWindow.isDestroyed()) {
        launcherWindow.close();
    }
    if (!editorWindow || editorWindow.isDestroyed()) {
        createEditorWindow();
    }
    await editorWindow.loadFile('./Renderer/Windows/Editor/Index.html');
    editorWindow.show();
    if (devMode && !editorWindow.webContents.isDevToolsOpened()) {
        editorWindow.webContents.openDevTools({ mode: 'detach' });
    }
    editorWindow.webContents.send('window-is-ready');
}

async function openLauncherWindow() {
    if (editorWindow && !editorWindow.isDestroyed()) {
        editorWindow.close();
    }
    if (!launcherWindow || launcherWindow.isDestroyed()) {
        createLauncherWindow();
    }
    await launcherWindow.loadFile('./Renderer/Windows/Launcher/Index.html');
    launcherWindow.show();
    if (devMode && !launcherWindow.webContents.isDevToolsOpened()) {
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
                return openEditorWindow();
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