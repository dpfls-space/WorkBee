const { contextBridge, ipcRenderer } = require('electron');

contextBirdge.expostInMainWorld('electron', {
    invoke: (channel, ...args) => ipcRenderer.invoke(channel, ...args)
})