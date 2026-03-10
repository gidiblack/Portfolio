const { getContent } = require("../services/content.service");
const seedDefaults = require("../seeds/defaultContent");

function getSafeFallbackContent() {
  return {
    hero: {
      headline: "I'm Gideon",
      subheadline: "Frontend Software Engineer",
      ctaText: "Hire Me",
      ctaUrl: "/hireme",
    },
    about: {
      bio: "Highly skilled and motivated Frontend Software Engineer with strong proficiency in modern web technologies.",
      highlights: ["JavaScript", "React", "Node.js", "MongoDB"],
    },
    services: [],
    socialLinks: [
      { platform: "Twitter", url: "https://twitter.com/tha_gidi" },
      { platform: "GitHub", url: "https://github.com/gidiblack" },
      { platform: "LinkedIn", url: "https://www.linkedin.com/in/gideon-etim-6534a7187/" },
      { platform: "WhatsApp", url: "https://api.whatsapp.com/send?phone=2347081641910&text=&source=&data=" },
    ],
    resumeAsset: {
      currentUrl: "/assets/Gideon_Etim_Resume.pdf",
      fileName: "Gideon_Etim_Resume.pdf",
    },
    projects: [],
  };
}

async function renderHome(req, res) {
  try {
    let content = await getContent();
    // Fallback to seed if missing
    if (!content.hero || !content.about) {
      await seedDefaults();
      content = await getContent();
    }
    res.render("pages/home", { ...content, layout: false });
  } catch (err) {
    console.error("[renderHome] Error:", err);
    res.status(200).render("pages/home", {
      ...getSafeFallbackContent(),
      layout: false,
    });
  }
}

async function renderHireMe(req, res) {
  try {
    let content = await getContent();
    if (!content.hero || !content.about) {
      await seedDefaults();
      content = await getContent();
    }
    res.render("pages/hireme", { ...content, layout: false });
  } catch (err) {
    console.error("[renderHireMe] Error:", err);
    res.status(200).render("pages/hireme", {
      ...getSafeFallbackContent(),
      layout: false,
    });
  }
}

module.exports = { renderHome, renderHireMe };
