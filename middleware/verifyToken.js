const jwt = require("jsonwebtoken");
const httpStatus = require("../utils/httpStatus");
const errorResponse = require("../utils/errorResponse");

const verifyToken = (req, res, next) => {
  const authHeader =
    req.headers["Authorization"] || req.headers["authorization"];
  if (!authHeader) {
    const error = errorResponse.create(
      "token is required",
      401,
      httpStatus.ERROR
    );
    return next(error);
  }

  const token = authHeader.split(" ")[1];
  try {
    const currentUser = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.currentUser = currentUser;
    next();
  } catch (err) {
    const error = errorResponse.create("invalid token", 401, httpStatus.ERROR);
    return next(error);
  }
};

module.exports = verifyToken;
