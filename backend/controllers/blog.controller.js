import Blog from "../models/blog.model.js";
import User from "../models/user.model.js";
import logger from "../utils/logger.js";

export const handleCreateBlog=async(req,res)=>{
    try {
        const userId = req.id;
        const { title, image, category, description } = req.body;
        
        if (!title || !image || !category || !description) {
            return res.status(400).json({
              message: "Missing required fields",
            });
          }
        
        //create blog in db
        const newBlog= new Blog({
            title,
            image,
            description,
            userId,
            categoryId:category
        })
        await newBlog.save()
        return res.status(200).json({
            message: "New Blog is created successfully ",
        });


    } catch (error) {
        logger.error(error);
    return res.status(500).json({
      error: error.message,
      message: "Something went wrong",
    });
    }
}
//handle trending blogs
export const handleTrendingBlogs=async(req,res)=>{
  try {
    let trendingBlogs = await Blog.find()
      .limit(4)
      .populate({
        path: 'userId',
        select: 'email'
      })
      .populate({
        path:"categoryId",
        select:"title"
      })

    return res.status(200).json({
      trendingBlogs
    });

  } catch (error) {
    logger.error(error);
    return res.status(500).json({
      error: error.message,
      message: "Something went wrong",
    });
  }
}
export const handleGetAllBLog=async(req,res)=>{
  try {
    
    const page=Number(req.query.page)||1
    const limit=6
    const skip=(page-1)*limit
    const blogs=await Blog.find()
    .limit(limit).skip(skip)
    .populate({
      path: 'userId',
      select: 'email'
    })
    .populate({
      path:"categoryId",
      select:"title"
    })

    return res.status(200).json({
      blogs
    });
  } catch (error) {
    logger.error(error);
    return res.status(500).json({
      error: error.message,
      message: "Something went wrong",
    });
  }
}