const { Product, Image, ProductVariation } = require("../models");
const path = require("path");
const fs = require("fs");
const ErrorResponse = require("../utils/errorResponse");
const asyncWrapper = require("../middleware/asyncWrapper");
const httpStatus = require("../utils/httpStatus");
const { validationResult } = require("express-validator");
let fileName;
exports.getProducts = asyncWrapper(async (req, res) => {
  const data = await Product.findAll({
    include: ["Images", "ProductVariations"],
    attributes: {
      exclude: ["product_id", "user_id"],
    },
  });
  return res.json({ status: httpStatus.SUCCESS, data });
});

exports.getProduct = asyncWrapper(async (req, res, next) => {
  const id = req.params.id;
  const data = await Product.findOne({
    where: { id },
    attributes: {
      exclude: ["product_id", "user_id"],
    },
    include: ["ProductVariations", "Images"],
  });
  if (!data) {
    const error = ErrorResponse.create(
      "product not found",
      404,
      httpStatus.FAIL
    );
    next(error);
  }
  return res.json({ status: httpStatus.SUCCESS, data });
});

exports.createProduct = asyncWrapper(async (req, res, next) => {
  // return res.json(req.files);
  let imageDate = {};
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = ErrorResponse.create(errors.array(), 400, httpStatus.FAIL);
    return next(error);
  }
  const { images } = req.files;
  let fileName = "";
  const {
    name,
    base_price,
    size,
    color,
    material,
    stock_quantity,
    stock_code,
    price,
  } = req.body;
  console.log(name);
  const data = await Product.create({ base_price, name });

  if (Array.isArray(images)) {
    images.map(async (image) => {
      console.log("fromxxx");
      fileName = Date.now() + image.name + "";
      const filepath = path.join(__dirname, "../uploads/products", fileName);
      image.mv(filepath, (err) => {
        if (err) {
          const error = ErrorResponse.create(err, 500, httpStatus.FAIL);
          return next(error);
        }
      });
      imageDate = await Image.create({
        image: fileName,
        product_id: data.id,
      });
    });
  } else {
    fileName = Date.now() + images.name + "";
    const filepath = path.join(__dirname, "../uploads/products", fileName);
    images.mv(filepath, (err) => {
      if (err) {
        const error = ErrorResponse.create(err, 500, httpStatus.FAIL);
        return next(error);
      }
    });
    imageDate = await Image.create({
      image: fileName,
      product_id: data.id,
    });
  }

  const productVariations = await ProductVariation.create({
    size,
    color,
    material,
    stock_quantity,
    stock_code,
    price,
    product_id: data.id,
  });
  data.ProductVariations = productVariations;
  if ((data && imageDate, productVariations)) {
    return res.json({ status: httpStatus.SUCCESS, data });
  }
});

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

exports.deleteProduct = asyncWrapper(async (req, res, next) => {
  const id = req.params.id;
  const { image } = await Image.findOne({
    where: { product_id: id },
  });
  // Delete old image form uploads directory
  fs.unlinkSync(path.join(__dirname, `../uploads/${image}`));
  Object.keys(files).forEach((key) => {
    fileName = Date.now() + files[key].name + "";
    const filepath = path.join(__dirname, "../uploads", fileName);
    files[key].mv(filepath, (err) => {
      if (err) {
        const error = ErrorResponse.create(err, 500, httpStatus.FAIL);
        next(error);
      }
    });
  });
  const imageData = Image.destroy({
    where: { product_id: id },
  });
  const product = await Product.destroy({
    where: { id },
  });
  if (product && image) {
    res.json({ status: httpStatus.SUCCESS, data: `product deleted` });
  }
});
