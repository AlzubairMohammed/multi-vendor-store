const fileExtLimiter = require("../middleware/fileExtLimiter");
const fileSizeLimiter = require("../middleware/fileSizeLimiter");
const fileUpload = require("express-fileupload");
const {
  registerValidation,
  loginValidation,
} = require("../validation/authValidation");
const router = require("express").Router();
const {
  getUsers,
  getVendors,
  register,
  editUser,
  deleteUser,
  getVendor,
  login,
} = require("../controllers/users");
router
  .get("/", getUsers)
  .get("/vendors", getVendors)
  .get("/vendors/:id", getVendor)
  .post(
    "/register",
    fileUpload({ createParentPath: true }),
    fileExtLimiter([".png", ".jpg", ".jpeg"]),
    fileSizeLimiter,
    registerValidation(),
    register
  )
  .post("/login", loginValidation(), login)
  .put("/:id", editUser)
  .delete("/:id", deleteUser);

module.exports = router;
