const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/auth");
const {
  listServices,
  showNewService,
  createService,
  showEditService,
  updateService,
  deleteService,
} = require("../controllers/admin.services.controller");

router.get("/admin/services", requireAuth, listServices);
router.get("/admin/services/new", requireAuth, showNewService);
router.post("/admin/services/new", requireAuth, createService);
router.get("/admin/services/:id/edit", requireAuth, showEditService);
router.post("/admin/services/:id/edit", requireAuth, updateService);
router.post("/admin/services/:id/delete", requireAuth, deleteService);

module.exports = router;
