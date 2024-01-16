const router = require("express").Router();
const { variationsValidation } = require("../validation/variationsValidation");
const filesPayloadExists = require("../middleware/filesPayloadExists");
const fileExtLimiter = require("../middleware/fileExtLimiter");
const fileSizeLimiter = require("../middleware/fileSizeLimiter");
const permissions = require("../middleware/permissions");
const verifyToken = require("../middleware/verifyToken");
const userRoles = require("../utils/userRoles");
const fileUpload = require("express-fileupload");
const {
  createVariation,
  updateVariation,
  deleteVariation,
  getVariation,
} = require("../controllers/variations");
router.get("/:id", getVariation);
router.post(
  "/",
  verifyToken,
  permissions(userRoles.ADMIN),
  fileUpload({ createParentPath: true }),
  filesPayloadExists,
  //fileExtLimiter([".png", ".jpg", ".jpeg"]),
  fileSizeLimiter,
  variationsValidation(),
  createVariation
);
router.put(
  "/:id",
  verifyToken,
  permissions(userRoles.ADMIN),
  fileUpload({ createParentPath: true }),
  filesPayloadExists,
  // fileExtLimiter([".png", ".jpg", ".jpeg"]),
  fileSizeLimiter,
  variationsValidation(),
  updateVariation
);
router.delete("/:id", deleteVariation);

module.exports = router;
