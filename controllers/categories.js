const { Category } = require('../models');
const ErrorResponse = require('../utils/errorResponse')
const path = require("path");
// Get all catergories
exports.getCategories = (req, res) =>
    Category.findAll({
        include: ['sub_sections']
    })
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
        });
// Get single category
exports.getCategory = async (req, res) => {
    const id = req.params.id;
    const catgory = await Category.findOne({ where: { id }, include: ['sub_sections'] });
    res.status(200).json(catgory);
}
// create category
exports.createCategory = async (req, res) => {
    console.log(req);
    const { files } = req
    const { name } = req.body;
    let fileName = '';
    Object.keys(files).forEach(key => {
        fileName = Date.now() + files[key].name + '';
        const filepath = path.join(__dirname, '../uploads', fileName)
        files[key].mv(filepath, (err) => {
            if (err) return res.status(500).json({ status: "error", message: err })
        })
    })
    const image = Category.create({
        name,
        image: fileName
    })
    return res.json({ status: 'success', message: Object.keys(files).toString() + ' and product created' })
}
// Update category
exports.updateCategory = async (req, res) => {
    const id = req.params.id;
    const { name } = req.body;
    const  {files}  = req;
    console.log( req);
    let fileName = '';
    let category = await Category.findOne({ where: { id } });
    category ? (
        Object.keys(files).forEach(key => {
            fileName = Date.now() + files[key].name + '';
            const filepath = path.join(__dirname, '../uploads', fileName)
            files[key].mv(filepath, (err) => {
                if (err) return res.status(500).json({ status: "error", message: err })
            })
        }),
        Category.update(
            { name, image:fileName },
            { where: { id } }
        )
    ) : res.status(404);
    res.status(200).json({ msg: `category ${category.name} updated` });
}
// Delete category
exports.deleteCategory = (req, res) => {
    res.status(200).json({ msg: `category ${req.params.id} deleted` });
}