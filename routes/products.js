const router = require("express").Router();
const filesPayloadExists = require("../middleware/filesPayloadExists");
const fileExtLimiter = require("../middleware/fileExtLimiter");
const fileSizeLimiter = require("../middleware/fileSizeLimiter");
const fileUpload = require("express-fileupload");
const { productsValidation } = require("../validation/productsValidation");
const {
  getProducts,
  getProduct,
  createProdut,
  updateProdcut,
  deleteProduct,
} = require("../controllers/products");

router
  .get("/", getProducts)
  .post(
    "/",
    // fileUpload({ createParentPath: true }),
    // filesPayloadExists,
    // fileExtLimiter(['.png', '.jpg', '.jpeg']),
    // fileSizeLimiter,
    productsValidation(),
    createProdut
  )
  .get("/:id", getProduct)
  .put(
    "/:id",
    fileUpload({ createParentPath: true }),
    filesPayloadExists,
    fileExtLimiter([".png", ".jpg", ".jpeg"]),
    fileSizeLimiter,
    updateProdcut
  )
  .delete("/:id", deleteProduct);

module.exports = router;
