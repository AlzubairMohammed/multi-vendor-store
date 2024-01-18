const { SubCategory, Product } = require("../models");
const path = require("path");
const fs = require("fs");
let fileName;
const { validationResult } = require("express-validator");
const x = require("express-validator");
const ErrorResponse = require("../utils/errorResponse");
const asyncWrapper = require("../middleware/asyncWrapper");
const httpStatus = require("../utils/httpStatus");
//add pagination
exports.getSubCategories = asyncWrapper(async (req, res, next) => {
  let { limit, page } = req.query;
  limit = +limit || 10;
  page = +page || 1;
  const offset = (page - 1) * limit;
  const data = await SubCategory.findAll({
    include: { model: Product, limit, offset },
    attributes: {
      exclude: ["product_id"],
    },
    limit,
    offset,
  });
  return res.json({ status: httpStatus.SUCCESS, data });
});

exports.getSubCategory = asyncWrapper(async (req, res, next) => {
  const id = req.params.id;
  let { limit, page } = req.query;
  limit = +limit || 10;
  page = +page || 1;
  const offset = (page - 1) * limit;
  const data = await SubCategory.findOne({
    where: { id },
    include: { model: Product, limit, offset },
  });
  if (!data) {
    const error = ErrorResponse.create(
      `subcategory with id = ${id} is not found`,
      404,
      httpStatus.FAIL
    );
    return next(error);
  }
  return res.json({ status: httpStatus.SUCCESS, data });
});

exports.createSubCategory = asyncWrapper(async (req, res, next) => {
  const errors = validationResult(req);
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
  const data = await SubCategory.create(req.body);
  return res.json({ status: httpStatus.SUCCESS, data });
});

exports.updateSubCategory = asyncWrapper(async (req, res, next) => {
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
  const [data] = await SubCategory.update(req.body, {
    where: { id },
  });
  if (!data) {
    const error = ErrorResponse.create(
      `subcategory with id = ${id} is not found`,
      404,
      httpStatus.FAIL
    );
    return next(error);
  }
  res.json({ status: httpStatus.SUCCESS, data: "subcategory updated" });
});

exports.deleteSubCategory = asyncWrapper(async (req, res, next) => {
  const id = req.params.id;
  const data = await SubCategory.destroy({ where: { id } });
  if (!data) {
    const error = ErrorResponse.create(
      `subcategory with id = ${id} is not found`,
      404,
      httpStatus.FAIL
    );
    return next(error);
  }
  return res.json({ status: httpStatus.SUCCESS, data: "subcategory deleted" });
});
