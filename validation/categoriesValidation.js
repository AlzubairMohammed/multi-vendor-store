const { body } = require("express-validator");

exports.categoriesValidation = () => {
  return [body("name").notEmpty().withMessage("name is required")];
};
