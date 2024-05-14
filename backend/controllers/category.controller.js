import Blog from "../models/blog.model.js";
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

export const handleCategoryWiseBlog=async(req,res)=>{
  try {
    const blogs=await Blog.find().select("title").populate({path:"categoryId",select:"title"})
    const categoryCounts = {};
    

    // Count blogs per category
    blogs.forEach(blog => {
        const categoryTitle = blog.categoryId.title;
        if (categoryCounts[categoryTitle]) {
            categoryCounts[categoryTitle]++;
        } else {
            categoryCounts[categoryTitle] = 1;
        }
    });
    const categoryCountsArray = Object.keys(categoryCounts).map((categoryTitle) => ({
      category:categoryTitle,
      count: categoryCounts[categoryTitle],
    }));
    res.status(200).json({categoryCountsArray})
  } catch (error) {
    logger.error(error);
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
}
