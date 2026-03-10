const Hero = require("../models/Hero");
const About = require("../models/About");
const { sanitizeText, sanitizeCsvList, sanitizeUrl, collectErrors } = require("../middleware/validation");

// Render Hero edit form
async function showHero(req, res) {
  const hero = await Hero.findOne();
  res.render("admin/hero", { hero, error: null });
}

// Update Hero
async function updateHero(req, res) {
  const { headline, subheadline, ctaText, ctaUrl } = req.body;
  const headlineResult = sanitizeText(headline, { maxLength: 120 });
  const subheadlineResult = sanitizeText(subheadline, { maxLength: 160 });
  const ctaTextResult = sanitizeText(ctaText, { maxLength: 60 });
  const ctaUrlResult = sanitizeUrl(ctaUrl);

  const errors = collectErrors({ headlineResult, subheadlineResult, ctaTextResult, ctaUrlResult });
  if (errors.length) {
    return res.status(400).render("admin/hero", {
      hero: {
        headline: headlineResult.value,
        subheadline: subheadlineResult.value,
        ctaText: ctaTextResult.value,
        ctaUrl: ctaUrlResult.value,
      },
      error: errors[0],
    });
  }

  let hero = await Hero.findOne();
  if (!hero) hero = new Hero();
  hero.headline = headlineResult.value;
  hero.subheadline = subheadlineResult.value;
  hero.ctaText = ctaTextResult.value;
  hero.ctaUrl = ctaUrlResult.value;
  await hero.save();
  res.redirect("/admin/hero");
}

// Render About edit form
async function showAbout(req, res) {
  const about = await About.findOne();
  res.render("admin/about", { about, error: null });
}

// Update About
async function updateAbout(req, res) {
  const { bio, highlights } = req.body;
  const bioResult = sanitizeText(bio, { maxLength: 3000 });
  const normalizedHighlights = sanitizeCsvList(highlights, { maxItemLength: 80, maxItems: 20 });

  const errors = collectErrors({ bioResult });
  if (errors.length) {
    return res.status(400).render("admin/about", {
      about: {
        bio: bioResult.value,
        highlights: normalizedHighlights,
      },
      error: errors[0],
    });
  }

  let about = await About.findOne();
  if (!about) about = new About();
  about.bio = bioResult.value;
  about.highlights = normalizedHighlights;
  await about.save();
  res.redirect("/admin/about");
}

module.exports = { showHero, updateHero, showAbout, updateAbout };
