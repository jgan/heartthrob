const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  ping: () => ipcRenderer.invoke('ping'),
  getHunks: () => ipcRenderer.invoke('get-hunks'),
  getDescriptors: (category) => ipcRenderer.invoke('get-descriptors', category),
  newGame: () => ipcRenderer.invoke('new-game'),
  onGameUpdated: (callback) => ipcRenderer.on('game-updated', (_, hunks) => callback(hunks)),
  selectConfigFolder: () => ipcRenderer.invoke('select-config-folder'),
  loadConfig: (folderPath) => ipcRenderer.invoke('load-config', folderPath)
})
