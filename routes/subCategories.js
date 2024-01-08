const router = require("express").Router();
const filesPayloadExists = require("../middleware/filesPayloadExists");
const fileExtLimiter = require("../middleware/fileExtLimiter");
const fileSizeLimiter = require("../middleware/fileSizeLimiter");
const fileUpload = require("express-fileupload");
const {
  getSubCategories,
  getSubCategory,
  createSubCategory,
  updateSubCategory,
  deleteSubCategory,
} = require("../controllers/subCategories");
const {
  subCategoryValidation,
} = require("../validation/subCategoryValidation");

router.get("/", getSubCategories);
router.get("/:id", getSubCategory);
router.post(
  "/",
  fileUpload({ createParentPath: true }),
  filesPayloadExists,
  fileExtLimiter([".png", ".jpg", ".jpeg"]),
  fileSizeLimiter,
  subCategoryValidation(),
  createSubCategory
);
router.put(
  "/:id",
  fileUpload({ createParentPath: true }),
  filesPayloadExists,
  fileExtLimiter([".png", ".jpg", ".jpeg"]),
  fileSizeLimiter,
  subCategoryValidation(),
  updateSubCategory
);
router.delete("/:id", deleteSubCategory);

module.exports = router;
