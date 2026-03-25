

module.exports = (...roles) => {
  return (req, res, next) => {

    // normalize role (lowercase + replace - with _)
    const userRole = req.user.role
      .toLowerCase()
      .replace("-", "_");

    const allowedRoles = roles.map(r =>
      r.toLowerCase().replace("-", "_")
    );

    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({
        message: `Access Denied: ${req.user.role} role is not authorized.`
      });
    }

    next();
  };
};