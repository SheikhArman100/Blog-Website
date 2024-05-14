import express from "express";
import { handleBlogWiseLike, handleCreateBlog, handleCreateComment, handleDeleteComment, handleExportBlog, handleGetAllBLog, handleGetBlog, handleGetComments, handleLikeBLog, handleLikeStatusBlog, handleTrendingBlogs, handleUpdateComment } from "../controllers/blog.controller.js";
import verifyJWT from "../middlewares/verifyJwt.js";
import { zodValidation } from "../middlewares/zodValidation.js";
import { createBlogSchema, createCommentSchema, updateCommentSchema } from "../utils/zodSchema/blog.schema.js";

const router=express.Router()

//create blog
router.post("/create",verifyJWT,zodValidation(createBlogSchema), handleCreateBlog)
//trending
router.get("/trending",handleTrendingBlogs)
//all blogs
router.get("/all",handleGetAllBLog)
//export blog
router.get("/export",verifyJWT,handleExportBlog)

//blog wise like
router.get("/like",verifyJWT,handleBlogWiseLike)

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
//delete comment
router.delete("/:blogId/comment/:commentId",verifyJWT,handleDeleteComment)

//update comment
router.put("/:blogId/comment/:commentId",verifyJWT,zodValidation(updateCommentSchema),handleUpdateComment)




export default router