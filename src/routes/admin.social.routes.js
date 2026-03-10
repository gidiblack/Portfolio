const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/auth");
const {
  listSocialLinks,
  showNewSocialLink,
  createSocialLink,
  showEditSocialLink,
  updateSocialLink,
  deleteSocialLink,
} = require("../controllers/admin.social.controller");

router.get("/admin/social", requireAuth, listSocialLinks);
router.get("/admin/social/new", requireAuth, showNewSocialLink);
router.post("/admin/social/new", requireAuth, createSocialLink);
router.get("/admin/social/:id/edit", requireAuth, showEditSocialLink);
router.post("/admin/social/:id/edit", requireAuth, updateSocialLink);
router.post("/admin/social/:id/delete", requireAuth, deleteSocialLink);

module.exports = router;
