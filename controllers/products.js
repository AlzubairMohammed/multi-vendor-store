const Product= require('../models/Product');

exports.getProducts = (req, res)=>{
    Product.findAll({
        include:['images']
    })
    .then((result) => {
        res.json(result)
    }).catch((err) => {
        console.log(err);
    });
}

exports.getProduct = (req, res)=>{
    res.json({msg:`this product ${req.params.id}`});
}

exports.createProdut = (req, res)=>{
    res.json({msg:`product created`});
}

exports.updateProdcut = (req, res)=>{
    console.log(req);
    res.json({msg:`product ${req.params.id} updated`});
}

exports.deleteProduct = (req, res)=>{
    res.json({msg:`product ${req.params.id} deleted`});
}