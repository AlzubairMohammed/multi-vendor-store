const { User } = require("../models");
const httpStatus = require("../utils/httpStatus");
const asyncWrapper = require("../middleware/asyncWrapper");
const errorResponse = require("../utils/errorResponse");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.getUsers = asyncWrapper(async (req, res, next) => {
  const data = await User.findAll({
    include: ["Products"],
  });
  return res.json({ status: httpStatus.SUCCESS, data });
});

exports.register = asyncWrapper(async (req, res, next) => {
  const { email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = errorResponse.create(errors.array(), 400, httpStatus.FAIL);
    return next(error);
  }
  const oldUser = await User.findOne({
    where: {
      email,
    },
  });
  if (oldUser) {
    const error = errorResponse.create(
      "user already exists",
      400,
      httpStatus.FAIL
    );
    return next(error);
  }
  req.body.password = await bcrypt.hash(password, 10);
  const data = await User.create(req.body);
  return res.json({ status: httpStatus.SUCCESS, data });
});

exports.login = asyncWrapper(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email && !password) {
    const error = errorResponse.create(
      "email and password are required",
      400,
      httpStatus.FAIL
    );
    return next(error);
  }

  const user = await User.findOne({ email: email });

  if (!user) {
    const error = errorResponse.create("user not found", 400, httpStatus.FAIL);
    return next(error);
  }

  const matchedPassword = await bcrypt.compare(password, user.password);

  if (user && matchedPassword) {
    // logged in successfully

    const token = await generateJWT({
      email: user.email,
      id: user._id,
      role: user.role,
    });

    return res.json({ status: httpStatus.SUCCESS, data: { token } });
  } else {
    const error = errorResponse.create(
      "something wrong",
      500,
      httpStatus.ERROR
    );
    return next(error);
  }
});

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
