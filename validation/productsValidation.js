const { body } = require("express-validator");

exports.productsValidation = () => {
  return [
    body("name")
      .notEmpty()
      .withMessage("name is required")
      .isLength({ min: 2 })
      .withMessage("name at least is 2 digits"),
    body("base_price").notEmpty().withMessage("base_price is required"),
    body("user_id").notEmpty().withMessage("you must to send user_id"),
    body("sub_category_id").notEmpty().withMessage("category is required"),
  ];
};
