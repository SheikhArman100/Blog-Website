import express from "express";
import verifyJWT from "../middlewares/verifyJwt.js";
import { handleCreateBlog, handleGetAllBLog, handleTrendingBlogs } from "../controllers/blog.controller.js";
import { zodValidation } from "../middlewares/zodValidation.js";
import { createBlogSchema } from "../utils/zodSchema/blog.schema.js";
const router=express.Router()

//create blog
router.post("/create",verifyJWT,zodValidation(createBlogSchema), handleCreateBlog)
//trending
router.get("/trending",handleTrendingBlogs)
//all blogs
router.get("/all",handleGetAllBLog)

export default router