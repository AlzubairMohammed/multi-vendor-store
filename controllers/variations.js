const { ProductVariation, Image } = require("../models");
const ErrorResponse = require("../utils/errorResponse");
const asyncWrapper = require("../middleware/asyncWrapper");
const httpStatus = require("../utils/httpStatus");
const errorResponse = require("../utils/errorResponse");
const { validationResult } = require("express-validator");
const path = require("path");
const fs = require("fs");

exports.getVariation = asyncWrapper(async (req, res, next) => {
  const id = req.params.id;
  const data = await ProductVariation.findOne({
    where: { id },
  });
  if (!data) {
    const error = ErrorResponse.create(
      `Variation with id = ${id} is not found`,
      404,
      httpStatus.FAIL
    );
    return next(error);
  }
  return res.json({ status: httpStatus.SUCCESS, data });
});

exports.createVariation = asyncWrapper(async (req, res, next) => {
  const { images } = req.files;
  let fileName = "";
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = errorResponse.create(errors.array(), 400, httpStatus.FAIL);
    return next(error);
  }
  const data = await ProductVariation.create(req.body);
  if (Array.isArray(images)) {
    images.map(async (image) => {
      fileName = Date.now() + image.name + "";
      const filepath = path.join(__dirname, "../uploads/products", fileName);
      image.mv(filepath, (err) => {
        if (err) {
          const error = ErrorResponse.create(err, 500, httpStatus.FAIL);
          return next(error);
        }
      });
      try {
        imageDate = await Image.create({
          image: fileName,
          product_variation_id: data.id,
        });
      } catch (err) {
        const error = ErrorResponse.create(err, 500, httpStatus.FAIL);
        return next(error);
      }
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
      product_variation_id: data.id,
    });
  }
  return res.json({ status: httpStatus.SUCCESS, data });
});

exports.updateVariation = asyncWrapper(async (req, res, next) => {
  const errors = validationResult(req);
  const id = req.params.id;
  const { images } = req.files;
  let fileName = "";
  if (!errors.isEmpty()) {
    const error = ErrorResponse.create(errors.array(), 400, httpStatus.FAIL);
    return next(error);
  }
  const [data] = await ProductVariation.update(req.body, {
    where: { id },
  });
  if (!data) {
    const error = ErrorResponse.create(
      `Variation with id = ${id} is not found`,
      404,
      httpStatus.FAIL
    );
    return next(error);
  }
  if (Array.isArray(images)) {
    images.map(async (image) => {
      fileName = Date.now() + image.name + "";
      const filepath = path.join(__dirname, "../uploads/products", fileName);
      image.mv(filepath, (err) => {
        if (err) {
          const error = ErrorResponse.create(err, 500, httpStatus.FAIL);
          return next(error);
        }
      });
      try {
        imageDate = await Image.create({
          image: fileName,
          product_variation_id: data.id,
        });
      } catch (err) {
        const error = ErrorResponse.create(err, 500, httpStatus.FAIL);
        return next(error);
      }
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
      product_variation_id: data.id,
    });
  }
  res.json({ status: httpStatus.SUCCESS, data: "Variation updated" });
});

exports.deleteVariation = asyncWrapper(async (req, res, next) => {
  const id = req.params.id;
  const data = await ProductVariation.destroy({ where: { id } });
  if (!data) {
    const error = ErrorResponse.create(
      `Variation with id = ${id} is not found`,
      404,
      httpStatus.FAIL
    );
    return next(error);
  }
  return res.json({ status: httpStatus.SUCCESS, data: "Variation deleted" });
});
