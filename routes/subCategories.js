const router = require('express').Router();
const filesPayloadExists = require('../middleware/filesPayloadExists');
const fileExtLimiter = require('../middleware/fileExtLimiter');
const fileSizeLimiter = require('../middleware/fileSizeLimiter');
const fileUpload = require("express-fileupload");
const { getSubCategories, getSubCategory, createSubCategory, updateSubCategory, deleteSubCategory } = require('../controllers/subCategories');


router.get('/', getSubCategories);
router.get('/:id', getSubCategory);
router.post('/',
    fileUpload({ createParentPath: true }),
    filesPayloadExists,
    fileExtLimiter(['.png', '.jpg', '.jpeg']),
    fileSizeLimiter,
    createSubCategory);
router.put('/:id',
    fileUpload({ createParentPath: true }),
    filesPayloadExists,
    fileExtLimiter(['.png', '.jpg', '.jpeg']),
    fileSizeLimiter,
    updateSubCategory);
router.delete('/:id', deleteSubCategory);


module.exports = router;