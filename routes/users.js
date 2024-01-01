const {
  registerValidation,
  loginValidation,
} = require("../validation/authValidation");
const router = require("express").Router();
const {
  getUsers,
  register,
  updateUser,
  deleteUser,
  login,
} = require("../controllers/users");

router.get("/", getUsers);
router.post("/register", registerValidation(), register);
router.post("/login", loginValidation(), login);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
