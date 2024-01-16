const router = require("express").Router();
const { attributesValidation } = require("../validation/attributesValidation");
const {
  getAttributes,
  createAttribute,
  updateAttribute,
  deleteAttribute,
  getAttribute,
} = require("../controllers/attributes");

router.get("/", getAttributes);
router.get("/:id", getAttribute);
router.post("/", attributesValidation(), createAttribute);
router.put("/:id", attributesValidation(), updateAttribute);
router.delete("/:id", deleteAttribute);

module.exports = router;
