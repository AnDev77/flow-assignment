import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { openDb } from './db.js';
import fixedRoute from '../routes/fixedRoute.js';
import customRoute from '../routes/customRoute.js';
dotenv.config();

const PORT = process.env.PORT || 4000;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:5173';
const DB_FILE = process.env.DATABASE_FILE || './data/data.db';

const app = express();
app.use(cors({
  origin: CLIENT_ORIGIN,   // 또는 origin: true (개발 중엔 관대하게)
  credentials: true
}));
app.use(express.json());

const db = await openDb(DB_FILE);


app.use('/fixed', fixedRoute);
app.use('/custom', customRoute)

app.listen(PORT, () => {
  console.log(`server listening on :${PORT}`);
});
