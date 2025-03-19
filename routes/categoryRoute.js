const express = require("express");
const {
  getCategories,
  createCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require("../services/categoryService");
const {
  categoryIdValidator,
  createCategoryValidator,
} = require("../utils/validators/categoryValidator");
const router = express.Router();

router.get("/", getCategories);
router.get("/:id", categoryIdValidator, getCategoryById);
router.put("/:id", categoryIdValidator, updateCategory);
router.delete("/:id", categoryIdValidator, deleteCategory);
router.post("/", createCategoryValidator, createCategory);

module.exports = router;
