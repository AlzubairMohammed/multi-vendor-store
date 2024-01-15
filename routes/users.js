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
router.get("/", getUsers);
router.post(
  "/register",
  fileUpload({ createParentPath: true }),
  fileExtLimiter([".png", ".jpg", ".jpeg"]),
  fileSizeLimiter,
  registerValidation(),
  register
);
router.post("/login", loginValidation(), login);
router.put("/editUser/:id", registerValidation(), editUser);
router.delete("/deleteUser/:id", deleteUser);

module.exports = router;
