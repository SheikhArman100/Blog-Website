import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import logger from './utils/logger.js';

dotenv.config();
const app = express();

//middleware 
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false })); 

// Cross Origin Resource Sharing
// const ORIGIN=process.env.ORIGIN
// app.use(
//   cors({
//     credentials: true,
//     origin: [ORIGIN], //!write frontend route here
//   })
// );

const PORT = process.env.PORT 
app.listen(PORT, () => logger.info(`Express Server running on port ${PORT}`));