const { body } = require("express-validator");

exports.registerValidation = () => {
  return [
    body("name")
      .notEmpty()
      .withMessage("name is required")
      .isLength({ min: 3 })
      .withMessage("name at least is 3 digits"),
    body("passowrd")
      .notEmpty()
      .withMessage("passowrd is required")
      .isLength({ min: 4 })
      .withMessage("passowrd at least is 4 digits"),
    body("email").notEmpty().withMessage("email is required"),
    body("tel")
      .notEmpty()
      .withMessage("tel is required")
      .isLength({ min: 10 })
      .withMessage("phone number can't be less than 10"),
  ];
};
