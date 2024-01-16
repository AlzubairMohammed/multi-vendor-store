const { body } = require("express-validator");

exports.variationsValidation = () => {
  return [
    body("value").notEmpty().withMessage("value is required"),
    body("attribute_id").notEmpty().withMessage("attribute_id is required"),
    body("product_id").notEmpty().withMessage("product_id is required"),
  ];
};
