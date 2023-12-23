const { Product, Image } = require("../models");
const path = require("path");
const fs = require("fs");
const ErrorResponse = require("../utils/errorResponse");
const asyncWrapper = require("../middleware/asyncWrapper");
const httpStatus = require("../utils/httpStatus");
let fileName;
// get all products function
exports.getProducts = (req, res) => {
  console.log(Product);
  const data = Product.findAll({
    include: ["images"],
  })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
  res.json(data);
};
// get single product function
exports.getProduct = async (req, res) => {
  const id = req.params.id;
  const product = await Product.findOne({ where: { id }, include: ["images"] })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
    });
};
// create product funtion
exports.createProdut = asyncWrapper(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = appError.create(errors.array(), 400, httpStatus.FAIL);
    return next(error);
  }
});
// update product function
exports.updateProdcut = async (req, res, next) => {
  const id = req.params.id;
  const { files } = req;
  let undefinedError = {};
  const { name, price, qty, user_id, sub_section_id } = req.body;
  console.log(req.body);
  if (!name)
    (undefinedError.err = true), (undefinedError.name = "you must to add name");
  if (!price)
    (undefinedError.err = true),
      (undefinedError.price = "you must to add price");
  if (!qty)
    (undefinedError.err = true),
      (undefinedError.qty = "you must to add quntity");
  if (!user_id)
    (undefinedError.err = true),
      (undefinedError.user_id = "you must to select subcategory");
  if (!sub_section_id)
    (undefinedError.err = true),
      (undefinedError.sub_section_id = "you must to add quntity");
  if (undefinedError.err) return res.status(404).json(undefinedError);
  const product = await Product.update(
    {
      name,
      price,
      qty,
      user_id,
      sub_section_id,
    },
    { where: { id } }
  );
  if (product) {
    const newImage = await Image.findOne({
      where: { product_id: id },
    });
    // Delete old image form uploads directory
    fs.unlinkSync(path.join(__dirname, `../uploads/${newImage.image}`));
    Object.keys(files).forEach((key) => {
      fileName = Date.now() + files[key].name + "";
      const filepath = path.join(__dirname, "../uploads", fileName);
      files[key].mv(filepath, (err) => {
        if (err) return res.status(500).json({ status: "error", message: err });
      });
    });

    const image = await Image.update(
      {
        name,
        image: fileName,
      },
      { where: { product_id: id } }
    );
  }
  res.status(200).json("updated");
};
// delete product function
exports.deleteProduct = async (req, res, next) => {
  const id = req.params.id;
  const newImage = await Image.findOne({
    where: { product_id: id },
  });
  // Delete old image form uploads directory
  fs.unlinkSync(path.join(__dirname, `../uploads/${newImage.image}`));
  Object.keys(files).forEach((key) => {
    fileName = Date.now() + files[key].name + "";
    const filepath = path.join(__dirname, "../uploads", fileName);
    files[key].mv(filepath, (err) => {
      if (err) return res.status(500).json({ status: "error", message: err });
    });
  });
  const image = Image.destroy({
    where: { product_id: id },
  });
  const product = await Product.destroy({
    where: { id },
  });
  if (product && image) {
    res.json({ msg: `product deleted` });
  } else {
    return next(new ErrorResponse());
  }
};
