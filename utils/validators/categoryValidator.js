const { check } = require("express-validator");
const {
  validationMiddleware,
} = require("../../middlewares/validatorMiddleware");

exports.categoryIdValidator = [
  check("id").isMongoId().withMessage("Invalid Category Id"),
  validationMiddleware,
];

exports.createCategoryValidator = [
  check("name_ar")
    .notEmpty()
    .withMessage("Arabic Name is required")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters")
    .isLength({ max: 100 })
    .withMessage("Name must be at most 100 characters"),
  check("name_en")
    .notEmpty()
    .withMessage("English Name is required")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters")
    .isLength({ max: 100 })
    .withMessage("Name must be at most 100 characters"),
  validationMiddleware,
];
