import dotenv from 'dotenv';
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import http from "http";
// import fileUpload from 'express-fileupload'
import { dbConnection } from './configs/config';
import mainRouter from './routes';
import { errorHandler } from './middleware/errorHandler';
import path from 'path';

const envFile = process.env.NODE_ENV === 'production' ? '.env.prod' : '.env.local';

dotenv.config({ path: envFile })

dbConnection();

const app: express.Application = express();

const port: number = parseInt(process.env.SERVER_PORT as string) || 8000;

const server = http.createServer(app);

app.use(cors());

app.use(bodyParser.json());

app.use("/uploads", express.static(path.join(__dirname, "./uploads")));

app.use("/api", mainRouter);

app.use(errorHandler);

server.listen(port, () => {
    console.log(`Server is running on ${process.env.BASE_URL}`)
});