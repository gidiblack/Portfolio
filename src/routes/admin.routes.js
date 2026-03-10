const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/auth");

router.get("/admin", requireAuth, (req, res) => {
  res.render("admin/dashboard");
});

module.exports = router;
