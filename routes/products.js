const router = require('express').Router();
const {getProducts, getProduct, createProdut, updateProdcut, deleteProduct} = require('../controllers/products');

router
.get('/', getProducts)
.post('/', createProdut)
.get('/:id', getProduct)
.put('/:id', updateProdcut)
.delete('/:id', deleteProduct);


module.exports = router;