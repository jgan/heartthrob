const { app, BrowserWindow, ipcMain, protocol } = require('electron/main')
const path = require('node:path')
const fs = require('fs')
const Config = require('./config')
const Game = require('./game')

// Create a global config instance
const config = new Config();
let currentGame = null;

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1920,
    height: 1080,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.webContents.openDevTools()
  win.loadFile('./src/board/index.html')
}

const createAdminWindow = () => {
  const win = new BrowserWindow({
    width: 320,
    height: 1080,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('./src/admin/index.html')
}

app.whenReady().then(() => {
  protocol.handle('app', (request) => {
    const filePath = request.url.replace('app://', '');
    console.log('Loading image:', filePath);

    try {
      data = fs.readFileSync(filePath)
      console.log('Data:', data)
      return new Response(data, { headers: { 'content-type': 'image/png' } })
    } catch (error) {
      console.error('Failed to load image:', error);
      return new Response(null, { status: 404 });
    }
  });

  ipcMain.handle('ping', () => Date.now())
  ipcMain.handle('get-boyfriend-cards', () => config.getBoyfriendCards())
  ipcMain.handle('get-descriptors', (event, category) => config.getDescriptors(category))
  ipcMain.handle('new-game', () => {
    currentGame = new Game(config);
    return currentGame.getSuitors();
  })
  
  createWindow()
  // createAdminWindow()

  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// to keep the application active until the user quits explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
