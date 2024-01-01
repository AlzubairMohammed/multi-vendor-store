const { User } = require("../models");
const httpStatus = require("../utils/httpStatus");
const asyncWrapper = require("../middleware/asyncWrapper");
const errorResponse = require("../utils/errorResponse");
const { validationResult } = require("express-validator");

exports.getUsers = asyncWrapper(async (req, res, next) => {
  const data = User.findAll({
    include: ["products"],
  });
  //   res.json;
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
