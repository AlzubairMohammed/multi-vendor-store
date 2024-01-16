const router = require("express").Router();
const filesPayloadExists = require("../middleware/filesPayloadExists");
const fileExtLimiter = require("../middleware/fileExtLimiter");
const fileSizeLimiter = require("../middleware/fileSizeLimiter");
const permissions = require("../middleware/permissions");
const verifyToken = require("../middleware/verifyToken");
const userRoles = require("../utils/userRoles");
const fileUpload = require("express-fileupload");
const { productsValidation } = require("../validation/productsValidation");
const {
  getProducts,
  getProduct,
  createProduct,
  updateProdcut,
  deleteProduct,
} = require("../controllers/products");

router
  .get("/", getProducts)
  .post(
    "/",
    verifyToken,
    permissions(userRoles.ADMIN),
    productsValidation(),
    createProduct
  )
  .get("/:id", getProduct)
  .put("/:id", verifyToken, permissions(userRoles.ADMIN), updateProdcut)
  .delete("/:id", deleteProduct);

module.exports = router;
