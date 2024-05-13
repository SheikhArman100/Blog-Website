import Comment from "../models/comment.model.js";
import Reply from "../models/reply.model.js";
import logger from "../utils/logger.js";

//create reply handler
export const handleCreateReply = async (req, res) => {
  try {
    const userId = req.id;
    const { reply } = req.body;
    const commentId = req.params.commentId

    if (!commentId || !reply) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }

    const newReply = new Reply({
      content: reply,
      userId,
      commentId,
    });
    await newReply.save();
    return res.status(200).json({
      message: "New reply is created successfully ",
    });
  } catch (error) {
    logger.error(error);
    return res.status(500).json({
      error: error.message,
      message: "Something went wrong",
    });
  }
};

//get reply
export const handleGetReply=async(req,res)=>{
  try {
    const commentId = req.params.commentId;
    if (!commentId) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }

    //check if the comment exist or not
    const comment = await Comment.findOne({ _id: commentId});
    if (!comment) {
      return res.status(404).json({
        message: "Comment not found",
      });
    }

    const reply=await Reply.find({commentId}).populate({
      path: "userId",
      select: ["email", "name"],
    })
    return res.status(200).json({
      replies:reply
    });

  } catch (error) {
    
  }

}
