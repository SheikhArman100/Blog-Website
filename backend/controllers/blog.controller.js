import Blog from "../models/blog.model.js";
import Comment from "../models/comment.model.js";
import Like from "../models/like.model.js";
import User from "../models/user.model.js";
import logger from "../utils/logger.js";

export const handleCreateBlog = async (req, res) => {
  try {
    const userId = req.id;
    const { title, image, category, description } = req.body;

    if (!title || !image || !category || !description) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }

    //create blog in db
    const newBlog = new Blog({
      title,
      image,
      description,
      userId,
      categoryId: category,
    });
    await newBlog.save();
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
};
//handle trending blogs
export const handleTrendingBlogs = async (req, res) => {
  try {
    let trendingBlogs = await Blog.find()
      .limit(4)
      .populate({
        path: "userId",
        select: "email",
      })
      .populate({
        path: "categoryId",
        select: "title",
      });

    return res.status(200).json({
      trendingBlogs,
    });
  } catch (error) {
    logger.error(error);
    return res.status(500).json({
      error: error.message,
      message: "Something went wrong",
    });
  }
};
export const handleGetAllBLog = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = 6;
    const skip = (page - 1) * limit;
    const blogs = await Blog.find()
      .limit(limit)
      .skip(skip)
      .populate({
        path: "userId",
        select: "email",
      })
      .populate({
        path: "categoryId",
        select: "title",
      });

    return res.status(200).json({
      blogs,
    });
  } catch (error) {
    logger.error(error);
    return res.status(500).json({
      error: error.message,
      message: "Something went wrong",
    });
  }
};

export const handleGetBlog = async (req, res) => {
  try {
    const blogId = req.params.blogId;
    if (!blogId) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }
    const blog = await Blog.findById(blogId)
      .populate({
        path: "userId",
        select: ["email", "name"],
      })
      .populate({
        path: "categoryId",
        select: "title",
      });
    return res.status(200).json({
      blog,
    });
  } catch (error) {
    logger.error(error);
    return res.status(500).json({
      error: error.message,
      message: "Something went wrong",
    });
  }
};
export const handleLikeStatusBlog = async (req, res) => {
  try {
    const userId = req.id;
    const blogId = req.params.blogId;
    if (!blogId) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }
    const existingLike = await Like.findOne({ userId, blogId });
    if (existingLike) {
      res.status(200).json({ likeStatus: true });
    } else {
      res.status(200).json({ likeStatus: false });
    }
  } catch (error) {
    logger.error(error);
    return res.status(500).json({
      error: error.message,
      message: "Something went wrong",
    });
  }
};

//handle like or remove like from blog
export const handleLikeBLog = async (req, res) => {
  try {
    const userId = req.id;
    const blogId = req.params.blogId;
    if (!blogId) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }

    // Check if  already liked the blog.if yes then remove like from the blog. else add to to like table
    const existingLike = await Like.findOne({ userId, blogId });
    if (existingLike) {
      await Like.findOneAndDelete({ userId, blogId });
      res.status(200).json({ message: "Like removed from the Post" });
    } else {
      const newLike = new Like({ userId, blogId });
      await newLike.save();
      res.status(200).json({ message: "Like the post" });
    }
  } catch (error) {
    logger.error(error);
    return res.status(500).json({
      error: error.message,
      message: "Something went wrong",
    });
  }
};

export const handleGetComments = async (req, res) => {
  try {
    const blogId = req.params.blogId;
    if (!blogId) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }
    const comments = await Comment.find({ blogId })
      .populate({
        path: "userId",
        select: ["email", "name"],
      })
      .sort({ createdAt: -1 });
    res.status(200).json({ comments });
  } catch (error) {
    logger.error(error);
    return res.status(500).json({
      error: error.message,
      message: "Something went wrong",
    });
  }
};

export const handleCreateComment = async (req, res) => {
  try {
    const blogId = req.params.blogId;
    const userId = req.id;
    const { comment } = req.body;
    if (!blogId || !comment) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }

    const newComment = new Comment({
      content: comment,
      userId,
      blogId,
    });
    await newComment.save();
    return res.status(200).json({
      message: "New comment is created successfully ",
    });
  } catch (error) {
    logger.error(error);
    return res.status(500).json({
      error: error.message,
      message: "Something went wrong",
    });
  }
};

//delete comment
export const handleDeleteComment = async (req, res) => {
  try {
    const blogId = req.params.blogId;
    const commentId = req.params.commentId;
    const userId = req.id;
    if (!blogId || !commentId) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }

    const comment = await Comment.findOne({ _id: commentId, blogId, userId });
    if (!comment) {
      return res.status(404).json({
        message: "Comment not found",
      });
    }
    await Comment.deleteOne({ _id: commentId, blogId, userId });

    return res.status(200).json({
      message: "Comment deleted Successfully",
    });
  } catch (error) {
    logger.error(error);
    return res.status(500).json({
      error: error.message,
      message: "Something went wrong",
    });
  }
};
//edit comment
export const handleUpdateComment = async (req, res) => {
  try {
    const blogId = req.params.blogId;
    const commentId = req.params.commentId;
    const userId = req.id;
    const updateComment = req.body.comment;
    if (!blogId || !commentId || !updateComment) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }

    const comment = await Comment.findOne({ _id: commentId, blogId, userId });
    if (!comment) {
      return res.status(404).json({
        message: "Comment not found",
      });
    }

    await Comment.updateOne(
      { _id: commentId, blogId, userId },
      { content: updateComment }
    );
    return res.status(200).json({
      message: "Comment updated Successfully",
    });
  } catch (error) {
    logger.error(error);
    return res.status(500).json({
      error: error.message,
      message: "Something went wrong",
    });
  }
};
