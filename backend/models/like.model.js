import mongoose from "mongoose";

const likSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    blogId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
    },
  },
  {
    timestamps: true,
  }
);

const Like= mongoose.models.Like || mongoose.model("Like", likSchema);

export default Like;
