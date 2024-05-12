import Category from "../models/category.model.js";
import logger from "../utils/logger.js";

export const handleCreateCategory = async (req, res) => {
  try {
    const {title} =req.body
    if (!title) {
      return res.status(400).json({
        message: "Invalid or incomplete user data",
      });
    }
    const newCategory = new Category({
      title,
    });
    await newCategory.save();
    return res.status(201).json({
      message: "New category is created successfully",
    });
  } catch (error) {
    logger.error(error);
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};
export const handleGetAllCategory=async(req,res)=>{
  try {
    const categories=await Category.find()
    return res.status(200).json({
      categories:categories
    });
    
  } catch (error) {
    logger.error(error);
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }

}
