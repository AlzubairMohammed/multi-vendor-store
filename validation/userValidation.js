const { body } = require("express-validator");

exports.userValidation = () => {
  return [
    body("name")
      .notEmpty()
      .withMessage("Name cannot be empty")
      .isString()
      .withMessage("Name must be a string"),
    body("password")
      .notEmpty()
      .withMessage("Password cannot be empty")
      .isString()
      .withMessage("Password must be a string")
      .isLength({ min: 4 })
      .withMessage("name at least is 4 digits"),
    ,
    body("email")
      .notEmpty()
      .withMessage("Email cannot be empty")
      .isEmail()
      .withMessage("Invalid email format"),
    body("phone")
      .notEmpty()
      .withMessage("Phone cannot be empty")
      .isString()
      .withMessage("Phone must be a string"),
    body("token").optional().isString().withMessage("Token must be a string"),
    body("role")
      .notEmpty()
      .withMessage("Role cannot be empty")
      .isString()
      .withMessage("Role must be a string"),
    body("image").optional().isString().withMessage("Image must be a string"),
  ];
};
