const errorResponse = require("../utils/errorResponse");

module.exports = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.currentUser.role)) {
      return next(errorResponse.create("this role is not authorized", 401));
    }
    next();
  };
};
