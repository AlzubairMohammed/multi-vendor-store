const { SubCategory } = require("../models");
const path = require("path");
const fs = require("fs");
let fileName;
const { validationResult } = require("express-validator");
const x = require("express-validator");
const ErrorResponse = require("../utils/errorResponse");
const asyncWrapper = require("../middleware/asyncWrapper");
const httpStatus = require("../utils/httpStatus");

exports.getSubCategories = asyncWrapper(async (req, res, next) => {
  const data = await SubCategory.findAll();
  return res.json({ status: httpStatus.SUCCESS, data });
});

exports.getSubCategory = asyncWrapper(async (req, res, next) => {
  const id = req.params.id;
  const data = await SubCategory.findOne({ where: { id } });
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

exports.updateSubCategory = (req, res) => {
  const { name, sections_id } = req.body;
  const files = req;
  const id = req.params.id;
  const undefinedError = {};
  if (!name)
    (undefinedError.err = true), (undefinedError.name = "you must to add name");
  if (!files)
    (undefinedError.err = true),
      (undefinedError.name = "you must to add image");
  if (!sections_id)
    (undefinedError.err = true),
      (undefinedError.name = "you must to add section");
  if (undefinedError.err) return res.status(404).json(undefinedError);
  SubCategory.update(
    {
      name,
      image,
      sections_id,
    },
    {
      where: { id },
    }
  );
  res.json({ success: true, msg: `subCategory updated` });
};

exports.deleteSubCategory = (req, res) => {
  res.json({ msg: `subCategory ${req.params.id} deleted` });
};
