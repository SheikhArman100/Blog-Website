import express from "express"
import { handleCreateCategory, handleGetAllCategory } from "../controllers/category.controller.js"
const router=express.Router()


//create category
router.post("/create",handleCreateCategory)
//get all category
router.get("/",handleGetAllCategory)
export default router