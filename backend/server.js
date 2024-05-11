import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import logger from './utils/logger.js';

import authRouter from "./routes/auth.route.js"

dotenv.config();
const app = express();

//connect to mongoDb database
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => logger.info("MongoDB is connected Successfully !"))
  .catch((err) => {
    logger.error(err.message);
  });

//middleware 
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false })); 

// Cross Origin Resource Sharing
const ORIGIN=process.env.FRONTEND_URL
app.use(
  cors({
    credentials: true,
    origin: [ORIGIN], //!write frontend route here
  })
);

//routes
app.get("/api/",(req,res)=>{
  res.json({message:"API is working"})
})

app.use("/api/auth",authRouter)



const PORT = process.env.PORT 
app.listen(PORT, () => logger.info(`Express Server running on port ${PORT}`));