const { body } = require("express-validator");

exports.registerValidation = () => {
  return [
    body("name")
      .notEmpty()
      .withMessage("name is required")
      .isLength({ min: 3 })
      .withMessage("name at least is 3 digits"),
    body("password")
      .notEmpty()
      .withMessage("password is required")
      .isLength({ min: 4 })
      .withMessage("password at least 4 digits"),
    body("email").notEmpty().withMessage("email is required"),
    body("tel")
      .notEmpty()
      .withMessage("tel is required")
      .isLength({ min: 10 })
      .withMessage("phone number can't be less than 10"),
  ];
};
exports.loginValidation = () => {
  return [
    body("email").notEmpty().withMessage("you must to send email"),
    body("password")
      .notEmpty()
      .withMessage("you must to send password")
      .isLength({ min: 4 })
      .withMessage("password at least 4 digits"),
  ];
};
