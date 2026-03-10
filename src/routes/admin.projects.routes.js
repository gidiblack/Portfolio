const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/auth");
const {
  listProjects,
  showNewProject,
  createProject,
  showEditProject,
  updateProject,
  deleteProject,
} = require("../controllers/admin.projects.controller");

router.get("/admin/projects", requireAuth, listProjects);
router.get("/admin/projects/new", requireAuth, showNewProject);
router.post("/admin/projects/new", requireAuth, createProject);
router.get("/admin/projects/:id/edit", requireAuth, showEditProject);
router.post("/admin/projects/:id/edit", requireAuth, updateProject);
router.post("/admin/projects/:id/delete", requireAuth, deleteProject);

module.exports = router;
