const Project = require("../models/Project");
const {
  sanitizeText,
  sanitizeCsvList,
  parseOrder,
  sanitizeUrl,
  toPublishedFlag,
  collectErrors,
} = require("../middleware/validation");

// List all projects
async function listProjects(req, res) {
  const projects = await Project.find().sort({ order: 1 });
  res.render("admin/projects", { projects });
}

// Show new project form
function showNewProject(req, res) {
  res.render("admin/project-form", { project: null, error: null });
}

// Create new project
async function createProject(req, res) {
  const { title, description, order, technologies, projectUrl, imageUrl, published } = req.body;
  const titleResult = sanitizeText(title, { maxLength: 140 });
  const descriptionResult = sanitizeText(description, { maxLength: 2000 });
  const orderResult = parseOrder(order);
  const projectUrlResult = sanitizeUrl(projectUrl, { allowEmpty: true });
  const imageUrlResult = sanitizeUrl(imageUrl, { allowEmpty: true });
  const sanitizedTechnologies = sanitizeCsvList(technologies, { maxItemLength: 50, maxItems: 20 });

  const errors = collectErrors({ titleResult, descriptionResult, orderResult, projectUrlResult, imageUrlResult });
  if (errors.length) {
    return res.status(400).render("admin/project-form", {
      project: {
        title: titleResult.value,
        description: descriptionResult.value,
        order: Number.isInteger(orderResult.value) ? orderResult.value : 0,
        technologies: sanitizedTechnologies,
        projectUrl: projectUrlResult.value,
        imageUrl: imageUrlResult.value,
        published: toPublishedFlag(published),
      },
      error: errors[0],
    });
  }

  await Project.create({
    title: titleResult.value,
    description: descriptionResult.value,
    order: orderResult.value,
    technologies: sanitizedTechnologies,
    projectUrl: projectUrlResult.value,
    imageUrl: imageUrlResult.value,
    published: toPublishedFlag(published),
  });
  res.redirect("/admin/projects");
}

// Show edit project form
async function showEditProject(req, res) {
  const project = await Project.findById(req.params.id);
  res.render("admin/project-form", { project, error: null });
}

// Update project
async function updateProject(req, res) {
  const { title, description, order, technologies, projectUrl, imageUrl, published } = req.body;
  const titleResult = sanitizeText(title, { maxLength: 140 });
  const descriptionResult = sanitizeText(description, { maxLength: 2000 });
  const orderResult = parseOrder(order);
  const projectUrlResult = sanitizeUrl(projectUrl, { allowEmpty: true });
  const imageUrlResult = sanitizeUrl(imageUrl, { allowEmpty: true });
  const sanitizedTechnologies = sanitizeCsvList(technologies, { maxItemLength: 50, maxItems: 20 });

  const errors = collectErrors({ titleResult, descriptionResult, orderResult, projectUrlResult, imageUrlResult });
  if (errors.length) {
    return res.status(400).render("admin/project-form", {
      project: {
        _id: req.params.id,
        title: titleResult.value,
        description: descriptionResult.value,
        order: Number.isInteger(orderResult.value) ? orderResult.value : 0,
        technologies: sanitizedTechnologies,
        projectUrl: projectUrlResult.value,
        imageUrl: imageUrlResult.value,
        published: toPublishedFlag(published),
      },
      error: errors[0],
    });
  }

  await Project.findByIdAndUpdate(req.params.id, {
    title: titleResult.value,
    description: descriptionResult.value,
    order: orderResult.value,
    technologies: sanitizedTechnologies,
    projectUrl: projectUrlResult.value,
    imageUrl: imageUrlResult.value,
    published: toPublishedFlag(published),
  });
  res.redirect("/admin/projects");
}

// Delete project
async function deleteProject(req, res) {
  await Project.findByIdAndDelete(req.params.id);
  res.redirect("/admin/projects");
}

module.exports = {
  listProjects,
  showNewProject,
  createProject,
  showEditProject,
  updateProject,
  deleteProject,
};
