import express from "express"
import { handleCategoryWiseBlog, handleCreateCategory, handleGetAllCategory } from "../controllers/category.controller.js"
const router=express.Router()


//create category
router.post("/create",handleCreateCategory)
//get all category
router.get("/",handleGetAllCategory)

//category wie blog count
router.get("/blog",handleCategoryWiseBlog)
export default router