import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export async function openDb(dbFile = './data/data.db') {
  const db = await open({ filename: dbFile, driver: sqlite3.Database });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS fixed_extensions (
      ext VARCHAR(30) PRIMARY KEY,
      is_blocked INTEGER NOT NULL DEFAULT 0
    );
    CREATE TABLE IF NOT EXISTS custom_extensions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      ext VARCHAR(200) NOT NULL UNIQUE
    );
  `);

  const defaults = ['exe','sh','bat','cmd'];
  for (const d of defaults) {
    await db.run(`INSERT OR IGNORE INTO fixed_extensions(ext, is_blocked) VALUES(?, 0)`, [d]);
  }

  return db;
}
