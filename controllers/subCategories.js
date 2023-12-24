const { SubCategory } = require("../models");
const path = require("path");
const fs = require("fs");
let fileName;
const { validationResult } = require("express-validator");
const x = require("express-validator");
const ErrorResponse = require("../utils/errorResponse");
const asyncWrapper = require("../middleware/asyncWrapper");
const httpStatus = require("../utils/httpStatus");

exports.getSubCategories = (req, res) => {
  SubCategory.findAll({
    include: ["product"],
  })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getSubCategory = asyncWrapper(async (req, res) => {
  const id = req.params.id;
  const subCategory = await SubCategory.findOne({ where: { id } });
  console.log(subCategory);
  subCategory
    ? res.status(200).json(subCategory)
    : res.status(404).json({ msg: "subcategory not found" });
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
  const data = await SubCategory.create(req.body);
  return res.json({ status: httpStatus.SUCCESS, data: data });
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
