const { Category } = require("../models");
const ErrorResponse = require("../utils/errorResponse");
const fs = require("fs");
const path = require("path");
const asyncWrapper = require("../middleware/asyncWrapper");
const httpStatus = require("../utils/httpStatus");
const errorResponse = require("../utils/errorResponse");
const { validationResult } = require("express-validator");

exports.getCategories = asyncWrapper(async (req, res) => {
  const data = await Category.findAll({
    include: ["SubCategories"],
  });
  res.json({ status: httpStatus.SUCCESS, data });
});

exports.getCategory = asyncWrapper(async (req, res, next) => {
  const id = req.params.id;
  const data = await Category.findOne({
    where: { id },
    include: ["SubCategories"],
  });
  if (!data) {
    const error = ErrorResponse.create(
      `Category with id = ${id} is not found`,
      404,
      httpStatus.FAIL
    );
    return next(error);
  }
  return res.json({ status: httpStatus.SUCCESS, data });
});

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

exports.updateCategory = asyncWrapper(async (req, res, next) => {
  const errors = validationResult(req);
  const id = req.params.id;
  const { files } = req;
  if (!errors.isEmpty()) {
    const error = ErrorResponse.create(errors.array(), 400, httpStatus.FAIL);
    return next(error);
  }
  Object.keys(files).forEach((key) => {
    fileName = Date.now() + files[key].name + "";
    const filepath = path.join(__dirname, "../uploads", fileName);
    files[key].mv(filepath, (err) => {
      if (err) {
        const error = ErrorResponse.create(err, 400, httpStatus.FAIL);
        return next(error);
      }
    });
  });
  req.body.image = fileName;
  const [data] = await Category.update(req.body, {
    where: { id },
  });
  if (!data) {
    const error = ErrorResponse.create(
      `Category with id = ${id} is not found`,
      404,
      httpStatus.FAIL
    );
    return next(error);
  }
  res.json({ status: httpStatus.SUCCESS, data: "Category updated" });
});

exports.deleteCategory = asyncWrapper(async (req, res, next) => {
  const id = req.params.id;
  const data = await Category.destroy({ where: { id } });
  if (!data) {
    const error = ErrorResponse.create(
      `Category with id = ${id} is not found`,
      404,
      httpStatus.FAIL
    );
    return next(error);
  }
  return res.json({ status: httpStatus.SUCCESS, data: "Category deleted" });
});
