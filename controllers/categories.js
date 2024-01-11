const { Category } = require("../models");
const ErrorResponse = require("../utils/errorResponse");
const fs = require("fs");
const path = require("path");
const asyncWrapper = require("../middleware/asyncWrapper");
const httpStatus = require("../utils/httpStatus");
const errorResponse = require("../utils/errorResponse");
const { validationResult } = require("express-validator");

// Get all catergories
exports.getCategories = asyncWrapper(async (req, res) => {
  const data = await Category.findAll({
    include: ["SubCategories"],
  });
  res.json({ status: httpStatus.SUCCESS, data });
});
// Get single category
exports.getCategory = async (req, res, next) => {
  const id = req.params.id;
  const catgory = await Category.findOne({
    where: { id },
    include: ["sub_sections"],
  });
  catgory
    ? res.status(200).json(catgory)
    : res.status(404).json({ msg: "category not found" });
};
// Create category
exports.createCategory = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = errorResponse.create(errors.array(), 400, httpStatus.FAIL);
    return next(error);
  }
  const { files } = req;
  let fileName = "";
  Object.keys(files).forEach((key) => {
    fileName = Date.now() + files[key].name + "";
    const filepath = path.join(__dirname, "../uploads", fileName);
    files[key].mv(filepath, (err) => {
      if (err) return res.status(500).json({ status: "error", message: err });
    });
  });
  req.body.image = fileName;
  const data = await Category.create(req.body);
  return res.json({ status: httpStatus.SUCCESS, data });
};
// Update category
exports.updateCategory = async (req, res, next) => {
  const id = req.params.id;
  const { name } = req.body;
  const { files } = req;
  let fileName = "";
  let category = await Category.findOne({ where: { id } });
  if (category)
    Object.keys(files).forEach((key) => {
      fileName = Date.now() + files[key].name + "";
      const filepath = path.join(__dirname, "../uploads", fileName);
      files[key].mv(filepath, (err) => {
        if (err) return res.status(500).json({ status: "error", message: err });
      });
    });
  try {
    // Delete old image form uploads directory
    fs.unlinkSync(path.join(__dirname, `../uploads/${category.image}`));
  } catch (err) {
    return next(new ErrorResponse("old image not found", 404));
  }
  Category.update({ name, image: fileName }, { where: { id } });
  res.status(200).json({ msg: `category updated` });
};
// Delete category
exports.deleteCategory = async (req, res, next) => {
  const id = req.params.id;
  let category = await Category.findOne({ where: { id } });
  if (category) Category.destroy({ where: { id } });
  try {
    // Delete old image form uploads directory
    fs.unlinkSync(path.join(__dirname, `../uploads/${category.image}`));
  } catch (err) {
    return next(new ErrorResponse("old image not found", 404));
  }
  res.status(200).json({ msg: `category deleted` });
};
