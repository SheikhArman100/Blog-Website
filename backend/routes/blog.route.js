import express from "express";
import verifyJWT from "../middlewares/verifyJwt.js";
import { handleCreateBlog, handleCreateComment, handleGetAllBLog, handleGetBlog, handleGetComments, handleLikeBLog, handleLikeStatusBlog, handleTrendingBlogs } from "../controllers/blog.controller.js";
import { zodValidation } from "../middlewares/zodValidation.js";
import { createBlogSchema, createCommentSchema } from "../utils/zodSchema/blog.schema.js";
const router=express.Router()

//create blog
router.post("/create",verifyJWT,zodValidation(createBlogSchema), handleCreateBlog)
//trending
router.get("/trending",handleTrendingBlogs)
//all blogs
router.get("/all",handleGetAllBLog)

//get single blog
router.get("/:blogId",handleGetBlog)

//like status of the blog
router.get("/:blogId/like",verifyJWT,handleLikeStatusBlog)

//handle like or remove like from blog
router.post("/:blogId/like",verifyJWT,handleLikeBLog)

//get all comment
router.get("/:blogId/comment",handleGetComments)
// create comment
router.post("/:blogId/comment",verifyJWT,zodValidation(createCommentSchema),handleCreateComment)

export default router