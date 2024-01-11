const { User } = require("../models");
const httpStatus = require("../utils/httpStatus");
const asyncWrapper = require("../middleware/asyncWrapper");
const errorResponse = require("../utils/errorResponse");
const { validationResult } = require("express-validator");

exports.getUsers = asyncWrapper(async (req, res, next) => {
  const data = await User.findAll({
    include: ["Products"],
  });
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

exports.editUser = asyncWrapper(async (req, res, next) => {
  const errors = validationResult(req);
  const id = req.params.id;
  if (!errors.isEmpty()) {
    const error = errorResponse.create(errors.array(), 400, httpStatus.FAIL);
    return next(error);
  }
  const data = await User.update(req.body, {
    where: { id },
  });
  if (!data) {
    const error = errorResponse.create(
      `User with id = ${id} is not found`,
      404,
      httpStatus.FAIL
    );
    return next(error);
  }
  res.json({ status: httpStatus.SUCCESS, data: "User updated" });
});

exports.deleteUser = asyncWrapper(async (req, res, next) => {
  const id = req.params.id;
  const data = await User.destroy({ where: { id } });
  if (!data) {
    const error = ErrorResponse.create(
      `User with id = ${id} is not found`,
      404,
      httpStatus.FAIL
    );
    return next(error);
  }
  return res.json({ status: httpStatus.SUCCESS, data: "User deleted" });
});
