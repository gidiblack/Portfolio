const express = require("express");
const rateLimit = require("express-rate-limit");
const env = require("../config/env");
const router = express.Router();
const { showLogin, login, logout } = require("../controllers/admin.auth.controller");

const loginLimiter = rateLimit({
  windowMs: env.LOGIN_RATE_LIMIT_WINDOW_MS,
  max: env.LOGIN_RATE_LIMIT_MAX,
  message: "Too many login attempts, please try again later.",
});

router.get("/admin/login", showLogin);
router.post("/admin/login", loginLimiter, login);
router.post("/admin/logout", logout);

module.exports = router;
