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

exports.register = (req, res) => {
  res.json({ msg: `user created` });
};

exports.login = (req, res) => {
  res.json({ msg: `user created` });
};

exports.updateUser = (req, res) => {
  res.json({ msg: `user ${req.params.id} updated` });
};

exports.deleteUser = (req, res) => {
  res.json({ msg: `user ${req.params.id}` });
};
