const Service = require("../models/Service");
const { sanitizeText, parseOrder, toPublishedFlag, collectErrors } = require("../middleware/validation");

// List all services
async function listServices(req, res) {
  const services = await Service.find().sort({ order: 1 });
  res.render("admin/services", { services });
}

// Show new service form
function showNewService(req, res) {
  res.render("admin/service-form", { service: null, error: null });
}

// Create new service
async function createService(req, res) {
  const { title, description, order, published } = req.body;
  const titleResult = sanitizeText(title, { maxLength: 120 });
  const descriptionResult = sanitizeText(description, { maxLength: 1500 });
  const orderResult = parseOrder(order);

  const errors = collectErrors({ titleResult, descriptionResult, orderResult });
  if (errors.length) {
    return res.status(400).render("admin/service-form", {
      service: {
        title: titleResult.value,
        description: descriptionResult.value,
        order: Number.isInteger(orderResult.value) ? orderResult.value : 0,
        published: toPublishedFlag(published),
      },
      error: errors[0],
    });
  }

  await Service.create({
    title: titleResult.value,
    description: descriptionResult.value,
    order: orderResult.value,
    published: toPublishedFlag(published),
  });
  res.redirect("/admin/services");
}

// Show edit service form
async function showEditService(req, res) {
  const service = await Service.findById(req.params.id);
  res.render("admin/service-form", { service, error: null });
}

// Update service
async function updateService(req, res) {
  const { title, description, order, published } = req.body;
  const titleResult = sanitizeText(title, { maxLength: 120 });
  const descriptionResult = sanitizeText(description, { maxLength: 1500 });
  const orderResult = parseOrder(order);

  const errors = collectErrors({ titleResult, descriptionResult, orderResult });
  if (errors.length) {
    return res.status(400).render("admin/service-form", {
      service: {
        _id: req.params.id,
        title: titleResult.value,
        description: descriptionResult.value,
        order: Number.isInteger(orderResult.value) ? orderResult.value : 0,
        published: toPublishedFlag(published),
      },
      error: errors[0],
    });
  }

  await Service.findByIdAndUpdate(req.params.id, {
    title: titleResult.value,
    description: descriptionResult.value,
    order: orderResult.value,
    published: toPublishedFlag(published),
  });
  res.redirect("/admin/services");
}

// Delete service
async function deleteService(req, res) {
  await Service.findByIdAndDelete(req.params.id);
  res.redirect("/admin/services");
}

module.exports = {
  listServices,
  showNewService,
  createService,
  showEditService,
  updateService,
  deleteService,
};
