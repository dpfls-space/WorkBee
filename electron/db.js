const { app } = require('electron');
const path = require('path');
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();

let db;

function getDbPath() {
    const dataDir = path.join(app.getPath('userData'), 'workbee-data');

    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
    }

    return path.join(dataDir, 'workbee.db');
}

function initDatabase() {
    const dbPath = getDbPath();
    const sqlPath = path.join(__dirname, 'database.sql');

    db = new sqlite3.Database(dbPath);

    db.serialize(() => {
        db.exec('PRAGMA foreign_keys = ON');
        db.exec(schema);
    })

    return db;
}

function getDb() {
    if (!db) {
        throw new Error('Database not initialized. Call initDatabase() first.');
    }
    return db;
}

module.exports = {
    initDatabase,
    getDb
}