const { Attribute } = require("../models");
const ErrorResponse = require("../utils/errorResponse");
const asyncWrapper = require("../middleware/asyncWrapper");
const httpStatus = require("../utils/httpStatus");
const errorResponse = require("../utils/errorResponse");
const { validationResult } = require("express-validator");

exports.getAttributes = asyncWrapper(async (req, res) => {
  const data = await Attribute.findAll();
  res.json({ status: httpStatus.SUCCESS, data });
});

exports.getAttribute = asyncWrapper(async (req, res, next) => {
  const id = req.params.id;
  const data = await Attribute.findOne({
    where: { id },
  });
  if (!data) {
    const error = ErrorResponse.create(
      `Attribute with id = ${id} is not found`,
      404,
      httpStatus.FAIL
    );
    return next(error);
  }
  return res.json({ status: httpStatus.SUCCESS, data });
});

exports.createAttribute = asyncWrapper(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = errorResponse.create(errors.array(), 400, httpStatus.FAIL);
    return next(error);
  }
  const data = await Attribute.create(req.body);
  return res.json({ status: httpStatus.SUCCESS, data });
});

exports.updateAttribute = asyncWrapper(async (req, res, next) => {
  const errors = validationResult(req);
  const id = req.params.id;
  if (!errors.isEmpty()) {
    const error = ErrorResponse.create(errors.array(), 400, httpStatus.FAIL);
    return next(error);
  }
  const [data] = await Attribute.update(req.body, {
    where: { id },
  });
  if (!data) {
    const error = ErrorResponse.create(
      `Attribute with id = ${id} is not found`,
      404,
      httpStatus.FAIL
    );
    return next(error);
  }
  res.json({ status: httpStatus.SUCCESS, data: "Attribute updated" });
});

exports.deleteAttribute = asyncWrapper(async (req, res, next) => {
  const id = req.params.id;
  const data = await Attribute.destroy({ where: { id } });
  if (!data) {
    const error = ErrorResponse.create(
      `Attribute with id = ${id} is not found`,
      404,
      httpStatus.FAIL
    );
    return next(error);
  }
  return res.json({ status: httpStatus.SUCCESS, data: "Attribute deleted" });
});
