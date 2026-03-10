module.exports = function (req, res, next) {
  if (req.session && req.session.adminId) {
    return next();
  }
  res.redirect("/admin/login");
};
