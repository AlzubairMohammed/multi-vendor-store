const SubCategory = require('../models/SubCategory');

exports.getSubCategories = (req, res)=>{
    SubCategory.findAll({
        include:['product']
    })
    .then((result) => {
        res.json(result)
    }).catch((err) => {
        console.log(err);
    });
}

exports.getSubCategory = (req, res)=>{
    res.json({msg:`this ${req.params.id} subCategory`});
}

exports.createSubCategory = (req, res)=>{
    const {name, image, sections_id} = req.body;
    const x = SubCategory.create({
        name,
        image,
        sections_id
    });
    res.send(x)
}

exports.updateSubCategory = (req, res)=>{
    res.json({msg:`subCategory ${req.params.id} updated`});
}

exports.deleteSubCategory = (req, res)=>{
    res.json({msg:`subCategory ${req.params.id} deleted`});
}