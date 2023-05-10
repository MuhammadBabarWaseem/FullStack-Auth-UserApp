import express from 'express';
import dotenv from "dotenv"
import db from "./config/Database.js"
import cookieParser from 'cookie-parser';
import router from './routes/index.js';
import cors from "cors"
const app = express()
dotenv.config()

try {
    await db.authenticate();
    console.log('Database Connected');
} catch (error) {
    console.error(error);
}

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))
app.use(cookieParser());
app.use(express.json());
app.use(router);

app.listen(5000, () => console.log('Server Running At Port 5000'));