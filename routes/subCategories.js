const router = require('express').Router();
const {getSubCategories, getSubCategory, createSubCategory, updateSubCategory, deleteSubCategory} = require('../controllers/subCategories');


router.get('/', getSubCategories);
router.get('/:id', getSubCategory);
router.post('/', createSubCategory);
router.put('/:id', updateSubCategory);
router.delete('/:id', deleteSubCategory);


module.exports = router;