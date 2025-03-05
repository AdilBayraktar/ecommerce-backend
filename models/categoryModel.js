const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name_ar: {
      type: String,
      trim: true,
      minLingth: [3, "Category name must be at least 3 characters long"],
      required: [true, "Please enter the Arabic name of the category"],
      maxlength: [100, "Category name must be less than 100 characters"],
      unique: [true, "This category already exists"],
    },
    name_en: {
      type: String,
      trim: true,
      minLingth: [3, "Category name must be at least 3 characters long"],
      maxlength: [100, "Category name must be less than 100 characters"],
      unique: [true, "This category already exists"],
    },
    slug_ar: {
      type: String,
      lowercase: true,
    },

    slug_en: {
      type: String,
      lowercase: true,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

const CategoryModel = mongoose.model("Category", categorySchema);
module.exports = CategoryModel;
