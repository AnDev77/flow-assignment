import { openDb } from '../src/db.js'; 
import dotenv from 'dotenv'; 
dotenv.config();
const DB_FILE = process.env.DATABASE_FILE || './data/data.db';

const db = await openDb(DB_FILE);
export const getFixedLists = async()=>{
    let result = await db.all(`
        SELECT ext, is_blocked FROM fixed_extensions ORDER BY ext ASC;
    `);
    const final = result.map(x => ({ext : x.ext, isBlocked : !!x.is_blocked})); 
    console.log(final);
    return final;
}

export const setFixed = async (body) => {
    const {ext, isBlocked} = body;
    console.log(ext);
    const temp = await db.run('UPDATE fixed_extensions SET is_blocked=? WHERE ext=?', [isBlocked ? 1 : 0, ext]);
    console.log(-10);
    const result = await db.get('SELECT ext, is_blocked FROM fixed_extensions WHERE ext=?', [ext]);
    console.log(result);
    const final = {ext : result.ext, isBlocked : result.is_blocked};
    return final;
}