import { openDb } from '../src/db.js'; 
import dotenv from 'dotenv'; 
dotenv.config();
const DB_FILE = process.env.DATABASE_FILE || './data/data.db';

const db = await openDb(DB_FILE);
export const getCustoms= async()=>{
    const result = await db.all(`
        SELECT id, ext FROM custom_extensions ORDER BY ext ASC
    `);
    
    return result;
}

export const addCustom = async(body) => {
    const {ext} = body;

    const result = await db.run(`INSERT INTO custom_extensions(ext) VALUES(?)`, [ext]);
    const final = await db.get('SELECT id, ext FROM custom_extensions WHERE ext=?', [ext]);
    return final;
}

export const delCustom = async(id) => {
     const result = await db.run('DELETE FROM custom_extensions WHERE id=?', [id]);
     return result;
}