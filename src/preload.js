const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  ping: () => ipcRenderer.invoke('ping'),
  getBoyfriendCards: () => ipcRenderer.invoke('get-boyfriend-cards'),
  getDescriptors: (category) => ipcRenderer.invoke('get-descriptors', category),
  newGame: () => ipcRenderer.invoke('new-game')
})
