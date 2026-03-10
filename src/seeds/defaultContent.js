const Hero = require("../models/Hero");
const About = require("../models/About");
const Service = require("../models/Service");
const Project = require("../models/Project");
const SocialLink = require("../models/SocialLink");
const ResumeAsset = require("../models/ResumeAsset");

const defaultContent = {
  hero: {
    headline: "Welcome to My Portfolio",
    subheadline: "Full Stack Developer",
    ctaText: "Hire Me",
    ctaUrl: "/hireme",
    order: 0,
  },
  about: {
    bio: "I am a passionate developer with experience in modern web technologies.",
    highlights: ["JavaScript", "Node.js", "MongoDB", "Express"],
    order: 0,
  },
  services: [
    {
      title: "Web Development",
      description: "Building responsive and robust web apps.",
      icon: "",
      order: 0,
      published: true,
    },
    { title: "API Design", description: "RESTful and GraphQL API expertise.", icon: "", order: 1, published: true },
  ],
  projects: [
    {
      title: "Portfolio Site",
      description: "This very site!",
      technologies: ["Node.js", "Express", "MongoDB"],
      imageUrl: "",
      projectUrl: "",
      order: 0,
      published: true,
    },
  ],
  socialLinks: [
    { platform: "GitHub", url: "https://github.com/", order: 0, published: true },
    { platform: "LinkedIn", url: "https://linkedin.com/", order: 1, published: true },
  ],
  resumeAsset: {
    currentUrl: "/assets/Gideon_Etim_Resume.pdf",
    fileName: "Gideon_Etim_Resume.pdf",
    uploadedAt: new Date(),
  },
};

async function seedDefaults() {
  // Only insert if collections are empty
  if ((await Hero.countDocuments()) === 0) await Hero.create(defaultContent.hero);
  if ((await About.countDocuments()) === 0) await About.create(defaultContent.about);
  if ((await Service.countDocuments()) === 0) await Service.insertMany(defaultContent.services);
  if ((await Project.countDocuments()) === 0) await Project.insertMany(defaultContent.projects);
  if ((await SocialLink.countDocuments()) === 0) await SocialLink.insertMany(defaultContent.socialLinks);
  if ((await ResumeAsset.countDocuments()) === 0) await ResumeAsset.create(defaultContent.resumeAsset);
}

module.exports = seedDefaults;
