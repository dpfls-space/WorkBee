import { app, BrowserWindow } from 'electron'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

async function waitForVite(url, retries = 30, delay = 1000) {
    const { net } = await import('electron')
    for (let i = 0; i < retries; i++) {
        try {
            await new Promise((resolve, reject) => {
                const req = net.request(url)
                req.on('response', () => resolve())
                req.on('error', reject)
                req.end()
            })
            return
        } catch {
            await new Promise(r => setTimeout(r, delay))
        }
    }
    throw new Error(`Vite dev server not available at ${url}`)
}

async function createWindow() {
    const win = new BrowserWindow({
        width: 1280,
        height: 800,
        icon: join(__dirname, '../src/assets/favicon/favicon.ico'),
    })

    await waitForVite('http://localhost:5173')
    win.loadURL('http://localhost:5173')
}

app.whenReady().then(async () => {
    await createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

console.log('Electron app is running...')