const SocialLink = require("../models/SocialLink");

const allowedPlatforms = ["GitHub", "LinkedIn", "Twitter", "Facebook", "Instagram", "Other"];

function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

// List all social links
async function listSocialLinks(req, res) {
  const socialLinks = await SocialLink.find().sort({ order: 1 });
  res.render("admin/social", { socialLinks });
}

// Show new social link form
function showNewSocialLink(req, res) {
  res.render("admin/social-form", { link: null });
}

// Create new social link
async function createSocialLink(req, res) {
  const { platform, url, order, published } = req.body;
  if (!allowedPlatforms.includes(platform) || !isValidUrl(url)) {
    return res.render("admin/social-form", { link: req.body, error: "Invalid platform or URL" });
  }
  await SocialLink.create({
    platform,
    url,
    order: Number(order),
    published: !!published,
  });
  res.redirect("/admin/social");
}

// Show edit social link form
async function showEditSocialLink(req, res) {
  const link = await SocialLink.findById(req.params.id);
  res.render("admin/social-form", { link });
}

// Update social link
async function updateSocialLink(req, res) {
  const { platform, url, order, published } = req.body;
  if (!allowedPlatforms.includes(platform) || !isValidUrl(url)) {
    const link = await SocialLink.findById(req.params.id);
    return res.render("admin/social-form", { link, error: "Invalid platform or URL" });
  }
  await SocialLink.findByIdAndUpdate(req.params.id, {
    platform,
    url,
    order: Number(order),
    published: !!published,
  });
  res.redirect("/admin/social");
}

// Delete social link
async function deleteSocialLink(req, res) {
  await SocialLink.findByIdAndDelete(req.params.id);
  res.redirect("/admin/social");
}

module.exports = {
  listSocialLinks,
  showNewSocialLink,
  createSocialLink,
  showEditSocialLink,
  updateSocialLink,
  deleteSocialLink,
};
