import { app, BrowserWindow, ipcMain } from 'electron'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { createRequire } from 'module'

// ESM 에서 __dirname 정의
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// ESM 에서 require() 사용 가능하게 설정
const require = createRequire(import.meta.url)

// CJS 모듈 import ----------------
const fs = require('fs')

// IPC 핸들러 모듈 ----------------
import registerAuth from './api/auth.js'
import registerUser from './api/user.js'
import registerCompany from './api/company.js'
import registerLeave from './api/leave.js'
import registerAttendance from './api/attendance.js'

// DB 초기화 ----------------
async function initDatabase() {
    const initSqlJs = require('sql.js')
    const SQL = await initSqlJs()

    const DB_PATH = join(app.getPath('userData'), 'workbee.db')
    const SCHEMA_PATH = join(__dirname, 'database.sql')

    // 기존 DB 파일이 있으면 로드, 없으면 새로 생성
    let db
    if (fs.existsSync(DB_PATH)) {
        const fileBuffer = fs.readFileSync(DB_PATH)
        db = new SQL.Database(fileBuffer)
    } else {
        db = new SQL.Database()
    }

    db.run('PRAGMA foreign_keys = ON')

    const schema = fs.readFileSync(SCHEMA_PATH, 'utf-8')
    db.exec(schema)

    // sql.js는 인메모리라 직접 파일 저장 필요
    const saveDb = () => {
        const data = db.export()
        fs.writeFileSync(DB_PATH, Buffer.from(data))
    }

    saveDb() // 스키마 적용 후 초기 저장
    db.saveToFile = saveDb

    return db
}

// Vite 대기 함수 ----------------
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

// 메인 윈도우 생성 ----------------
async function createWindow() {
    const win = new BrowserWindow({
        width: 1280,
        height: 800,
        icon: join(__dirname, '../src/assets/favicon/favicon.ico'),
        webPreferences: {
            preload: join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false,
        }
    })

    if (!app.isPackaged) {
        await waitForVite('http://localhost:5173')
        win.loadURL('http://localhost:5173')
    } else {
        win.loadFile(join(__dirname, '../dist/index.html'))
    }
}

// 앱 시작 ----------------
app.whenReady().then(async () => {
    // DB 초기화
    const db = await initDatabase()

    // IPC 핸들러 등록 ----------------
    registerAuth(ipcMain, db)
    registerUser(ipcMain, db)
    registerCompany(ipcMain, db)
    registerLeave(ipcMain, db)
    registerAttendance(ipcMain, db)

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