function requireUser(req, res, next) {
  if (!req.user) {
    next({
      name: "MissingUserError",
      message: "You must be logged in to perform this action",
    });
  }

  next();
}

function requireAdmin(req, res, next) {
  if (!req.user) {
    next({
      name: "MissingUserError",
      message: "You must be logged in to perform this action",
    });
  } else if (!req.user.isAdmin) {
    next({
      name: "NotAdmin",
      message: "You must be an admin to access this information",
    });
  }

  next();
}

function isAdmin(req, res, next) {
  if (!req.user.isAdmin) {
    next({
      name: "UnauthenticatedUserError",
      message: "You must be an admin to perform this action",
    });
  }

  next();
}


module.exports = {
  requireUser,
  requireAdmin,
  isAdmin

};
