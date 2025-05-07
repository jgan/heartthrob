const path = require('node:path')
const fs = require('fs')

const { app, BrowserWindow, ipcMain, protocol } = require('electron/main')

const Config = require('./config')
const Game = require('./game')

// Create a global config instance
const config = new Config();
let currentGame = null;
let adminWindow = null;
let boardWindow = null;

const createWindow = () => {
  boardWindow = new BrowserWindow({
    width: 1920,
    height: 1080,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // boardWindow.webContents.openDevTools()
  boardWindow.loadFile('./src/board/index.html')
}

const createAdminWindow = () => {
  adminWindow = new BrowserWindow({
    width: 320,
    height: 1080,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  adminWindow.loadFile('./src/admin/index.html')
}

app.whenReady().then(() => {
  // Handle config:// protocol for config directory assets
  protocol.handle('config', (request) => {
    const filePath = request.url.replace('config://', '');
    console.log('Loading config asset:', filePath);

    try {
      const fullPath = path.join(config.configPath, filePath);
      const data = fs.readFileSync(fullPath);
      
      // Determine content type based on file extension
      const ext = path.extname(filePath).toLowerCase();
      const contentType = {
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.gif': 'image/gif',
        '.csv': 'text/csv',
        '.json': 'application/json',
        '.txt': 'text/plain'
      }[ext] || 'application/octet-stream';

      return new Response(data, { headers: { 'content-type': contentType } });
    } catch (error) {
      console.error('Failed to load config asset:', error);
      return new Response(null, { status: 404 });
    }
  });

  ipcMain.handle('ping', () => Date.now())
  ipcMain.handle('get-hunks', () => currentGame.getHunks())
  ipcMain.handle('get-descriptors', (event, category) => config.getDescriptors(category))
  ipcMain.handle('new-game', () => {
    currentGame = new Game(config);
    // Notify the board window that a new game has started
    if (boardWindow && !boardWindow.isDestroyed()) {
      boardWindow.webContents.send('game-updated', currentGame.getHunks());
    }
    return currentGame.getHunks();
  })
  
  // // Initial game
  currentGame = new Game(config);

  // Create both windows
  createAdminWindow()
  createWindow()

  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createAdminWindow()
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
