const express = require("express");
const router = express.Router();
const { renderHome, renderHireMe } = require("../controllers/public.controller");

router.get("/", renderHome);
router.get("/hireme", renderHireMe);

module.exports = router;
