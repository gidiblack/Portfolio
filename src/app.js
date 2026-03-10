const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
const env = require("./config/env");

const app = express();

// Security headers
app.use(helmet());
// Logging
app.use(morgan("dev"));
// Cookie parsing
app.use(cookieParser());
// Body parsing for form and JSON payloads
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Session middleware
app.use(
  session({
    name: "adminSession",
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: env.NODE_ENV === "production" ? "strict" : "lax",
      secure: env.NODE_ENV === "production",
    },
  }),
);
// Static assets
app.use("/assets", express.static(path.join(__dirname, "../assets")));
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
// View engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));
app.use(expressLayouts);
app.set("layout", "layouts/main");
// Remove x-powered-by
app.disable("x-powered-by");

// Public routes
const publicRoutes = require("./routes/public.routes");
app.use("/", publicRoutes);

// CSRF protection for all admin routes
const csrfProtection = require("./middleware/csrf");
app.use("/admin", csrfProtection, (req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
});

const adminAuthRoutes = require("./routes/admin.auth.routes");
app.use(adminAuthRoutes);

// Admin dashboard (protected)
const adminRoutes = require("./routes/admin.routes");
app.use(adminRoutes);

// Admin content (hero/about)
const adminContentRoutes = require("./routes/admin.content.routes");
app.use(adminContentRoutes);

// Admin services CRUD
const adminServicesRoutes = require("./routes/admin.services.routes");
app.use(adminServicesRoutes);

// Admin projects CRUD
const adminProjectsRoutes = require("./routes/admin.projects.routes");
app.use(adminProjectsRoutes);

// Admin social links CRUD
const adminSocialRoutes = require("./routes/admin.social.routes");
app.use(adminSocialRoutes);

// Admin resume upload
const adminResumeRoutes = require("./routes/admin.resume.routes");
app.use(adminResumeRoutes);

// Health endpoint
const healthRoutes = require("./routes/health.routes");
app.use(healthRoutes);

// CSRF error handler
app.use((err, req, res, next) => {
  if (err && err.code === "EBADCSRFTOKEN") {
    return res.status(403).send("Invalid CSRF token");
  }
  return next(err);
});

module.exports = app;
