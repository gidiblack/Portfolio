const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");

// Render login form
function showLogin(req, res) {
  res.render("admin/login", { error: null });
}

// Handle login
async function login(req, res) {
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username });
  if (!admin) {
    return res.render("admin/login", { error: "Invalid credentials" });
  }
  const valid = await bcrypt.compare(password, admin.passwordHash);
  if (!valid) {
    return res.render("admin/login", { error: "Invalid credentials" });
  }
  // Set session (to be implemented)
  req.session.adminId = admin._id;
  res.redirect("/admin");
}

// Handle logout
function logout(req, res) {
  req.session.destroy(() => {
    res.clearCookie("adminSession");
    res.redirect("/admin/login");
  });
}

module.exports = { showLogin, login, logout };
