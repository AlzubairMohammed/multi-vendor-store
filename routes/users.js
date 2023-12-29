const { registerValidation } = require("../validation/registerValidation");
const router = require("express").Router();
const {
  getUsers,
  register,
  updateUser,
  deleteUser,
} = require("../controllers/users");

router.get("/", getUsers);
router.post("/register", registerValidation(), register);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
