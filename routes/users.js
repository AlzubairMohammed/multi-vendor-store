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
  updateUser,
  deleteUser,
  login,
} = require("../controllers/users");
router.get("/", getUsers);
router.get("/vendors", getVendors);
router.post(
  "/register",
  fileUpload({ createParentPath: true }),
  fileExtLimiter([".png", ".jpg", ".jpeg"]),
  fileSizeLimiter,
  registerValidation(),
  register
);
router.post("/login", loginValidation(), login);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
