const { body } = require("express-validator");

exports.subCategoryValidation = () => {
  return [body("name").notEmpty().withMessage("name is required")];
};
