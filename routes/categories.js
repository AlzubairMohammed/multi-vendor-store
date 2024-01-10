const router = require("express").Router();
const { categoriesValidation } = require("../validation/categoriesValidation");
const {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategory,
} = require("../controllers/categories");
const filesPayloadExists = require("../middleware/filesPayloadExists");
const fileExtLimiter = require("../middleware/fileExtLimiter");
const fileSizeLimiter = require("../middleware/fileSizeLimiter");
const fileUpload = require("express-fileupload");

router.get("/", getCategories);
router.get("/:id", getCategory);
router.post(
  "/",
  fileUpload({ createParentPath: true }),
  filesPayloadExists,
  fileExtLimiter([".png", ".jpg", ".jpeg"]),
  fileSizeLimiter,
  categoriesValidation(),
  createCategory
);
router.put(
  "/:id",
  fileUpload({ createParentPath: true }),
  filesPayloadExists,
  fileExtLimiter([".png", ".jpg", ".jpeg"]),
  fileSizeLimiter,
  categoriesValidation(),
  updateCategory
);
router.delete("/:id", deleteCategory);

module.exports = router;
