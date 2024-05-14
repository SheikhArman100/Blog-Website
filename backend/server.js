import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import logger from './utils/logger.js';

import authRouter from "./routes/auth.route.js";
import blogRouter from "./routes/blog.route.js";
import categoryRouter from "./routes/category.route.js";
import replyRouter from "./routes/reply.route.js";

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
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: false })); 

// Cross Origin Resource Sharing
const ORIGIN=process.env.FRONTEND_URL
app.use(
  cors({
    credentials: true,
    origin: [ORIGIN,'https://accounts.google.com/v3/signin/identifier',"ttps://accounts.google.com/o/oauth2/v2/auth"], //!write frontend route here
  })
);

//routes
app.get("/api/",(req,res)=>{
  res.json({message:"API is working"})
})

app.use("/api/auth",authRouter)
app.use("/api/category",categoryRouter)
app.use("/api/blog",blogRouter)
app.use("/api/comment",replyRouter)




const PORT = process.env.PORT 
app.listen(PORT, () => logger.info(`Express Server running on port ${PORT}`));