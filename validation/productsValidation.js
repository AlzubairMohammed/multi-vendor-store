const { body } = require("express-validator");

exports.productsValidation = () => {
  return [
    body("name")
      .notEmpty()
      .withMessage("name is required")
      .isLength({ min: 2 })
      .withMessage("name at least is 2 digits"),
    body("price").notEmpty().withMessage("price is required"),
    body("qty").notEmpty().withMessage("qty is required"),
    body("user_id").notEmpty().withMessage("you must to send user_id"),
    body("sub_category_id").notEmpty().withMessage("category is required"),
  ];
};
