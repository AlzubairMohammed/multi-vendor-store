const { User, Product, Image, ProductVariation } = require("../models");
const httpStatus = require("../utils/httpStatus");
const asyncWrapper = require("../middleware/asyncWrapper");
const errorResponse = require("../utils/errorResponse");
const { validationResult } = require("express-validator");

exports.getUsers = asyncWrapper(async (req, res, next) => {
  const data = await User.findAll();
  return res.json({ status: httpStatus.SUCCESS, data });
});
exports.getVendors = asyncWrapper(async (req, res, next) => {
  const data = await User.findAll({
    include: [
      {
        model: Product,
        limit,
        offset,
        include: [
          {
            model: ProductVariation,
            include: [
              {
                model: Image,
              },
            ],
          },
        ],
      },
    ],
    where: { role: "ADMIN" },
  });
  return res.json({ status: httpStatus.SUCCESS, data });
});
exports.getVendor = asyncWrapper(async (req, res, next) => {
  const id = req.params.id;
  const data = await User.findOne({
    where: { id },
    include: ["Products"],
    where: { role: "ADMIN" },
  });
  if (!data) {
    const error = errorResponse.create(
      `Vendor with id = ${id} is not found`,
      404,
      httpStatus.FAIL
    );
    return next(error);
  }
  return res.json({ status: httpStatus.SUCCESS, data });
});

exports.register = asyncWrapper(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = errorResponse.create(errors.array(), 400, httpStatus.FAIL);
    return next(error);
  }
  const data = await User.create(req.body);
  return res.json({ status: httpStatus.SUCCESS, data });
});

exports.login = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = errorResponse.create(errors.array(), 400, httpStatus.FAIL);
    next(error);
  }
  res.json({ msg: `user created` });
};

exports.updateUser = (req, res) => {
  res.json({ msg: `user ${req.params.id} updated` });
};

exports.deleteUser = (req, res) => {
  res.json({ msg: `user ${req.params.id}` });
};
