const { body } = require("express-validator");

exports.attributesValidation = () => {
  return [body("name").notEmpty().withMessage("name is required")];
};
