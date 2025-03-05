const asyncHandler = require("express-async-handler");
const Category = require("../models/categoryModel");

/*
@desc Get all categories
@route GET /api/v1/categories
@access Public
 */
exports.getCategories = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit || 10;
  const skip = (page - 1) * limit;
  const categories = await Category.find({}).skip(skip).limit(limit);
  res.status(200).json({ results: categories.length, page, categories });
});

/*
@desc Get single category
@route GET /api/v1/categories/:id
@access Public
 */
exports.getCategoryById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const category = await Category.findById(id);
  if (!category) {
    res.status(404).json({ message: "Category not found" });
  }
  res.status(200).json({ data: category });
});

/*
@desc Create a new category
@route POST /api/v1/categories
@access Private
 */
exports.createCategory = asyncHandler(async (req, res) => {
  const name_ar = req.body.name_ar;
  const name_en = req.body.name_en;
  const category = await Category.create({
    name_ar,
    name_en,
    slug_ar: name_ar.toLowerCase().replace(/ /g, "-"),
    slug_en: name_en.toLowerCase().replace(/ /g, "-"),
  });
  res.status(201).json(category);
});

/*
@desc Update category
@route PUT /api/v1/categories/:id
@access Private
 */
exports.updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name_ar, name_en } = req.body;
  const body = {
    name_ar,
    name_en,
    slug_ar: name_ar.toLowerCase().replace(/ /g, "-"),
    slug_en: name_en.toLowerCase().replace(/ /g, "-"),
  };
  const category = await Category.findByIdAndUpdate({ _id: id }, body, {
    new: true,
  });
  if (!category) {
    res.status(404).json({ message: "Category not found" });
  }
  res.status(200).json({ category });
});

/*
@desc Delete category
@route DELETE /api/v1/categories/:id
@access Private
 */

exports.deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const category = await Category.findByIdAndDelete(id);
  if (!category) {
    res.status(404).json({ message: "Category not found" });
  }
  res.status(204).json({ message: "Category deleted successfully" });
});
