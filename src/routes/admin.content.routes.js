const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/auth");
const { showHero, updateHero, showAbout, updateAbout } = require("../controllers/admin.content.controller");

router.get("/admin/hero", requireAuth, showHero);
router.post("/admin/hero", requireAuth, updateHero);
router.get("/admin/about", requireAuth, showAbout);
router.post("/admin/about", requireAuth, updateAbout);

module.exports = router;
