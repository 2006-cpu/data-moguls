function requireUser(req, res, next) {
  if (!req.user) {
    next({
      name: "MissingUserError",
      message: "You must be logged in to perform this action",
    });
  }

  next();
}

function requireAdminOrUser(req, res, next) {
  if (!req.user || !req.user.isAdmin) {
    next({
      name: "MissingUserError or NotAdmin",
      message: "You must be logged in to perform this action or be an Admin to access this info"
    })
  }
  next()
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

module.exports = {
  requireUser,
  requireAdmin,
  requireAdminOrUser,
};
