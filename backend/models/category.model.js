import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Category =mongoose.models.Category || mongoose.model("Category", categorySchema);

export default Category;
